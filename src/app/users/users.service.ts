import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Model } from 'mongoose';
import { MessageHelper } from 'src/helpers/message.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {}

  async findAllUsers() {
    return await this.usersModel
      .find()
      .select('-__v')
      .populate({
        path: 'orders',
        select: 'productsQuantity createdAt -user',
        populate: { path: 'products', select: 'size color price' },
      });
  }

  async findOneUser(id: string, req: any) {
    const user = await this.usersModel
      .findById(id)
      .select('-password')
      .populate({
        path: 'orders',
        select: 'productsQuantity createdAt -user',
        populate: { path: 'products', select: 'size color price' },
      });
    if (user === null) {
      throw new NotFoundException('Page not found');
    }
    if (user._id.valueOf() !== req.user._id) {
      throw new ForbiddenException(MessageHelper.FORBBIDEN);
    }
    return user;
  }

  async checkUser(email: string) {
    const user = await this.usersModel.findOne({ email: email });
    if (!user) {
      throw new Error();
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
    user.password = hashSync(user.password, 10);
    await user.save();
    user.password = undefined;
    return user;
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
