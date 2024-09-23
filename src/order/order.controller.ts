import { Controller, Post, Get, Body, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('pedidos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Solo los usuarios pueden crear un pedido
  @Roles(Role.User)
  @Post()
  createOrder(@Request() req, @Body() body: { productIds: number[], precioTotal: number }) {
    const usuario = req.usuario;
    const { productIds, precioTotal } = body;
    return this.orderService.createOrder(usuario, productIds, precioTotal);
  }

  // Obtener los pedidos del usuario autenticado
  @Roles(Role.User)
  @Get()
  findOrders(@Request() req) {
    const usuario = req.usuario;
    return this.orderService.findOrdersByUser(usuario);
  }

  // Solo los administradores pueden aceptar un pedido
  @Roles(Role.Admin)
  @Patch(':id/accept')
  acceptOrder(@Param('id') orderId: number) {
    return this.orderService.acceptOrder(orderId);
  }

  // Solo los administradores pueden rechazar un pedido
  @Roles(Role.Admin)
  @Patch(':id/reject')
  rejectOrder(@Param('id') orderId: number) {
    return this.orderService.rejectOrder(orderId);
  }
}
