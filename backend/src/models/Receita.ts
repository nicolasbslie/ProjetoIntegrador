import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("receitas")
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.receitas, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "usuario_id" })
  usuario: User;

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
    name: "data_receita",
  })
  data_receita: Date;
}