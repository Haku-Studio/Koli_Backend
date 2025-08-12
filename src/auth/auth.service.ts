import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { BusinessLogService } from 'src/business-log/business-log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logService: BusinessLogService,
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

  async socialLogin(
    user: {
      email: string;
      name: string;
      provider: string;
      picture: string;
    },
    res: Response,
  ) {
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

      await this.logService.log(
        existingUser.id,
        'REGISTERLOGIN_USER',
        'Request',
      );
    }

    const payload = { email: existingUser.email, sub: existingUser.id };
    const accessToken = this.jwtService.sign(payload);

    // console.log(accessToken);

    // return {
    //   accessToken,
    //   user: existingUser,
    // };

    // Récupère l'URL du frontend depuis les variables d'environnement pour plus de flexibilité
    // const frontendUrl = this.configService.get<string>(
    //   'FRONTEND_URL',
    //   'http://localhost:5173',
    // );

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }
}
