import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureMetric } from './temperature.entity';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { TemperatureUnit, toKelvin, fromKelvin } from './temperature.units';

@Injectable()
export class TemperatureService {
  constructor(
    @InjectRepository(TemperatureMetric)
    private repo: Repository<TemperatureMetric>,
  ) {}

  async create(dto: CreateTemperatureDto) {
    const canonical = toKelvin(dto.value, dto.unit);
    return this.repo.save({
      value: canonical,
      recorded_at: new Date(dto.date),
    });
  }

  async list(unit?: TemperatureUnit) {
    const items = await this.repo.find();

    if (!unit) return items.map((i) => ({ ...i, value: i.value, unit: 'K' }));

    return items.map((i) => ({
      id: i.id,
      recorded_at: i.recorded_at,
      value: fromKelvin(i.value, unit),
      unit,
      created_at: i.created_at,
    }));
  }

  async chart(months: number = 1, unit?: TemperatureUnit) {
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - months);

    const rows = await this.repo.query(
      `SELECT DISTINCT ON (day)
        to_char(day, 'YYYY-MM-DD') AS date,
        value
      FROM (
        SELECT
          date_trunc('day', recorded_at) AS day,
          value,
          recorded_at
        FROM temperature_metrics
        WHERE recorded_at >= $1 AND recorded_at <= $2
      ) AS t
      ORDER BY day, recorded_at DESC;`,
      [start.toISOString(), end.toISOString()],
    );

    if (unit)
      return rows.map((d) => ({
        date: d.date,
        value: fromKelvin(d.value, unit),
        unit,
      }));

    return rows.map((d) => ({ ...d, unit: 'K' }));
  }
}
