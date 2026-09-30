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

  // id da categoria escolhida no front (ex.: "nubank", "itau", "salario").
  // Nullable para não quebrar receitas antigas (o front usa "salario" nelas).
  @Column({
    length: 30,
    nullable: true,
  })
  categoria: string;

  @CreateDateColumn({
    name: "data_receita",
  })
  data_receita: Date;
}