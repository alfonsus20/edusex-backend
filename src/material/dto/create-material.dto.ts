import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class QuizOptionDto {
  @IsString()
  @IsNotEmpty()
  option: string;

  @IsBoolean()
  @IsNotEmpty()
  is_true: boolean;
}

class QuizQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => QuizOptionDto)
  options: QuizOptionDto[];
}

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  topicId: number;

  @IsUrl()
  @IsNotEmpty()
  illustration_url: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  video_url: string;

  @IsArray()
  @ArrayMinSize(5)
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  quiz_questions: QuizQuestionDto[];
}
