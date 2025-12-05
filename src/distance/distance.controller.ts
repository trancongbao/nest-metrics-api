import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { CreateDistanceDto } from './dto/create-distance.dto';
import { DistanceUnit } from './distance.units';

@Controller('distance')
export class DistanceController {
  constructor(private svc: DistanceService) {}

  @Post()
  create(@Body() dto: CreateDistanceDto) {
    return this.svc.create(dto);
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
