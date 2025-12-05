import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DistanceMetric } from './src/distance/distance.entity';
import { TemperatureMetric } from './src/temperature/temperature.entity';

dotenvConfig();

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    DistanceMetric,
    TemperatureMetric,
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
