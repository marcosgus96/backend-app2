import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CrearProductoDto } from './crear-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Producto> {
    return this.productRepository.findOneBy({ id });
  }

  create(createProductDto: CrearProductoDto): Promise<Producto> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, updateProductDto: CrearProductoDto): Promise<Producto> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
