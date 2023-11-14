import { Module } from '@nestjs/common';
import { redisClientFactory } from './redis-client.factory';
import { RedisService } from './redis.service';

@Module({
  exports: [RedisService, redisClientFactory],

  providers: [redisClientFactory, RedisService]
})
export class RedisModule {}
