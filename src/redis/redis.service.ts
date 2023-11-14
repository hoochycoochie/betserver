import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { BETTING_KEY, BETTING_SIZE } from 'src/types';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redis: RedisClient
  ) {}

  onModuleDestroy() {
    this.redis.quit();
  }

  async getSize() {
    let size: string | number | undefined = await this.redis.get(BETTING_SIZE);
    if (size) {
      size = parseInt(size) + 1;
      await this.redis.set(BETTING_SIZE, size);

      return size;
    }
    await this.redis.set(BETTING_SIZE, 1);
    return 1;
  }

  async getAll(): Promise<string[] | Error> {
    try {
      const lst = await this.redis.lRange(BETTING_KEY, 0, -1);
      return lst;
    } catch (error) {
      throw error;
    }
  }

  async getFirst(): Promise<string | Error> {
    try {
      const first = await this.redis.lRange(BETTING_KEY, 0, -0);
      return first.toString();
    } catch (error) {
      throw error;
    }
  }
  async rPush(data: string): Promise<Boolean | Error> {
    try {
      await this.redis.rPush(BETTING_KEY, data);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async lpop(): Promise<string> {
    try {
      const popped = await this.redis.LPOP(BETTING_KEY);

      return popped;
    } catch (error) {
      throw error;
    }
  }
}
