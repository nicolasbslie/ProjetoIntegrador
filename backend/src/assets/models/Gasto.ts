import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categoria } from "./Categoria";
import { User } from "./User";

@Entity("gastos")
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.gastos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "usuario_id" })
  usuario: User;

  @ManyToOne(() => Categoria, (categoria) => categoria.gastos)
  @JoinColumn({ name: "categoria_id" })
  categoria: Categoria;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  valor: number;

  @Column({
    length: 255,
    nullable: true,
  })
  descricao: string;

  @CreateDateColumn({
    name: "data_gasto",
  })
  data_gasto: Date;
}