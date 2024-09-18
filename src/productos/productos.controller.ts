import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CrearProductoDto } from './crear-producto.dto';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,  // Parámetro de página, valor por defecto: 1
    @Query('limit') limit: number = 10,  // Parámetro de límite, valor por defecto: 10
  ) {
    const products = await this.productService.findAll(page, limit);
    return {
      data: products.data,
      total: products.total,
      page,
      limit,
      totalPages: Math.ceil(products.total / limit),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() createProductDto: CrearProductoDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createProductDto: CrearProductoDto) {
    return this.productService.update(Number(id), createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
