import { Global, Module } from '@nestjs/common';
import { GatewayEvent } from './gateway.event';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GatewayEvent]
})
export class GatewayModule {}
