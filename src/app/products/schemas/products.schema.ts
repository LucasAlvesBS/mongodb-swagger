import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Size } from '../../../shared/enum/size.enum';

export type ProductsDocument = Product & Document;

@Schema()
export class Product {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ enum: Size })
  @ApiProperty()
  size: Size;

  @Prop()
  @ApiProperty()
  color: string;

  @Prop()
  @ApiProperty()
  price: number;

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  @Prop({ default: Date.now })
  @ApiProperty()
  updatedAt: Date;

  constructor(product?: Partial<Product>) {
    this.size = product?.size;
    this.color = product?.color;
    this.price = product?.price;
    this.createdAt = product?.createdAt;
    this.updatedAt = product?.updatedAt;
  }
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
