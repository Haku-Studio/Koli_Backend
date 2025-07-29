import {
  Controller,
  Get,
  // Post,
  Body,
  // Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
