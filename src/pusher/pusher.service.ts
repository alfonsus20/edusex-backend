import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Injectable()
export class PusherService extends Pusher {
  constructor(configService: ConfigService) {
    super({
      appId: configService.get('PUSHER_APP_ID'),
      key: configService.get('PUSHER_KEY'),
      secret: configService.get('PUSHER_SECRET'),
      cluster: configService.get('PUSHER_CLUSTER'),
      useTLS: true,
    });
  }
}
