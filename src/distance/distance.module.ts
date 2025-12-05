import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistanceMetric } from './distance.entity';
import { DistanceService } from './distance.service';
import { DistanceController } from './distance.controller';


@Module({
imports: [TypeOrmModule.forFeature([DistanceMetric])],
controllers: [DistanceController],
providers: [DistanceService],
})
export class DistanceModule {}