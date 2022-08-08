import { OmitType } from '@nestjs/swagger';
import { User } from '../../app/users/schemas/users.schema';

export class LoginSwagger extends OmitType(User, [
  'name',
  'profileImage',
  'role',
  'orders',
  'createdAt',
]) {}
