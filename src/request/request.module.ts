import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { Requests } from './entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLogModule } from 'src/business-log/business-log.module';

@Module({
  imports: [BusinessLogModule, TypeOrmModule.forFeature([Requests])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
