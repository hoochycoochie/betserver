import { Injectable } from '@nestjs/common';
 
import * as path from 'path';
import { BettingDto } from 'src/types';
import { Worker } from 'worker_threads';
@Injectable()
export class BettingjobService {
    constructor() { }
    async runService(dto: BettingDto) {

        const file_path = path.resolve('./worker.js')

        return new Promise((resolve, reject) => {
            const worker = new Worker(file_path, { workerData: { value: dto } });
            worker.on('message', resolve);
            worker.on('error', (error)=>{
                console.log('error worker',error)
                reject(error)
            });
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
}
