import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'temperature_metrics' })
export class TemperatureMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  canonical_kelvin: number;

  @Column('double precision')
  original_value: number;

  @Column('varchar')
  original_unit: string;

  @Column('timestamp with time zone')
  recorded_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
