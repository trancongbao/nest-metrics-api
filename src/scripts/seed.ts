import { DataSource } from 'typeorm';
import { DistanceMetric } from '../distance/distance.entity';
import { TemperatureMetric } from '../temperature/temperature.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [DistanceMetric, TemperatureMetric],
  synchronize: false,
});

async function run() {
  await ds.initialize();

  const distanceRepo = ds.getRepository(DistanceMetric);
  const tempRepo = ds.getRepository(TemperatureMetric);

  const now = new Date();

  function daysAgo(n: number) {
    return new Date(now.getTime() - n * 86400000);
  }

  // Generate 10 metrics for distance
  const distanceData = [
    // last few days
    { value: 10, recorded_at: offset(daysAgo(1), 1) },
    { value: 20, recorded_at: offset(daysAgo(2), 1) },
    { value: 30, recorded_at: offset(daysAgo(2), 2) }, // same day, unique time
    { value: 40, recorded_at: offset(daysAgo(10), 1) },
    { value: 50, recorded_at: offset(daysAgo(10), 2) }, // same day, unique time

    // previous month
    { value: 60, recorded_at: daysAgo(30) },
    { value: 70, recorded_at: daysAgo(40) },
    { value: 80, recorded_at: daysAgo(50) },

    // one year ago
    { value: 90, recorded_at: daysAgo(365) },
    { value: 100, recorded_at: daysAgo(400) },
  ];

  await distanceRepo.save(distanceData);

  // Generate 10 metrics for temperature
  const tempData = [
    // last few days
    { value: 293.15, recorded_at: offset(daysAgo(1), 1) },
    { value: 294.15, recorded_at: offset(daysAgo(2), 1) },
    { value: 295.15, recorded_at: offset(daysAgo(2), 2) },
    { value: 296.15, recorded_at: offset(daysAgo(10), 1) },
    { value: 297.15, recorded_at: offset(daysAgo(10), 2) },

    // previous month
    { value: 289.15, recorded_at: daysAgo(30) },
    { value: 288.15, recorded_at: daysAgo(40) },
    { value: 287.15, recorded_at: daysAgo(50) },

    // one year ago
    { value: 285.15, recorded_at: daysAgo(365) },
    { value: 284.15, recorded_at: daysAgo(400) },
  ];

  await tempRepo.save(tempData);

  console.log('Seed completed');
  await ds.destroy();
}

run();

function offset(date: Date, ms: number) {
  return new Date(date.getTime() + ms);
}
