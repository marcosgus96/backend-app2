import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuarioModule,  // Para interactuar con usuarios
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',  // Se recomienda guardar la clave en una variable de entorno
      signOptions: { expiresIn: '1h' },  // El token expira en 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
