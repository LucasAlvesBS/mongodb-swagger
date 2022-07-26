import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAllMailDto } from './dto/find-all-mail.dto';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';
import { Mail, MailDocument } from './schemas/mail.schema';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail.name) private readonly mailModel: Model<MailDocument>,
  ) {}

  async findAll(params?: Partial<FindAllMailDto>) {
    let query: any;
    if (params?.dueDateLte) {
      query = await this.mailModel.find({
        dueDate: { $lte: params.dueDateLte },
      });
    }

    if (params?.status) {
      query = await this.mailModel.find({
        status: { $eq: params.status },
      });
    }
    return query;
  }

  async save(data: SaveMailDto): Promise<MailDocument> {
    const mail = await this.mailModel.create(data);
    return await mail.save();
  }

  async updateStatus(id: string, status: MailStatusEnum): Promise<void> {
    const mail = await this.mailModel.findOne({ _id: id });
    await this.mailModel.updateOne(
      { _id: mail.id },
      { $set: { status: status } },
    );
  }
}
