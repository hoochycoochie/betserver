import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { RedisService } from 'src/redis/redis.service';
import {
  BettingDto,
  NEW_BETTING_JOB_NAME,
  PROCESS_BETTING_JOB_NAME
} from 'src/types';
import { generateItems } from 'src/utils';

@Processor(NEW_BETTING_JOB_NAME)
export class BettingJobConsumer {
  constructor(
    private redisService: RedisService,
    @InjectQueue(PROCESS_BETTING_JOB_NAME) private readonly processQueue: Queue
  ) {}

  @Process(NEW_BETTING_JOB_NAME)
  async saveInDb(job: Job<unknown>): Promise<void | Error> {
    try {
      let dto: BettingDto;
      const { data } = job;
      dto = data as BettingDto;

      const items: string[] = await generateItems(dto);

      items.forEach(
        async (item: string) => await this.redisService.rPush(item)
      );

      return;
    } catch (error) {
      throw error;
    } finally {
      await this.processQueue.add(PROCESS_BETTING_JOB_NAME, {});
    }
  }
}
