import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageHelper } from 'src/helpers/message.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDocument } from './schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products')
    private readonly productsModel: Model<ProductsDocument>,
  ) {}

  async findAllProducts() {
    return await this.productsModel.find();
  }

  async findOneProduct(id: string) {
    const product = await this.productsModel.findById(id);
    if (product === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const product = await this.productsModel.create(data);
    return await product.save();
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productsModel.findById(id);
    if (product === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    await this.productsModel.updateOne({ _id: id }, data);
  }

  async removeProduct(id: string) {
    const product = await this.productsModel.findById(id);
    if (product === null) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
    await this.productsModel.deleteOne({ _id: id });
  }
}
