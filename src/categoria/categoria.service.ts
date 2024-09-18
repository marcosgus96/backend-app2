import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoryRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoryRepository.find({ relations: ['productos'] });
  }

  findOne(id: number): Promise<Categoria> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
  }

  create(categoria: Categoria): Promise<Categoria> {
    return this.categoryRepository.save(categoria);
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    await this.categoryRepository.update(id, categoria);
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
