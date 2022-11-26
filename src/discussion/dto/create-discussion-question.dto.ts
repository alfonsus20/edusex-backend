import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscussionQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsInt()
  topic_id: number;
}
