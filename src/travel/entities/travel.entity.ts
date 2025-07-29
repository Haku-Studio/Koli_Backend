import { Requests } from 'src/request/entities/request.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'datetime' })
  departureDate: Date;

  @Column({ type: 'float' })
  weightAvailable: number;

  @ManyToOne(() => User, (user) => user.travels, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Requests, (request) => request.travel)
  requests: Requests[];
}
