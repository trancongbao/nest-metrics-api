import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { TemperatureUnit } from './temperature.units';

@Controller('temperature')
export class TemperatureController {
  constructor(private svc: TemperatureService) {}

  @Post()
  create(@Body() dto: CreateTemperatureDto) {
    return this.svc.create(dto);
  }

  @Get('list')
  list(@Query('unit') unit?: TemperatureUnit) {
    return this.svc.list(unit);
  }

  @Get('chart')
  chart(@Query('months') months = '1', @Query('unit') unit?: TemperatureUnit) {
    return this.svc.chart(parseInt(months), unit);
  }
}
