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
import { TravelService } from './travel.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import ReqUser from 'src/interfaces/reqUser';
// import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('travels')
// @UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard)
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  createTravel(@Body() travelDto: CreateTravelDto, @Req() req: ReqUser) {
    return this.travelService.create(travelDto, req);
  }

  @Get()
  getTravels() {
    return this.travelService.findAll();
  }

  @Get('owner')
  getTravelsByOwner(@Req() req: ReqUser) {
    return this.travelService.findByOwner(req.user.id);
  }

  @Get(':id')
  getOneTravel(@Param('id', ParseIntPipe) id: number) {
    return this.travelService.findOne(id);
  }

  @Patch(':id')
  updateTravel(
    @Param('id', ParseIntPipe) id: number,
    @Body() travelDto: UpdateTravelDto,
    @Req() req: ReqUser,
  ) {
    return this.travelService.update(id, travelDto, req);
  }

  @Delete(':id')
  deleteTravel(@Param('id', ParseIntPipe) id: number) {
    return this.travelService.remove(id);
  }
}
