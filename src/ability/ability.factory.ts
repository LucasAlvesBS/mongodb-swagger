import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from '../shared/enum/role.enum';
import { User } from '../app/users/schemas/users.schema';
import { MessageHelper } from '../helpers/message.helper';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role === Role.ADMIN) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, User);
      can(Action.Update, User);
      can(Action.Delete, User);
      cannot(Action.Create, User).because(MessageHelper.FORBBIDEN);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
