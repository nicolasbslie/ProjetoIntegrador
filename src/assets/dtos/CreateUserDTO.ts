import z, { email } from 'zod'

export const CreateUserDTO = z.object({
    nome: z.string()
        .min(3, 'Nome deve conter pelo menos 3 caracteres')
        .max(100, 'Nome deve conter no máximo 100 caracteres'),
    email: z.email('E-mail inválido'),
    password: z.string()
        .min(6, 'Senha deve conter pelo menos 6 caracteres')
        .regex(/^(?=.*[A-Z])/, 'Senha deve conter pelo menos uma letra maiúscula')
        .regex(/^(?=.*[a-z])/, 'Senha deve conter pelo menos uma letra minúscula')
        .regex(/^(?=.*[0-9])/, 'Senha deve conter pelo menos um número')
})

export type CreateUserDTO = z.infer<typeof CreateUserDTO>