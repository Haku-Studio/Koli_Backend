import { Travel } from 'src/travel/entities/travel.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['requester', 'travel']) // empêche plusieurs demandes du même user sur un même voyage
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  requester: User;

  @ManyToOne(() => Travel, (travel) => travel.requests, { onDelete: 'CASCADE' })
  travel: Travel;
}
