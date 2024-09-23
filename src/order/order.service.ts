import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../productos/producto.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Producto)
    private productRepository: Repository<Producto>,
  ) {}

  // Crear un nuevo pedido
  async createOrder(usuario: Usuario, productIds: number[], precioTotal: number): Promise<Order> {
    // Buscar los productos en la base de datos
    const productos = await this.productRepository.findBy({
      id: In(productIds),
    });

    // Verificación para asegurarse de que los productos existen
    if (!productos.length) {
      throw new Error('No products found');
    }

    // Crear el nuevo pedido
    const newOrder = this.orderRepository.create({
      usuario,  // Asegúrate de que el usuario esté correctamente asignado
      productos,  // Los productos seleccionados
      precioTotal,  // El precio total del pedido
      estado: 'pending',
    });

    // Guardar el nuevo pedido en la base de datos
    return this.orderRepository.save(newOrder);
  }

  // Obtener pedidos de un usuario específico
  findOrdersByUser(usuario: Usuario): Promise<Order[]> {
    return this.orderRepository.find({
      where: { usuario },
      relations: ['productos'],
    });
  }
  
   // Aceptar un pedido
   async acceptOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ['usuario', 'productos'],  // Cargar usuario y productos
      });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.estado = 'aceptado';
    return this.orderRepository.save(order);
  }

  // Rechazar un pedido
  async rejectOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ['usuario', 'productos'],  // Cargar usuario y productos
      });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.estado = 'rechazado';
    return this.orderRepository.save(order);
  }
}


