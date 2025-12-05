import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Metric } from './src/metrics/metric.entity';

dotenvConfig(); // load .env

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Metric],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // migrations only
});

export default dataSource;
