import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistanceMetric } from './distance.entity';
import { CreateDistanceDto } from './dto/create-distance.dto';
import {
  DistanceUnits,
  DistanceUnit,
  toMeters,
  fromMeters,
} from './distance.units';

@Injectable()
export class DistanceService {
  constructor(
    @InjectRepository(DistanceMetric) private repo: Repository<DistanceMetric>,
  ) {}

  validateUnit(unit: string) {
    if (!DistanceUnits.includes(unit as DistanceUnit)) {
      throw new BadRequestException('Invalid distance unit');
    }
  }

  async create(dto: CreateDistanceDto) {
    const canonical = toMeters(dto.value, dto.unit);
    const metric = this.repo.create({
      value: canonical,
      recorded_at: new Date(dto.date),
    });
    return this.repo.save(metric);
  }

  async list(unit?: DistanceUnit) {
    const items = await this.repo.find({ order: { recorded_at: 'ASC' } });

    if (!unit) return items.map((i) => ({ ...i, value: i.value, unit: 'm' }));

    return items.map((i) => ({
      id: i.id,
      recorded_at: i.recorded_at,
      value: fromMeters(i.value, unit),
      unit,
      created_at: i.created_at,
    }));
  }

  async chart(months: number = 1, unit?: DistanceUnit) {
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - months + 1);

    const rows = await this.repo.query(
      `SELECT DISTINCT ON (date_trunc('day', recorded_at)) id, value, recorded_at
FROM distance_metrics
WHERE recorded_at >= $1 AND recorded_at <= $2
ORDER BY date_trunc('day', recorded_at), recorded_at DESC`,
      [start.toISOString(), end.toISOString()],
    );

    const data = rows.map((r) => ({
      date: r.recorded_at.slice(0, 10),
      value: r.value,
    }));

    if (unit)
      return data.map((d) => ({
        date: d.date,
        value: fromMeters(d.value, unit),
        unit,
      }));

    return data.map((d) => ({ ...d, unit: 'm' }));
  }
}
