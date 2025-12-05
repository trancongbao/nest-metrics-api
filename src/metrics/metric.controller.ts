import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MetricService } from './metric.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricKind } from './metric.entity';

@Controller('metrics')
export class MetricController {
  constructor(private svc: MetricService) {}

  @Post()
  async create(@Body() dto: CreateMetricDto) {
    return this.svc.create(dto);
  }

  @Get('list')
  async list(@Query('kind') kind: MetricKind, @Query('unit') unit?: string) {
    return this.svc.list(kind, unit);
  }

  @Get('chart')
  async chart(
    @Query('kind') kind: MetricKind,
    @Query('periodMonths') periodMonths = '1',
    @Query('unit') unit?: string,
  ) {
    const months = parseInt(periodMonths, 10) || 1;
    return this.svc.chart(kind, months, unit);
  }
}