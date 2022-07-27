import { PartialType } from '@nestjs/mapped-types';
import { Product } from '../schemas/products.schema';

export class UpdateProductDto extends PartialType(Product) {}
