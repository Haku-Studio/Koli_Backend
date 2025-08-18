import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BusinessLog } from './entities/business-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBusinessLogDto } from './dto/update-business-log.dto';
import { CreateBusinessLogDto } from './dto/create-business-log.dto';

@Injectable()
export class BusinessLogService {
  constructor(
    @InjectRepository(BusinessLog)
    private readonly businessLogRepository: Repository<BusinessLog>,
  ) {}

  async log(createLogDto: CreateBusinessLogDto) {
    const log = this.businessLogRepository.create(createLogDto);
    return await this.businessLogRepository.save(log);
  }

  async findAll(fiters: UpdateBusinessLogDto) {
    return this.businessLogRepository.find({
      where: fiters,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
