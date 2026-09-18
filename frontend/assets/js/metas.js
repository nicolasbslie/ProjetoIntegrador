const API_URL = "http://localhost:3000";


// ==========================================
// ELEMENTOS
// ==========================================

const metasContainer =
    document.getElementById("metasContainer");

const modal =
    document.getElementById("modal");

const metaForm =
    document.getElementById("metaForm");

const categoriaSelect =
    document.getElementById("categoria");

const mesSelect =
    document.getElementById("mes");


// ==========================================
// MÊS ATUAL
// ==========================================

const dataAtual = new Date();

mesSelect.value =
    dataAtual.getMonth() + 1;


// ==========================================
// CARREGAR CATEGORIAS
// ==========================================

async function carregarCategorias() {

    try {

        const resposta =
            await fetch(
                `${API_URL}/categorias`,
                {
                    credentials: "include"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar categorias."
            );

        }


        const categorias =
            await resposta.json();


        categoriaSelect.innerHTML = `
            <option value="">
                Selecione uma categoria
            </option>
        `;


        categorias.forEach(categoria => {

            categoriaSelect.innerHTML += `
                <option value="${categoria.id}">
                    ${categoria.nome}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

        alert(
            "Não foi possível carregar as categorias."
        );

    }

}


// ==========================================
// CARREGAR METAS
// ==========================================

async function carregarMetas() {

    metasContainer.innerHTML = `
        <div class="loading">
            Carregando metas...
        </div>
    `;


    const mes =
        Number(mesSelect.value);

    const ano =
        dataAtual.getFullYear();


    try {

        const resposta =
            await fetch(
                `${API_URL}/metas/me?mes=${mes}&ano=${ano}`,
                {
                    credentials: "include"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar metas."
            );

        }


        const metas =
            await resposta.json();


        mostrarMetas(metas);


    } catch (error) {

        console.error(error);

        metasContainer.innerHTML = `
            <div class="empty">
                Não foi possível carregar suas metas.
            </div>
        `;

    }

}


// ==========================================
// MOSTRAR METAS
// ==========================================

function mostrarMetas(metas) {

    if (metas.length === 0) {

        metasContainer.innerHTML = `
            <div class="empty">

                <h3>
                    Nenhuma meta criada
                </h3>

                <p>
                    Crie uma meta para começar a
                    acompanhar seus gastos.
                </p>

            </div>
        `;

        return;

    }


    metasContainer.innerHTML = "";


    metas.forEach(meta => {

        let percentual =
            Number(meta.percentual);


        let percentualBarra =
            percentual;


        if (percentualBarra > 100) {

            percentualBarra = 100;

        }


        let restante =
            Number(meta.restante);


        let classe = "";


        if (percentual >= 100) {

            classe = "meta-danger";

        } else if (percentual >= 80) {

            classe = "meta-warning";

        }


        let restanteTexto;


        if (restante >= 0) {

            restanteTexto =
                `Restante: ${formatarMoeda(restante)}`;

        } else {

            restanteTexto =
                `Acima da meta: ${formatarMoeda(
                    Math.abs(restante)
                )}`;

        }


        metasContainer.innerHTML += `

            <div class="meta-card">

                <div class="meta-header">

                    <h3>
                        ${meta.categoria.nome}
                    </h3>

                    <div class="menu-meta">

                        <button
                            onclick="editarMeta(
                                ${meta.id},
                                ${meta.valor_limite}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            onclick="excluirMeta(
                                ${meta.id}
                            )"
                        >
                            Excluir
                        </button>

                    </div>

                </div>


                <div class="meta-values">

                    <span>
                        ${formatarMoeda(
            meta.gasto_atual
        )}
                    </span>

                    <strong>
                        ${formatarMoeda(
            meta.valor_limite
        )}
                    </strong>

                </div>


                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width: ${percentualBarra}%"
                    ></div>

                </div>


                <div class="meta-footer">

                    <span class="${classe}">

                        ${percentual.toFixed(1)}%
                        utilizado

                    </span>

                    <span class="${classe}">

                        ${restanteTexto}

                    </span>

                </div>

            </div>

        `;

    });

}


// ==========================================
// ABRIR MODAL
// ==========================================

function abrirModal() {

    modal.classList.add("active");

}


// ==========================================
// FECHAR MODAL
// ==========================================

function fecharModal() {

    modal.classList.remove("active");

    metaForm.reset();

}


// ==========================================
// CRIAR META
// ==========================================

metaForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const categoriaId =
            Number(categoriaSelect.value);

        const valor =
            Number(
                document.getElementById("valor").value
            );


        const mes =
            Number(mesSelect.value);

        const ano =
            dataAtual.getFullYear();


        try {

            const resposta =
                await fetch(
                    `${API_URL}/metas`,
                    {

                        method: "POST",

                        credentials: "include",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            categoria_id:
                                categoriaId,

                            valor_limite:
                                valor,

                            mes,

                            ano

                        })

                    }
                );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                alert(
                    dados.message ||
                    "Erro ao criar meta."
                );

                return;

            }


            alert(
                "Meta criada com sucesso!"
            );


            fecharModal();

            carregarMetas();


        } catch (error) {

            console.error(error);

            alert(
                "Erro ao conectar com o servidor."
            );

        }

    }
);


// ==========================================
// EDITAR META
// ==========================================

async function editarMeta(
    id,
    valorAtual
) {

    const novoValor =
        prompt(
            "Digite o novo limite mensal:",
            valorAtual
        );


    if (novoValor === null) {

        return;

    }


    const valor =
        Number(novoValor);


    if (valor <= 0 || isNaN(valor)) {

        alert(
            "Digite um valor válido."
        );

        return;

    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/metas/${id}`,
                {

                    method: "PATCH",

                    credentials: "include",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        valor_limite: valor
                    })

                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.message ||
                "Erro ao atualizar meta."
            );

            return;

        }


        carregarMetas();


    } catch (error) {

        console.error(error);

        alert(
            "Erro ao conectar com o servidor."
        );

    }

}


// ==========================================
// EXCLUIR META
// ==========================================

async function excluirMeta(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta meta?"
        );


    if (!confirmar) {

        return;

    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/metas/${id}`,
                {

                    method: "DELETE",

                    credentials: "include"

                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.message ||
                "Erro ao excluir meta."
            );

            return;

        }


        carregarMetas();


    } catch (error) {

        console.error(error);

        alert(
            "Erro ao conectar com o servidor."
        );

    }

}


// ==========================================
// FORMATAR DINHEIRO
// ==========================================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// TROCAR MÊS
// ==========================================

mesSelect.addEventListener(
    "change",
    carregarMetas
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarCategorias();

carregarMetas();
