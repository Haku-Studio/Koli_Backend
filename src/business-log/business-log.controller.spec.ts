import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLogController } from './business-log.controller';
import { BusinessLogService } from './business-log.service';

describe('BusinessLogController', () => {
  let controller: BusinessLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessLogController],
      providers: [BusinessLogService],
    }).compile();

    controller = module.get<BusinessLogController>(BusinessLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
