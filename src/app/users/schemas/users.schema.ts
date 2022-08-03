import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Order } from '../../orders/schemas/orders.schema';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop()
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

  @Prop()
  @ApiProperty()
  orders: Order[];

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  constructor(user?: Partial<User>) {
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.profileImage = user?.profileImage;
    this.createdAt = user?.createdAt;
  }
}

export const UsersSchema = SchemaFactory.createForClass(User);
