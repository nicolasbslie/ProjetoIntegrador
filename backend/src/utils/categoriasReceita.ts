// Ids das categorias de RECEITA (instituições/agências) usadas no front-end
// (CATEGORIES_RECEITA em frontend/assets/js/gasto.js). Precisam ser iguais.
export const CATEGORIAS_RECEITA = [
    "bb",
    "itau",
    "bradesco",
    "santander",
    "caixa",
    "nubank",
    "inter",
    "c6",
    "salario",
    "outro",
] as const;

export function categoriaReceitaValida(categoria: unknown): categoria is string {
    return typeof categoria === "string" && (CATEGORIAS_RECEITA as readonly string[]).includes(categoria);
}
