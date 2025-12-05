export enum DistanceUnit {
  M = 'm',
  CM = 'cm',
  IN = 'in',
  FT = 'ft',
  YD = 'yd',
}
export const DistanceUnits = Object.values(DistanceUnit);

export function toMeters(value: number, unit: DistanceUnit): number {
  switch (unit) {
    case DistanceUnit.M:
      return value;
    case DistanceUnit.CM:
      return value / 100;
    case DistanceUnit.IN:
      return value * 0.0254;
    case DistanceUnit.FT:
      return value * 0.3048;
    case DistanceUnit.YD:
      return value * 0.9144;
  }
}
export function fromMeters(m: number, unit: DistanceUnit): number {
  switch (unit) {
    case DistanceUnit.M:
      return m;
    case DistanceUnit.CM:
      return m * 100;
    case DistanceUnit.IN:
      return m / 0.0254;
    case DistanceUnit.FT:
      return m / 0.3048;
    case DistanceUnit.YD:
      return m / 0.9144;
  }
}
