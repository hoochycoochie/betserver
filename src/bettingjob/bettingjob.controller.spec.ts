import { Test, TestingModule } from '@nestjs/testing';
import { BettingjobController } from './bettingjob.controller';

describe('BettingjobController', () => {
  let controller: BettingjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BettingjobController]
    }).compile();

    controller = module.get<BettingjobController>(BettingjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
