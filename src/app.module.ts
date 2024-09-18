import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/producto.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // Cambia esto con tu usuario de PostgreSQL
      password: 'marcos', // Cambia esto con tu contraseña de PostgreSQL
      database: 'BD_Tienda',
      autoLoadEntities: true, // Añadir la entidad Product aquí
      synchronize: true, // Sincroniza las entidades con la base de datos (ideal para desarrollo)
    }),
    CategoriaModule,
    UsuarioModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
