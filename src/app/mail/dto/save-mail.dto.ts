import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class SaveMailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  destinationName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  destinationAddress: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  body: string;
}
