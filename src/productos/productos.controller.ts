import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CrearProductoDto } from './crear-producto.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
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
