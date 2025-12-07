export enum DistanceUnit {
  M = 'm',
  CM = 'cm',
  IN = 'in',
  FT = 'ft',
  YD = 'yd',
}

// Define conversion factors *to meters* (1 of the unit = this many meters)
export const UNIT_TO_METER_FACTOR: Record<DistanceUnit, number> = {
  [DistanceUnit.M]: 1,
  [DistanceUnit.CM]: 0.01,
  [DistanceUnit.IN]: 0.0254,
  [DistanceUnit.FT]: 0.3048,
  [DistanceUnit.YD]: 0.9144,
};
