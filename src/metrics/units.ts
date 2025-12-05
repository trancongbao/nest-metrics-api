import { DistanceUnit, TemperatureUnit } from './dto/create-metric.dto';
import { MetricKind } from './metric.entity';

export const DistanceUnits = Object.values(DistanceUnit);
export const TemperatureUnits = Object.values(TemperatureUnit);

export function toCanonical(kind: MetricKind, value: number, unit: string): number {
  if (kind === MetricKind.DISTANCE) return distanceToMeters(value, unit as DistanceUnit);
  if (kind === MetricKind.TEMPERATURE) return temperatureToKelvin(value, unit as TemperatureUnit);
  throw new Error('Unknown kind');
}

export function fromCanonical(kind: MetricKind, canonicalValue: number, targetUnit: string): number {
  if (kind === MetricKind.DISTANCE) return metersToTarget(canonicalValue, targetUnit as DistanceUnit);
  if (kind === MetricKind.TEMPERATURE) return kelvinToTarget(canonicalValue, targetUnit as TemperatureUnit);
  throw new Error('Unknown kind');
}

function distanceToMeters(value: number, unit: DistanceUnit) {
  switch (unit) {
    case 'm': return value;
    case 'cm': return value / 100;
    case 'in': return value * 0.0254;
    case 'ft': return value * 0.3048;
    case 'yd': return value * 0.9144;
    default: throw new Error(`Unsupported distance unit: ${unit}`);
  }
}

function metersToTarget(m: number, unit: DistanceUnit) {
  switch (unit) {
    case 'm': return m;
    case 'cm': return m * 100;
    case 'in': return m / 0.0254;
    case 'ft': return m / 0.3048;
    case 'yd': return m / 0.9144;
    default: throw new Error(`Unsupported distance unit: ${unit}`);
  }
}

function temperatureToKelvin(value: number, unit: TemperatureUnit) {
  switch (unit) {
    case 'K': return value;
    case 'C': return value + 273.15;
    case 'F': return (value - 32) * (5/9) + 273.15;
    default: throw new Error(`Unsupported temperature unit: ${unit}`);
  }
}

function kelvinToTarget(k: number, unit: TemperatureUnit) {
  switch (unit) {
    case 'K': return k;
    case 'C': return k - 273.15;
    case 'F': return (k - 273.15) * (9/5) + 32;
    default: throw new Error(`Unsupported temperature unit: ${unit}`);
  }
}