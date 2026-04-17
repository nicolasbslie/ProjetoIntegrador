export class User{
    id?: number | null
    nome: string
    idade: number
    email: string

    constructor(id: number | null = null, nome: string, idade: number, email: string){
        this.id = id
        this.nome = nome
        this.idade = idade
        this.email = email
    }
}