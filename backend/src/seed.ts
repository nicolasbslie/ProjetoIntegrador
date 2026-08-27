import "reflect-metadata";
import "dotenv/config";

import { AppDataSource } from "./config/data-source";
import { Categoria } from "./models/Categoria";

// Precisa ser EXATAMENTE igual (mesmo texto) ao "name" usado no
// front-end (arquivo gasto.js, array CATEGORIES) para a integração
// funcionar sem precisar de nenhum de/para manual.
const CATEGORIAS_PADRAO = [
    "Moradia",
    "Alimentação",
    "Transporte",
    "Saúde",
    "Lazer",
    "Educação",
    "Vestuário",
    "Investimento",
    "Salário",
    "Outros",
];

async function seed() {
    await AppDataSource.initialize();

    const categoriaRepository = AppDataSource.getRepository(Categoria);

    for (const nome of CATEGORIAS_PADRAO) {
        const jaExiste = await categoriaRepository.findOne({ where: { nome } });

        if (!jaExiste) {
            const categoria = categoriaRepository.create({ nome });
            await categoriaRepository.save(categoria);
            console.log(`Categoria criada: ${nome}`);
        } else {
            console.log(`Categoria já existe: ${nome}`);
        }
    }

    console.log("Seed de categorias finalizado.");
    await AppDataSource.destroy();
}

seed().catch((error) => {
    console.error("Erro ao rodar o seed:", error);
    process.exit(1);
});
