import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async create(user: Partial<Usuario>): Promise<Usuario> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Buscar un usuario por email
  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Buscar un usuario por ID
  async findById(id: number): Promise<Usuario | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
