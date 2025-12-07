import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistanceMetric } from './distance.entity';
import { DistanceUnit, UNIT_TO_METER_FACTOR } from './distance.units';

@Injectable()
export class DistanceService {
  constructor(
    @InjectRepository(DistanceMetric) private repo: Repository<DistanceMetric>,
  ) {}

  async create(
    recordedAt: Date | string,
    value: number,
    unit: DistanceUnit | undefined,
  ) {
    const metric = this.repo.create({
      value: value * UNIT_TO_METER_FACTOR[unit ?? 'm'],
      recorded_at: new Date(recordedAt),
    });

    return this.repo.save(metric);
  }

  async list(unit?: DistanceUnit) {
    if (!unit) {
      return this.repo.query(`
      SELECT id, recorded_at, value, created_at,
      FROM distance_metrics
      ORDER BY recorded_at ASC
    `);
    }

    const factor = UNIT_TO_METER_FACTOR[unit];

    return this.repo.query(
      `
    SELECT id, recorded_at, value / $1 AS value, created_at
    FROM distance_metrics
    ORDER BY recorded_at ASC
    `,
      [factor],
    );
  }

  async chart(months: number = 1, unit?: DistanceUnit) {
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - months);

    const startISO = start.toISOString();
    const endISO = end.toISOString();

    //
    // CASE 1 — no unit conversion → return meters
    //
    if (!unit) {
      const rows = await this.repo.query(
        `
      SELECT DISTINCT ON (day)
        to_char(day, 'YYYY-MM-DD') AS date,
        value
      FROM (
        SELECT
          date_trunc('day', recorded_at) AS day,
          value,
          recorded_at
        FROM distance_metrics
        WHERE recorded_at >= $1 AND recorded_at <= $2
      ) AS t
      ORDER BY day, recorded_at DESC;
      `,
        [startISO, endISO],
      );

      return rows; // (date, value)
    }

    //
    // CASE 2 — unit conversion in DB
    //
    const factor = UNIT_TO_METER_FACTOR[unit];

    const rows = await this.repo.query(
      `
    SELECT DISTINCT ON (day)
      to_char(day, 'YYYY-MM-DD') AS date,
      value / $3 AS value
    FROM (
      SELECT
        date_trunc('day', recorded_at) AS day,
        value,
        recorded_at
      FROM distance_metrics
      WHERE recorded_at >= $1 AND recorded_at <= $2
    ) AS t
    ORDER BY day, recorded_at DESC;
    `,
      [startISO, endISO, factor],
    );

    return rows; // (date, value)
  }
}
