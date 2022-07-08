import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {}

  async findAllUsers() {
    return await this.usersModel.find();
  }

  async findOneUser(id: string) {
    const user = await this.usersModel.findById(id);
    if (user === null) {
      throw new NotFoundException('Page not found');
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    const { email } = data;
    const duplicate = await this.usersModel.findOne({ email });
    if (duplicate) {
      throw new ConflictException('Invalid email');
    }
    const user = await this.usersModel.create(data);
    return await user.save();
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.usersModel.findById(id);
    if (user === null) {
      throw new NotFoundException('Page not found');
    }
    const { email } = data;
    const duplicate = await this.usersModel.findOne({ email });
    if (duplicate) {
      throw new ConflictException('Invalid email');
    }
    await this.usersModel.updateOne({ _id: id }, data);
  }

  async removeUser(id: string) {
    const user = await this.usersModel.findById(id);
    if (user === null) {
      throw new NotFoundException('Page not found');
    }
    await this.usersModel.deleteOne({ _id: id });
  }
}
