import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { Mail, mailSchema } from './schemas/mail.schema';
import { MailController } from './mail.controller';
import { MailCron } from './cron/mail.cron';
import { SendgridModule } from '../sendgrid/sendgrid.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: mailSchema }]),
    SendgridModule,
  ],
  providers: [MailService, MailCron],
  controllers: [MailController],
})
export class MailModule {}
