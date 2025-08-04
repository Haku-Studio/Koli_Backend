import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_logs')
export class BusinessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  action: string; // exemple: CREATE_TRAVEL

  @Column()
  entity: string; // exemple: Travel

  @Column({ type: 'json', nullable: true })
  meta?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
