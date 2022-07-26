import { OmitType } from '@nestjs/swagger';
import { Mail } from '../schemas/mail.schema';

export class CreateMailSwagger extends OmitType(Mail, ['deletedAt']) {}
