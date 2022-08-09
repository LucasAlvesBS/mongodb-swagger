import { SetMetadata } from '@nestjs/common';
import { User } from 'src/app/users/schemas/users.schema';
import { Action, Subjects } from './ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const checkAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRule {
  action = Action.Read;
  subject = User;
}

export class CreateUserAbility implements RequiredRule {
  action = Action.Create;
  subject = User;
}

export class UpdateUserAbility implements RequiredRule {
  action = Action.Update;
  subject = User;
}

export class DeleteUserAbility implements RequiredRule {
  action = Action.Delete;
  subject = User;
}
