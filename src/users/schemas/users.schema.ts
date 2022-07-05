import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

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

  constructor(user?: Partial<User>) {
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
  }
}

export const UsersSchema = SchemaFactory.createForClass(User);
