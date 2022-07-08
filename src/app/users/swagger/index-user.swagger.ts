import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/users.schema';

export class IndexUserSwagger extends OmitType(User, ['password']) {}
