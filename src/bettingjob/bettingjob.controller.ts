import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { GatewayEvent } from 'src/gateway/gateway.event';
import { RedisService } from 'src/redis/redis.service';
import {
  BettingDto,
  NEW_BETTING_JOB_NAME,
  PROCESS_BETTING_JOB_NAME,
  ProcessedBettingDto
} from 'src/types';
import { BettingjobService } from './bettingjob.service';

@Controller()
export class BettingjobController {
  constructor(
    private redisService: RedisService,
    private socketService: GatewayEvent,
    private bettingService: BettingjobService,

    @InjectQueue(NEW_BETTING_JOB_NAME) private readonly consumerQueue: Queue,
    @InjectQueue(PROCESS_BETTING_JOB_NAME) private readonly processQueue: Queue
  ) {}


  @Get()
  async get() {
   return "hey joe"
  }

  @Post('betting')
  async createBetting(@Body() bettingDto: BettingDto) {
    try {
      if (!bettingDto.mid) {
        bettingDto.mid = await this.redisService.getSize();
      }
     // await this.consumerQueue.add(NEW_BETTING_JOB_NAME, bettingDto);
     await this.bettingService.runService(bettingDto)
     await this.processQueue.add(PROCESS_BETTING_JOB_NAME, {});
      return bettingDto;
    } catch (error) {
       
      throw error;
    }
  }

  @Post('processed')
  async processedBetting(@Body() processedBettingDto: ProcessedBettingDto) {
    try {
      await this.socketService.server
        .to(processedBettingDto.cid)
        .emit('processed', processedBettingDto);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
