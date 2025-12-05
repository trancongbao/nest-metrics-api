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
  value: number;

  @Column('timestamp with time zone')
  recorded_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
