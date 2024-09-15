import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CrearProductoDto } from './crear-producto.dto';
import { Producto, ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosServices: ProductosService) {}

  @Get()
  findAll(): Producto[] {
    return this.productosServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Producto {
    return this.productosServices.findOne(Number(id));
  }

  @Post()
  create(@Body() createUserDto: CrearProductoDto): Producto {
    return this.productosServices.create(createUserDto);
  }
}
