import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { MinLength } from 'class-validator';
import { Travel } from 'src/travel/entities/travel.entity';
import { Requests } from 'src/request/entities/request.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  provider: string;

  // @Column()
  // @MinLength(8)
  // password: string;

  @OneToMany(() => Travel, (travel) => travel.owner)
  travels: Travel[];

  @OneToMany(() => Requests, (request) => request.requester)
  requests: Requests[];
}
