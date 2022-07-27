import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { MessageHelper } from '../../../helpers/message.helper';
import { Size } from '../../../shared/enum/size.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Size, { message: MessageHelper.SIZE_VALID })
  @ApiProperty()
  size: Size;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;
}
