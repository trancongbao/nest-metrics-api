import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureMetric } from './temperature.entity';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import {
  TemperatureUnit,
  TemperatureUnits,
  toKelvin,
  fromKelvin,
} from './temperature.units';

@Injectable()
export class TemperatureService {
  constructor(
    @InjectRepository(TemperatureMetric)
    private repo: Repository<TemperatureMetric>,
  ) {}

  async create(dto: CreateTemperatureDto) {
    const canonical = toKelvin(dto.value, dto.unit);
    return this.repo.save({
      canonical_kelvin: canonical,
      original_value: dto.value,
      original_unit: dto.unit,
      recorded_at: new Date(dto.date),
    });
  }

  async list(unit?: TemperatureUnit) {
    const items = await this.repo.find();
    if (!unit)
      return items.map((i) => ({
        ...i,
        value: i.original_value,
        unit: i.original_unit,
      }));

    return items.map((i) => ({
      id: i.id,
      recorded_at: i.recorded_at,
      value: fromKelvin(i.canonical_kelvin, unit),
      unit,
      created_at: i.created_at,
    }));
  }

  async chart(months: number = 1, unit?: TemperatureUnit) {
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - months + 1);

    const rows = await this.repo.query(
      `SELECT DISTINCT ON (date_trunc('day', recorded_at)) id, canonical_kelvin, recorded_at
FROM temperature_metrics
WHERE recorded_at >= $1 AND recorded_at <= $2
ORDER BY date_trunc('day', recorded_at), recorded_at DESC`,
      [start.toISOString(), end.toISOString()],
    );

    const data = rows.map((r) => ({
      date: r.recorded_at.slice(0, 10),
      value: r.canonical_kelvin,
    }));

    if (unit)
      return data.map((d) => ({
        date: d.date,
        value: fromKelvin(d.value, unit),
        unit,
      }));

    return data.map((d) => ({ ...d, unit: 'K' }));
  }
}
