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

  @Prop()
  @ApiProperty()
  profileImage: string;

  constructor(user?: Partial<User>) {
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.profileImage = user?.profileImage;
  }
}

export const UsersSchema = SchemaFactory.createForClass(User);
