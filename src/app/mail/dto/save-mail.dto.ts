import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class SaveMailDto {
  @IsNotEmpty()
  @IsString()
  destinationName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  destinationAddress: string;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
