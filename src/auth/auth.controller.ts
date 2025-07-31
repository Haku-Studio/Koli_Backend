import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    // console.log('req.user', req.user);

    return await this.authService.socialLogin(req.user as CreateUserDto);
  }

  //   @Get('facebook')
  //   @UseGuards(AuthGuard('facebook'))
  //   async facebookAuth() {}

  //   @Get('facebook/redirect')
  //   @UseGuards(AuthGuard('facebook'))
  //   async facebookRedirect(@Req() req) {
  //     return this.authService.socialLogin(req.user);
  //   }
}
