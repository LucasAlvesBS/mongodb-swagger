import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MailStatusEnum } from '../enum/mail-status.enum';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop({ required: true })
  @ApiProperty()
  destinationName: string;

  @Prop({ required: true })
  @ApiProperty()
  destinationAddress: string;

  @Prop({ required: true })
  @ApiProperty()
  dueDate: Date;

  @Prop({ required: true })
  @ApiProperty()
  subject: string;

  @Prop({ required: true })
  @ApiProperty()
  body: string;

  @Prop({ enum: MailStatusEnum, default: MailStatusEnum.WAITING })
  @ApiProperty()
  status: string;

  @Prop({ default: Date.now })
  @ApiProperty()
  createdAt: Date;

  @Prop({ default: Date.now })
  @ApiProperty()
  updatedAt: Date;

  @Prop()
  @ApiProperty()
  deletedAt: Date;

  constructor(mail?: Partial<Mail>) {
    this.destinationAddress = mail?.destinationAddress;
    this.dueDate = mail?.dueDate;
    this.status = mail?.status;
    this.createdAt = mail?.createdAt;
    this.updatedAt = mail?.updatedAt;
    this.deletedAt = mail?.deletedAt;
  }
}

export const mailSchema = SchemaFactory.createForClass(Mail);
