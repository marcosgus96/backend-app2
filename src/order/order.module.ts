import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Producto } from 'src/productos/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Producto])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
