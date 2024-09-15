import { Injectable } from '@nestjs/common';
import { CrearProductoDto } from './crear-producto.dto';

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
  }
@Injectable()
export class ProductosService {
    private users: Producto[] = [];
    private idCounter = 1;

    findAll(): Producto[] {
        return this.users;
    }

    findOne(id: number): Producto {
        return this.users.find(user => user.id === id);
    }

    create(createUserDto: CrearProductoDto): Producto {
        const newProducto: Producto = {
        id: this.idCounter++,
        ...createUserDto,
    };
    this.users.push(newProducto);
    return newProducto;
  }
}
