import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveMailDto } from './dto/save-mail.dto';
import { Mail, MailDocument } from './schemas/mail.schema';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail.name) private readonly mailModel: Model<MailDocument>,
  ) {}

  async save(data: SaveMailDto): Promise<MailDocument> {
    const mail = await this.mailModel.create(data);
    return await mail.save();
  }
}
