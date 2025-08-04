import { Module } from '@nestjs/common';
import { BusinessLogService } from './business-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLog } from './entities/business-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLog])],
  providers: [BusinessLogService],
  exports: [BusinessLogService],
})
export class BusinessLogModule {}
