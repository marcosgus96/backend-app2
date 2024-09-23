import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CrearProductoDto } from './crear-producto.dto';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User) // Solo accesible para admin y user
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin) // Solo accesible para admin
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
