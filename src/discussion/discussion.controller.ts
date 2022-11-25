import { Controller } from '@nestjs/common';
import { DiscussionService } from './discussion.service';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}
}
