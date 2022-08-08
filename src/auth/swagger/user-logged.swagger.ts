import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from 'src/app/users/schemas/users.schema';

export class ReworkedUserSwagger extends OmitType(User, ['password']) {}

export class UserLoggedSwagger {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: ReworkedUserSwagger;
}
