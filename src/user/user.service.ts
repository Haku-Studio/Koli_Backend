import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async update(id: number, userDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user!, userDto);
    return this.usersRepository.save(user!);
  }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
