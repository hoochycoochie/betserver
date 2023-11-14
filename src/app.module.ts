import { Module } from '@nestjs/common';

import { GatewayModule } from './gateway/gateway.module';
import { RedisModule } from './redis/redis.module';
import { HttpModule } from '@nestjs/axios';

import { GatewayEvent } from './gateway/gateway.event';
import { BullModule } from '@nestjs/bull';
import { BettingjobModule } from './bettingjob/bettingjob.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379
        }
      })
    }),
    HttpModule,
    GatewayModule,
    RedisModule,
    BettingjobModule
  ],
  //controllers: [AppController],
  providers: [GatewayEvent]
})
export class AppModule {}
