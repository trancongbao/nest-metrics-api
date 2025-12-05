import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { DistanceUnit } from '../distance.units';

export class CreateDistanceDto {
  @IsNumber()
  value: number;

  @IsEnum(DistanceUnit)
  unit: DistanceUnit;

  @IsDateString()
  date: string;
}
