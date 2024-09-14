import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get()
  findAll(): string {
    return 'Esta accion devoler los prductos';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Esta accion devuelve un producto: ${id}`;
  }

  @Put(':id')
  update(): string {
    return 'Esta accion actualiza los productos prueba';
  }

  @Delete(':id')
  remove(): string {
    return 'Esta accion elemina un producto';
  }

  @Post()
  create(@Body() crearProductoDto: any): string {
    return `Esta accion guarda un producto: ${JSON.stringify(crearProductoDto)}`;
  }

}
