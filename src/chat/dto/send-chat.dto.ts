import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SendChatDto {
  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
