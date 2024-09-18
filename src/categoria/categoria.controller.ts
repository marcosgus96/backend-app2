import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoryService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoryService.create(categoria);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoria: Categoria) {
    return this.categoryService.update(Number(id), categoria);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(Number(id));
  }
}
