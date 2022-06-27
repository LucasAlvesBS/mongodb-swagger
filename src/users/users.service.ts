import { Injectable } from '@nestjs/common';
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
    return await this.usersModel.find().exec();
  }

  async findOneUser(id: string) {
    return await this.usersModel.findById(id).exec();
  }

  async createUser(data: CreateUserDto) {
    const user = new this.usersModel(data);
    return await user.save();
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.usersModel.updateOne({ _id: id }, data).exec();
    return await this.findOneUser(id);
  }

  async removeUser(id: string) {
    return await this.usersModel.deleteOne({ _id: id }).exec();
  }
}
