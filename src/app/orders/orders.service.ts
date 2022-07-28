import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageHelper } from '../../helpers/message.helper';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersDocument } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders')
    private readonly ordersModel: Model<OrdersDocument>,
  ) {}

  async findAllOrders() {
    return await this.ordersModel
      .find()
      .populate('user', 'name email')
      .populate('products', 'size color price -_id');
  }

  async findOneOrder(id: string) {
    const order = await this.ordersModel.findById(id);
    if (order === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    return order;
  }

  async createOrder(data: CreateOrderDto) {
    const order = await this.ordersModel.create(data);
    return await order.save();
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    const order = await this.ordersModel.findById(id);
    if (order === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    await this.ordersModel.updateOne({ _id: id }, data);
  }

  async removeOrder(id: string) {
    const order = await this.ordersModel.findById(id);
    if (order === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    await this.ordersModel.deleteOne({ _id: id });
  }
}
