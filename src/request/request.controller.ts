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
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import ReqUser from 'src/interfaces/reqUser';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
// import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('requests')
// @UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  createRequest(@Body() requestDto: CreateRequestDto, @Req() req: ReqUser) {
    return this.requestService.create(requestDto, req);
  }

  @Get()
  getRequests() {
    return this.requestService.findAll();
  }

  @Get('owner')
  getRequestsByOwner(@Req() req: ReqUser) {
    return this.requestService.findByRequester(req.user.id);
  }

  @Get(':id')
  getOneRequest(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  updateRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestDto: UpdateRequestDto,
    @Req() req: ReqUser,
  ) {
    return this.requestService.update(id, requestDto, req);
  }

  @Delete(':id')
  deleteTravel(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.remove(id);
  }
}
