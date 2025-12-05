import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'distance_metrics' })
export class DistanceMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  canonical_meters: number;

  @Column('double precision')
  original_value: number;

  @Column('varchar')
  original_unit: string;

  @Column('timestamp with time zone')
  recorded_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
