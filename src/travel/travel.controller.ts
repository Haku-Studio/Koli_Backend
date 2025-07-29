import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TravelService } from './travel.service';
// import { CreateTravelDto } from './dto/create-travel.dto';
// import { UpdateTravelDto } from './dto/update-travel.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('travels')
@UseGuards(JwtAuthGuard)
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  create() {
    return this.travelService.create();
  }

  @Get()
  findAll() {
    return this.travelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.travelService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
