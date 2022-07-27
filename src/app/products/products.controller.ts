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
import { BadRequestSwagger, NotFoundSwagger } from 'src/helpers/swagger.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ProductsDocument } from './schemas/products.schema';
import { CreateProductSwagger } from './swagger/create-product.swagger';
import { ListProductsSwagger } from './swagger/list-products.swagger';
import { ShowProductSwagger } from './swagger/show-product.swagger';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({
    status: 200,
    description: 'Products list returned successfully',
    type: ListProductsSwagger,
    isArray: true,
  })
  async findAllProducts(): Promise<ProductsDocument[]> {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show a product' })
  @ApiResponse({
    status: 200,
    description: 'Product returned successfully',
    type: ShowProductSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: NotFoundSwagger,
  })
  async findOneProduct(@Param('id') id: string): Promise<ProductsDocument> {
    return await this.productsService.findOneProduct(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: CreateProductSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<ProductsDocument> {
    return await this.productsService.createProduct(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 204,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<void> {
    return await this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({ status: 204, description: 'Product removed successfully' })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: NotFoundSwagger,
  })
  async removeProduct(@Param('id') id: string) {
    return await this.productsService.removeProduct(id);
  }
}
