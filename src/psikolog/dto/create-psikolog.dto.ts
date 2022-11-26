import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreatePsikologDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
