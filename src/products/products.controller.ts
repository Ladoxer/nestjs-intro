import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { title } from 'process';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  @Get(':id')
  getProduct(@Param('id') proId: string) {
    return this.productsService.getSingleProduct(proId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') proId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      proId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { message: 'Product updated' };
  }

  @Delete(':id')
  async removeProduct(@Param('id') proId: string) {
    await this.productsService.deleteProduct(proId);
    return { message: 'Product deleted' };
  }
}
