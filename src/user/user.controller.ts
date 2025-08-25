import {
  Controller,
  Get,
  // Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getProfile(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: User, @Body() userDto: UpdateUserDto) {
    return this.userService.update(user.id, userDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
