import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MetricKind {
  DISTANCE = 'distance',
  TEMPERATURE = 'temperature',
}

@Entity({ name: 'metrics' })
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  canonical_value: number;

  @Column('double precision')
  original_value: number;

  @Column({ type: 'varchar' })
  original_unit: string;

  @Column({ type: 'varchar' })
  kind: MetricKind;

  @Column({ type: 'timestamp with time zone' })
  recorded_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}