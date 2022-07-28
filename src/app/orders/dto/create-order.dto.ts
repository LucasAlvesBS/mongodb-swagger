import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Product } from '../../products/schemas/products.schema';
import { User } from '../../users/schemas/users.schema';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @ApiProperty()
  productsQuantity: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  user: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  products: ObjectId[];
}
