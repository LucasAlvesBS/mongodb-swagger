import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendEmailInterface } from 'src/app/sendgrid/interface/send-email.interface';
import { SendgridService } from 'src/app/sendgrid/sendgrid.service';
import { MailStatusEnum } from '../enum/mail-status.enum';
import { MailService } from '../mail.service';

@Injectable()
export class MailCron {
  private logger = new Logger(MailCron.name);

  constructor(
    private readonly mailService: MailService,
    private readonly sendgridService: SendgridService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handler() {
    const mailList = await this.mailService.findAll({
      dueDateLte: new Date(),
      status: MailStatusEnum.WAITING,
    });

    for (const mail of mailList) {
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: mail.destinationName,
                email: mail.destinationAddress,
              },
            ],
          },
        ],
        from: {
          email: 'vida-lokalucas@hotmail.com',
          name: 'Lucas',
        },
        reply_to: {
          email: 'lucasalves_bs@hotmail.com',
          name: 'Lucas',
        },
        subject: mail.subject,
        content: [
          {
            type: 'text/html',
            value: mail.body,
          },
        ],
      };
      await this.sendgridService.sendEmail(data);
      await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
      this.logger.log('E-mail enviado com sucesso');
    }

    return null;
  }
}
