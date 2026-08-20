import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Gasto } from "./Gasto";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome: string;

  @OneToMany(() => Gasto, (gasto) => gasto.categoria)
  gastos: Gasto[];
}