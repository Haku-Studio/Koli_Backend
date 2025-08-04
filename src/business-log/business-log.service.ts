import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BusinessLog } from './entities/business-log.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusinessLogService {
  constructor(
    @InjectRepository(BusinessLog)
    private readonly businessLogRepository: Repository<BusinessLog>,
  ) {}

  log(
    userId: number,
    action: string,
    entity: string,
    meta?: Record<string, any>,
  ) {
    const log = this.businessLogRepository.create({
      userId,
      action,
      entity,
      meta,
    });
    return this.businessLogRepository.save(log);
  }
}
