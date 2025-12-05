import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DistanceModule } from './distance/distance.module';
import { TemperatureModule } from './temperature/temperature.module';

@Module({
  imports: [
    // Load env variables globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeORM connection using ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        logging: false,
        synchronize: false,
        autoLoadEntities: true, // loads all *.entity
      }),
    }),

    DistanceModule,
    TemperatureModule,
  ],
})
export class AppModule {}
