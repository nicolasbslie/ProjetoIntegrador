import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Categoria } from "./Categoria";

@Entity("metas")
export class Meta {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.metas, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "usuario_id" })
    usuario: User;

    @ManyToOne(() => Categoria, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @Column("decimal", {
        precision: 10,
        scale: 2,
    })
    valor_limite: number;

    @Column({
        type: "int",
    })
    mes: number;

    @Column({
        type: "int",
    })
    ano: number;

    @CreateDateColumn({
        name: "criado_em",
    })
    criado_em: Date;
}