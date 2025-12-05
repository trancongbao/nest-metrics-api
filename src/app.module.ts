import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetricModule } from './metrics/metric.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,    // makes env available everywhere
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        synchronize: false,
        logging: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),

    MetricModule,
  ],
})
export class AppModule {}
