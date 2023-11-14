import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
 
import { lastValueFrom, map } from 'rxjs';
import { Server } from 'socket.io';
import { BettingDto } from 'src/types';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class GatewayEvent implements OnModuleInit {
  @WebSocketServer()
  public server: Server;
  constructor(private readonly httpService: HttpService) {}
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('socket.id', socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newBetting')
  async onNewBet(@MessageBody() body: BettingDto) {
     try {
      const r = await lastValueFrom(
        this.httpService
          .post('http://localhost:3001/betting', body)
          .pipe(map((resp) => resp.data))
      );
   
     } catch (e) {
      
      throw e
     }
  }
}
