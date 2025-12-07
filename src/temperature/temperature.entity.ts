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
  value: number;

  @Column('timestamp with time zone', { unique: true })
  recorded_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
