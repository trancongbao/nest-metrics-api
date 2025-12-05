import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { TemperatureUnit } from '../temperature.units';

export class CreateTemperatureDto {
  @IsNumber()
  value: number;

  @IsEnum(TemperatureUnit)
  unit: TemperatureUnit;

  @IsDateString()
  date: string;
}
