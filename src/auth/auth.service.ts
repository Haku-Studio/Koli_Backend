import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // Vérification au démarrage
    if (!this.configService.get<string>('JWT_SECRET')) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  async socialLogin(user: {
    email: string;
    name: string;
    provider: string;
    picture: string;
  }) {
    const { email, name, picture, provider } = user;

    let existingUser = await this.userService.findOneByEmail(email);
    if (!existingUser) {
      existingUser = this.userRepository.create({
        email,
        name,
        picture,
        provider,
      });
      await this.userRepository.save(existingUser);
    }

    const payload = { email: existingUser.email, sub: existingUser.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: existingUser,
    };
  }
}
