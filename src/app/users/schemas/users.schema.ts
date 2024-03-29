import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Role } from '../../../shared/enum/role.enum';
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
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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

  @Prop({ enum: Role, default: Role.USER })
  @ApiProperty({ enum: Role })
  role: Role;

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
