import { HttpService } from '@nestjs/axios';
import { Processor, Process } from '@nestjs/bull';
import { lastValueFrom, map } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { PROCESS_BETTING_JOB_NAME, ProcessedBettingDto } from 'src/types';
import { parseItem } from 'src/utils';

@Processor(PROCESS_BETTING_JOB_NAME)
export class BettingJobProcess {
  constructor(
    private readonly httpService: HttpService,
    private redisService: RedisService
  ) {}

  @Process(PROCESS_BETTING_JOB_NAME)
  async lpop(): Promise<void | Error> {
    try {
      let item = await this.redisService.lpop();
      
      while (item) {
        const body: ProcessedBettingDto = await parseItem(item);

          await lastValueFrom(
          this.httpService
            .post('http://api:3001/processed', body)
            .pipe(map((resp) => resp.data))
        );
          
        item = await this.redisService.lpop();
      }
    } catch (error) {
      console.log('error process',error)
      throw error;
    }
  }
}
