import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../auth/role.enum';  // CREACION PARA EL ROL
import { Order } from 'src/order/order.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,  // Por defecto, el rol será "USUARIO"
  })
  roles: Role;

  @OneToMany(() => Order, (order) => order.usuario)
  ordenes: Order[];  // Relación con pedidos
}