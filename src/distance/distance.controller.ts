import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { DistanceUnit } from './distance.units';

@Controller('distance')
export class DistanceController {
  constructor(private svc: DistanceService) {}

  @Post()
  create(
    @Body('recordedAt') recordedAt: string,
    @Body('value') value: number,
    @Body('unit') unit?: DistanceUnit,
  ) {
    return this.svc.create(recordedAt, value, unit);
  }

  @Get('list')
  list(@Query('unit') unit?: DistanceUnit) {
    return this.svc.list(unit);
  }

  @Get('chart')
  chart(@Query('months') months = '1', @Query('unit') unit?: DistanceUnit) {
    return this.svc.chart(parseInt(months), unit);
  }
}
