import { Categoria } from 'src/categoria/categoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column({ default: true })
  enStock: boolean;
  
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;
}
