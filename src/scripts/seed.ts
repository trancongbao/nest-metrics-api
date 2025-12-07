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

  // Seed distance metrics (meters canonical)
  await distanceRepo.save([
    { value: 10, recorded_at: new Date(now.getTime() - 86400000 * 3) },
    { value: 25, recorded_at: new Date(now.getTime() - 86400000 * 2) },
    { value: 5, recorded_at: new Date(now.getTime() - 86400000) },
  ]);

  // Seed temperature metrics (kelvin canonical)
  await tempRepo.save([
    { value: 293.15, recorded_at: new Date(now.getTime() - 86400000 * 3) },
    { value: 295.15, recorded_at: new Date(now.getTime() - 86400000 * 2) },
    { value: 290.15, recorded_at: new Date(now.getTime() - 86400000) },
  ]);

  console.log('Seed completed');
  await ds.destroy();
}

run();
