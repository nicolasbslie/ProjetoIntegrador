import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Receita } from "./Receita";
import { Gasto } from "./Gasto";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 255 })
  confirmarSenha: string;

    @Column({ type: 'enum', nullable: false, enum: ['admin', 'user'], default: 'user' })
    role: 'admin' | 'user'

  @Column({type: "varchar", length: 255, nullable: true, name: "reset_password_token" })
  resetPasswordToken: string | null;

  @Column({ type: "datetime", nullable: true, name: "reset_password_expires" })
  resetPasswordExpires: Date | null;

  @CreateDateColumn({ name: "criado_em" })
  criado_em: Date;

  @OneToMany(() => Receita, (receita) => receita.usuario)
  receitas: Receita[];

  @OneToMany(() => Gasto, (gasto) => gasto.usuario)
  gastos: Gasto[];
}