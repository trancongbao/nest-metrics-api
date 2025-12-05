import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureMetric } from './temperature.entity';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureMetric])],
  controllers: [TemperatureController],
  providers: [TemperatureService],
})
export class TemperatureModule {}
