import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel } from './entities/travel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLogModule } from 'src/business-log/business-log.module';

@Module({
  imports: [BusinessLogModule, TypeOrmModule.forFeature([Travel])],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
