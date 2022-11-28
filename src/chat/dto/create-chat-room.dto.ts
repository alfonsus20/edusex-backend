import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatRoomDto {
  @IsInt()
  @IsNotEmpty()
  psikolog_id: number;
}
