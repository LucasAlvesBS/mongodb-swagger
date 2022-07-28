import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type OrdersDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  @ApiProperty()
  productsQuantity: number;

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  @Prop({ default: Date.now })
  @ApiProperty()
  updatedAt: Date;

  constructor(order?: Partial<Order>) {
    this.productsQuantity = order?.productsQuantity;
    this.createdAt = order?.createdAt;
    this.updatedAt = order?.updatedAt;
  }
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
