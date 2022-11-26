import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyDiscussionQuestionDto {
  @IsNotEmpty()
  @IsString()
  reply: string;
}
