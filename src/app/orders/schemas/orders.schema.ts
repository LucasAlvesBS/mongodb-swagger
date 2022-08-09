import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../products/schemas/products.schema';
import { User } from '../../users/schemas/users.schema';
import { Transform, Type } from 'class-transformer';

export type OrdersDocument = Order & Document;

@Schema()
export class Order {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  @ApiProperty()
  productsQuantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  @Type(() => User)
  @ApiProperty({ type: () => mongoose.Schema.Types.ObjectId })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }])
  @Type(() => Product)
  @ApiProperty({ type: () => mongoose.Schema.Types.ObjectId })
  products: Product[];

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  @Prop({ default: Date.now })
  @ApiProperty()
  updatedAt: Date;

  constructor(order?: Partial<Order>) {
    this.productsQuantity = order?.productsQuantity;
    this.user = order?.user;
    this.products = order?.products;
    this.createdAt = order?.createdAt;
    this.updatedAt = order?.updatedAt;
  }
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
