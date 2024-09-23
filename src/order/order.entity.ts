import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../productos/producto.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes)
  usuario: Usuario;

  @ManyToMany(() => Producto, { cascade: true })
  @JoinTable()  // Asegúrate de usar @JoinTable() para crear la tabla intermedia
  productos: Producto[];

  @Column('decimal')
  precioTotal: number;

  @Column()
  estado: string;  // Estado del pedido (por ejemplo: 'pending', 'completed', 'cancelled')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreada: Date;
}
