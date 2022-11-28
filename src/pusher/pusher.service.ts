import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService extends Pusher {
  constructor() {
    super({
      appId: '1514727',
      key: '2dfeb759d06c4752990a',
      secret: 'c75127f3198aea815a24',
      cluster: 'ap1',
      useTLS: true,
    });
  }
}
