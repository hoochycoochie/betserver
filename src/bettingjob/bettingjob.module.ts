import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NEW_BETTING_JOB_NAME, PROCESS_BETTING_JOB_NAME } from 'src/types';

import { BettingjobController } from './bettingjob.controller';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { GatewayEvent } from 'src/gateway/gateway.event';
import { GatewayModule } from 'src/gateway/gateway.module';
import { HttpModule } from '@nestjs/axios';
import { BettingJobConsumer } from './bettingjob.consumer';
import { BettingJobProcess } from './bettinjob.process';
import { BettingjobService } from './bettingjob.service';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: NEW_BETTING_JOB_NAME
      },
      {
        name: PROCESS_BETTING_JOB_NAME
      }
    ),
    RedisModule,
    GatewayModule,
    HttpModule
  ],
  providers: [
    BettingJobConsumer,
    BettingJobProcess,
    RedisService,
    GatewayEvent,
    BettingjobService
  ],
  controllers: [BettingjobController]
})
export class BettingjobModule {}
