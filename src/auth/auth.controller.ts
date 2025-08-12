import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // console.log('req.user', req.user);

    // const { jwt, user } = await this.authService.socialLogin(req.user as CreateUserDto);
    // res.redirect(`http://localhost:5173/auth/callback?token=${jwt}&name=${user.name}&email=${user.email}&picture=${user.picture}`);

    return await this.authService.socialLogin(req.user as CreateUserDto, res);
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
