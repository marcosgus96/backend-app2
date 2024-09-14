import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosController } from './productos/productos.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductosController],
  providers: [AppService],
})
export class AppModule {}
