import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLogService } from './business-log.service';

describe('BusinessLogService', () => {
  let service: BusinessLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLogService],
    }).compile();

    service = module.get<BusinessLogService>(BusinessLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
