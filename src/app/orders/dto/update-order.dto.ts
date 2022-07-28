import { PartialType } from '@nestjs/mapped-types';
import { Order } from '../schemas/orders.schema';

export class UpdateOrderDto extends PartialType(Order) {}
