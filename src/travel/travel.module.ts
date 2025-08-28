import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel } from './entities/travel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLogModule } from 'src/business-log/business-log.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [BusinessLogModule, TypeOrmModule.forFeature([Travel, User])],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
