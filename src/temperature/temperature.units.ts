export enum TemperatureUnit {
  C = 'C',
  F = 'F',
  K = 'K',
}
export const TemperatureUnits = Object.values(TemperatureUnit);

export function toKelvin(value: number, u: TemperatureUnit) {
  if (u === 'K') return value;
  if (u === 'C') return value + 273.15;
  return (value - 32) * (5 / 9) + 273.15;
}
export function fromKelvin(k: number, u: TemperatureUnit) {
  if (u === 'K') return k;
  if (u === 'C') return k - 273.15;
  return ((k - 273.15) * 9) / 5 + 32;
}
