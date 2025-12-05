import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './metric.entity';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Metric])],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}