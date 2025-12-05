import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { MetricKind } from '../metric.entity';

export enum DistanceUnit {
  M = 'm',
  CM = 'cm',
  IN = 'in',
  FT = 'ft',
  YD = 'yd',
}

export enum TemperatureUnit {
  C = 'C',
  F = 'F',
  K = 'K',
}

export class CreateMetricDto {
  @IsEnum(MetricKind)
  kind: MetricKind;

  @IsNumber()
  value: number;

  @IsString()
  unit: string;

  @IsDateString()
  date: string;
}