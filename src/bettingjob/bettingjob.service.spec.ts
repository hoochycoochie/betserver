import { Test, TestingModule } from '@nestjs/testing';
import { BettingjobService } from './bettingjob.service';

describe('BettingjobService', () => {
  let service: BettingjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BettingjobService]
    }).compile();

    service = module.get<BettingjobService>(BettingjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
