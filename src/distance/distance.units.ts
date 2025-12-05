export enum DistanceUnit {
  M = 'm',
  CM = 'cm',
  IN = 'in',
  FT = 'ft',
  YD = 'yd',
}
export const DistanceUnits = Object.values(DistanceUnit);

// Define conversion factors *to meters* (1 of the unit = this many meters)
export const UNIT_TO_METER_FACTOR: Record<DistanceUnit, number> = {
  [DistanceUnit.M]: 1,
  [DistanceUnit.CM]: 0.01, // 1 cm = 0.01 m
  [DistanceUnit.IN]: 0.0254,
  [DistanceUnit.FT]: 0.3048,
  [DistanceUnit.YD]: 0.9144,
};

export function toMeters(value: number, unit: DistanceUnit): number {
  return value * UNIT_TO_METER_FACTOR[unit];
}

export function fromMeters(m: number, unit: DistanceUnit): number {
  // To convert *from* meters, you divide by the factor
  return m / UNIT_TO_METER_FACTOR[unit];
}
