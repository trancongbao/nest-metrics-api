import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric, MetricKind } from './metric.entity';
import { CreateMetricDto, DistanceUnit, TemperatureUnit } from './dto/create-metric.dto';
import { DistanceUnits, TemperatureUnits, toCanonical, fromCanonical } from './units';

@Injectable()
export class MetricService {
  constructor(@InjectRepository(Metric) private repo: Repository<Metric>) {}

  private validateUnit(kind: MetricKind, unit: string) {
    if (kind === MetricKind.DISTANCE && !DistanceUnits.includes(unit as DistanceUnit)) {
      throw new BadRequestException(`Unsupported distance unit: ${unit}`);
    }
    if (kind === MetricKind.TEMPERATURE && !TemperatureUnits.includes(unit as TemperatureUnit)) {
      throw new BadRequestException(`Unsupported temperature unit: ${unit}`);
    }
  }

  async create(dto: CreateMetricDto) {
    this.validateUnit(dto.kind, dto.unit);
    const canonical = toCanonical(dto.kind, dto.value, dto.unit);

    const metric = this.repo.create({
      canonical_value: canonical,
      original_value: dto.value,
      original_unit: dto.unit,
      kind: dto.kind,
      recorded_at: new Date(dto.date),
    });
    return this.repo.save(metric);
  }

  async list(kind: MetricKind, unit?: string) {
    const items = await this.repo.find({ where: { kind }, order: { recorded_at: 'ASC' } });
    if (!unit) return items.map(i => ({ ...i, value: i.original_value, unit: i.original_unit }));

    this.validateUnit(kind, unit);
    return items.map(i => ({
      id: i.id,
      recorded_at: i.recorded_at,
      value: fromCanonical(kind, i.canonical_value, unit),
      unit,
      created_at: i.created_at,
    }));
  }

  async chart(kind: MetricKind, periodMonths = 1, unit?: string) {
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - periodMonths + 1);
    start.setHours(0,0,0,0);

    const raw = await this.repo.query(
      `SELECT DISTINCT ON (date_trunc('day', recorded_at)) id, canonical_value, recorded_at
       FROM metrics
       WHERE kind = $1 AND recorded_at >= $2 AND recorded_at <= $3
       ORDER BY date_trunc('day', recorded_at) ASC, recorded_at DESC`,
      [kind, start.toISOString(), end.toISOString()]
    );

    const data = raw.map(r => ({
      date: (new Date(r.recorded_at)).toISOString().slice(0,10),
      value: r.canonical_value,
    }));

    if (unit) {
      this.validateUnit(kind, unit);
      return data.map(d => ({ date: d.date, value: fromCanonical(kind, d.value, unit), unit }));
    }

    const canonicalUnit = kind === MetricKind.DISTANCE ? 'm' : 'K';
    return data.map(d => ({ date: d.date, value: d.value, unit: canonicalUnit }));
  }
}