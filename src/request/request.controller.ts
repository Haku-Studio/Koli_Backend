import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  // UseInterceptors,
  Param,
  Delete,
  UseGuards,
  // Req,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import ReqUser from 'src/common/interfaces/reqUser';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
// import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('requests')
// @UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  createRequest(
    @Body() requestDto: CreateRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.requestService.create(requestDto, user);
  }

  @Get()
  getRequests() {
    return this.requestService.findAll();
  }

  @Get('owner')
  getRequestsByOwner(@CurrentUser() user: User) {
    return this.requestService.findByRequester(user.id);
  }

  @Get(':id')
  getOneRequest(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  updateRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestDto: UpdateRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.requestService.update(id, requestDto, user);
  }

  @Delete(':id')
  deleteTravel(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.remove(id);
  }
}
