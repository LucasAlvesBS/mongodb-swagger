import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Order } from '../../orders/schemas/orders.schema';

export type UsersDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
})
export class User {
  @Prop({ trim: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop()
  @ApiProperty()
  profileImage: string;

  @Type(() => Order)
  orders: Order[];

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  constructor(user?: Partial<User>) {
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.profileImage = user?.profileImage;
    this.orders = user?.orders;
    this.createdAt = user?.createdAt;
  }
}

const UsersSchema = SchemaFactory.createForClass(User);

UsersSchema.virtual('orders', {
  ref: 'Orders',
  localField: '_id',
  foreignField: 'user',
});

export { UsersSchema };
