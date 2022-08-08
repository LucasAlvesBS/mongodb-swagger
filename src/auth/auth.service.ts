import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../app/users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    user.password = undefined;
    return {
      token: token,
      user,
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.checkUser(email);
    } catch (error) {
      hashSync(password, 10);
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
