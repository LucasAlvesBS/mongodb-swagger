import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { Mail, mailSchema } from './schemas/mail.schema';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: mailSchema }]),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
