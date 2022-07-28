import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestSwagger,
  NotFoundSwagger,
} from '../../helpers/swagger.helper';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { OrdersDocument } from './schemas/orders.schema';
import { CreateOrderSwagger } from './swagger/create-order.swagger';
import { ListOrdersSwagger } from './swagger/list-orders.swagger';
import { ShowOrderSwagger } from './swagger/show-order.swagger';

@Controller('api/v1/orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders list returned successfully',
    type: ListOrdersSwagger,
    isArray: true,
  })
  async findAllOrders(): Promise<OrdersDocument[]> {
    return await this.ordersService.findAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show a order' })
  @ApiResponse({
    status: 200,
    description: 'Order returned successfully',
    type: ShowOrderSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
    type: NotFoundSwagger,
  })
  async findOneOrder(@Param('id') id: string): Promise<OrdersDocument> {
    return await this.ordersService.findOneOrder(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: CreateOrderSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async createOrder(@Body() body: CreateOrderDto): Promise<OrdersDocument> {
    return await this.ordersService.createOrder(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a order' })
  @ApiResponse({
    status: 204,
    description: 'Order updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
  ): Promise<void> {
    return await this.ordersService.updateOrder(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a order' })
  @ApiResponse({ status: 204, description: 'Order removed successfully' })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
    type: NotFoundSwagger,
  })
  async removeOrder(@Param('id') id: string) {
    return await this.ordersService.removeOrder(id);
  }
}
