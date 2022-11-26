import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

class QuizAnswerDto {
  @IsNotEmpty()
  @IsInt()
  question_id: number;

  @IsNotEmpty()
  @IsInt()
  option_id: number;
}

export class SubmitQuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  answers: QuizAnswerDto[];
}
