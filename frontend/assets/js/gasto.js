/* ─── API / AUTENTICAÇÃO ─────────────────────────────── */
const API_URL = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

function checkAuth() {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}

// Wrapper de fetch: já manda o token (cookie + Bearer) e trata 401
async function apiFetch(path, options = {}) {
  const resposta = await fetch(API_URL + path, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
      ...(options.headers || {})
    }
  });

  if (resposta.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
    return null;
  }

  return resposta;
}

/* ─── MODO ESCURO ────────────────────────────────────── */

const THEME_KEY = 'theme';

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

  const toggle = document.getElementById('theme-toggle');

  if (toggle) {
    toggle.setAttribute('aria-checked', String(isDark));
  }
}

function toggleTheme() {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';

  applyTheme(next);

  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    /* localStorage indisponível: o tema só vale para esta sessão */
  }
}

function initTheme() {
  let saved = null;

  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (e) { }

  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

/* ─── DATA ───────────────────────────────────────────── */

// Categorias da aba GASTO (categorias de vida/orçamento).
// IMPORTANTE: o nome de cada categoria precisa existir (com o mesmo texto,
// case-insensitive) na tabela "categorias" do backend, pois o vínculo com
// o backendId é feito por nome em loadCategories(). É esta lista que é
// enviada como categoria_id ao salvar um gasto.
const CATEGORIES_GASTO = [
  { id:'moradia', icon:'<i class="fa-solid fa-house"></i>', name:'Moradia', color:'#2196A3', bg:'#E0F4F6' },
  { id:'alimentacao', icon:'<i class="fa-solid fa-utensils"></i>', name:'Alimentação', color:'#C77D11', bg:'#FFF8E1' },
  { id:'transporte', icon:'<i class="fa-solid fa-car"></i>', name:'Transporte', color:'#455A64', bg:'#ECEFF1' },
  { id:'saude', icon:'<i class="fa-solid fa-heart-pulse"></i>', name:'Saúde', color:'#CC092F', bg:'#FDEAEC' },
  { id:'lazer', icon:'<i class="fa-solid fa-gamepad"></i>', name:'Lazer', color:'#7B5EA7', bg:'#F0EBF8' },
  { id:'educacao', icon:'<i class="fa-solid fa-book"></i>', name:'Educação', color:'#1565C0', bg:'#E3F1FF' },
  { id:'vestuario', icon:'<i class="fa-solid fa-shirt"></i>', name:'Vestuário', color:'#00897B', bg:'#E0F2F1' },
  { id:'investimento', icon:'<i class="fa-solid fa-chart-line"></i>', name:'Investimento', color:'#2D6A4F', bg:'#D8F3DC' },
  { id:'outro', icon:'<i class="fa-solid fa-box"></i>', name:'Outros', color:'#616161', bg:'#F5F5F5' },
];

// Categorias da aba RECEITA = instituições/agências bancárias.
// Mantidas exatamente como no arquivo original (não são enviadas ao
// backend: toda receita é salva/mapeada internamente como 'salario').
const CATEGORIES_RECEITA = [
  { id:'bb', icon:'<i class="fa-solid fa-building-columns"></i>', name:'Banco do Brasil', color:'#B8860B', bg:'#FFF8E1' },
  { id:'itau', icon:'<i class="fa-solid fa-landmark"></i>', name:'Itaú', color:'#EC7000', bg:'#FFF1E6' },
  { id:'bradesco', icon:'<i class="fa-solid fa-sack-dollar"></i>', name:'Bradesco', color:'#CC092F', bg:'#FDEAEC' },
  { id:'santander', icon:'<i class="fa-solid fa-piggy-bank"></i>', name:'Santander', color:'#D32F2F', bg:'#FFEBEE' },
  { id:'caixa', icon:'<i class="fa-solid fa-coins"></i>', name:'Caixa', color:'#0057A8', bg:'#E3F1FF' },
  { id:'nubank', icon:'<i class="fa-solid fa-credit-card"></i>', name:'Nubank', color:'#8A05BE', bg:'#F3E5FF' },
  { id:'inter', icon:'<i class="fa-solid fa-mobile-screen-button"></i>', name:'Inter', color:'#FF6600', bg:'#FFF0E0' },
  { id:'c6', icon:'<i class="fa-solid fa-qrcode"></i>', name:'C6 Bank', color:'#1A1A1A', bg:'#F0F0F0' },
  { id:'salario', icon:'<i class="fa-solid fa-money-bill-wave"></i>', name:'Salário', color:'#2D6A4F', bg:'#D8F3DC' },
  { id:'outro', icon:'<i class="fa-solid fa-box"></i>', name:'Outro', color:'#616161', bg:'#F5F5F5' },
];

// Lista combinada, usada apenas para "achar" uma categoria pelo id quando
// não se sabe de antemão se ela é de gasto ou de receita (ex: montar uma
// linha da tabela de histórico, que mistura os dois tipos).
const ALL_CATEGORIES = [...CATEGORIES_GASTO, ...CATEGORIES_RECEITA];

function findCategoryById(id) {
  return ALL_CATEGORIES.find(c => c.id === id);
}

// Retorna a lista de categorias correspondente à aba/tipo atualmente
// selecionado no formulário de "Adicionar lançamento".
function getActiveCategories() {
  return currentType === 'income' ? CATEGORIES_RECEITA : CATEGORIES_GASTO;
}

const ECO_TIPS = [
  'Planejar as compras do mês reduz despesas em até 25%.',
  'Comprar a granel e em feiras pode reduzir gastos com alimentação.',
  'Transporte público e bicicleta são mais baratos e sustentáveis.',
  'Revise assinaturas mensais — você usa todas elas?',
  'Pagar à vista geralmente é mais barato do que parcelar.',
  'Comparar preços em 3 lojas antes de comprar economiza em média 18%.',
  'Investir R$100/mês com 10% ao ano vira R$68.000 em 20 anos.',
  'Guardando 10% do salário por 10 anos você tem mais de 1 ano de reserva.',
];

let entries = [];
let currentType = 'expense';
let selectedCat = 'moradia';
let currentMonth = '';
let editingEntryId = null;

async function loadCategories() {
  const resposta = await apiFetch('/categorias');
  if (!resposta) return;

  const categoriasBackend = await resposta.json();

  // Só as categorias de GASTO precisam de backendId — são as únicas
  // enviadas como categoria_id ao salvar (receita não usa categoria).
  CATEGORIES_GASTO.forEach(c => {
    const encontrada = categoriasBackend.find(
      bc => bc.nome.toLowerCase() === c.name.toLowerCase()
    );
    c.backendId = encontrada ? encontrada.id : null;
  });
}

function categoriaLocalPorBackendId(id) {
  return CATEGORIES_GASTO.find(c => c.backendId === id);
}

async function loadEntries() {
  const [respGastos, respReceitas] = await Promise.all([
    apiFetch('/gastos/me'),
    apiFetch('/receitas/me')
  ]);

  if (!respGastos || !respReceitas) return;

  const gastos = await respGastos.json();
  const receitas = await respReceitas.json();

  const gastosMapeados = gastos.map(g => {
    const cat = categoriaLocalPorBackendId(g.categoria?.id);

    return {
      id: 'gasto:' + g.id,
      type: 'expense',
      value: parseFloat(g.valor),
      desc: g.descricao || '',
      date: (g.data_gasto || '').slice(0, 10),
      cat: cat ? cat.id : 'outro',
      obs: g.observacao || '',
      eco: g.eco_score ?? null
    };
  });

  const receitasMapeadas = receitas.map(r => ({
    id: 'receita:' + r.id,
    type: 'income',
    value: parseFloat(r.valor),
    desc: r.descricao || '',
    date: (r.data_receita || '').slice(0, 10),
    cat: 'salario',
    obs: '',
    eco: null
  }));

  entries = [...gastosMapeados, ...receitasMapeadas]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* ─── NAVIGATION ─────────────────────────────────────── */

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('page-' + id).classList.add('active');

  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(n => {
    if (
      n.getAttribute('onclick') &&
      n.getAttribute('onclick').includes("'" + id + "'")
    ) {
      n.classList.add('active');
    }
  });

  if (id === 'painel') renderPainel();
  if (id === 'historico') renderHistorico();
}

/* ─── FORM SETUP ─────────────────────────────────────── */

function buildCatGrid() {
  const grid = document.getElementById('cat-grid');
  const cats = getActiveCategories();

  grid.innerHTML = cats.map(c => `
    <button 
      class="cat-btn ${c.id === selectedCat ? 'selected' : ''}" 
      id="cat-${c.id}"
      onclick="selectCat('${c.id}')" 
      style="${c.id === selectedCat ? `border-color:${c.color};background:${c.bg};` : ''}"
    >
      <span class="cat-btn-icon">${c.icon}</span>
      <span>${c.name}</span>
    </button>
  `).join('');
}

function selectCat(id) {
  selectedCat = id;

  document.querySelectorAll('.cat-btn').forEach(b => {
    b.classList.remove('selected');
    b.style.borderColor = '';
    b.style.background = '';
  });

  const c = getActiveCategories().find(x => x.id === id);
  const btn = document.getElementById('cat-' + id);

  btn.classList.add('selected');
  btn.style.borderColor = c.color;
  btn.style.background = c.bg;

  updatePreview();
  updateEcoTip();
  toggleOutroHint();
}

function setType(type) {
  currentType = type;

  document.getElementById('type-expense').className =
    'type-btn' + (type === 'expense' ? ' selected-expense' : '');

  document.getElementById('type-income').className =
    'type-btn' + (type === 'income' ? ' selected-income' : '');

  const ecoSection = document.getElementById('eco-section');
  const ecoWrap = document.getElementById('eco-wrap');

  ecoSection.style.display = type === 'income' ? 'none' : '';
  ecoWrap.style.display = type === 'income' ? 'none' : '';

  document.getElementById('prev-type').textContent =
    type === 'expense' ? 'Gasto' : 'Receita';

  document.getElementById('prev-total').className =
    'val' + (type === 'income' ? ' income' : '');

  // Ao trocar de aba, a categoria selecionada precisa pertencer à lista
  // ativa (Gasto ou Receita); se não pertencer, cai na primeira da lista.
  const activeCats = getActiveCategories();

  if (!activeCats.find(c => c.id === selectedCat)) {
    selectedCat = activeCats[0].id;
  }

  buildCatGrid();
  updatePreview();
  toggleOutroHint();
}

// Mostra um aviso no campo Descrição quando a categoria "Outro" está
// selecionada na aba Receita, lembrando que é obrigatório especificar a
// instituição/agência de onde veio o dinheiro. Na aba Gasto, "Outro" usa
// a descrição padrão (o que foi comprado), como as demais categorias.
function toggleOutroHint() {
  const descInput = document.getElementById('f-desc');
  const isOutro = currentType === 'income' && selectedCat === 'outro';

  descInput.placeholder = isOutro
    ? 'Especifique a instituição/agência (obrigatório)'
    : 'Ex: Supermercado Zona Sul';
}

function updateEcoBadge() {
  const val = parseInt(document.getElementById('f-eco').value);
  const badge = document.getElementById('eco-badge');

  badge.textContent = val + ' / 10';

  if (val >= 7) {
    badge.style.background = 'var(--g100)';
    badge.style.color = 'var(--g700)';
  } else if (val >= 4) {
    badge.style.background = '#FFF8E1';
    badge.style.color = 'var(--amber-d)';
  } else {
    badge.style.background = 'var(--red-l)';
    badge.style.color = 'var(--red)';
  }

  updatePreview();
}

function updatePreview() {
  const val = parseFloat(document.getElementById('f-value').value) || 0;
  const desc = document.getElementById('f-desc').value || '—';
  const dateRaw = document.getElementById('f-date').value;
  const eco = parseInt(document.getElementById('f-eco').value) || 8;

  const cat = getActiveCategories().find(c => c.id === selectedCat);

  document.getElementById('prev-date').textContent =
    dateRaw
      ? new Date(dateRaw + 'T12:00').toLocaleDateString(
          'pt-BR',
          { day: '2-digit', month: 'long', year: 'numeric' }
        )
      : '—';

  document.getElementById('prev-cat').innerHTML =
    cat ? cat.icon + ' ' + cat.name : '—';

  document.getElementById('prev-desc').textContent = desc;

  document.getElementById('prev-total').textContent =
    'R$ ' + val.toFixed(2).replace('.', ',');

  const pct = (eco / 10) * 100;
  const fill = document.getElementById('eco-meter-fill');

  fill.style.width = pct + '%';

  fill.style.background =
    eco >= 7
      ? 'var(--g500)'
      : eco >= 4
        ? 'var(--amber)'
        : 'var(--red)';

  const descs = [
    '',
    '<i class="fa-solid fa-circle"></i> Gasto impulsivo — refletir!',
    '<i class="fa-solid fa-circle"></i> Gasto sem planejamento',
    '<i class="fa-solid fa-circle"></i> Pouco consciente',
    '<i class="fa-solid fa-circle"></i> Abaixo do ideal',
    '<i class="fa-solid fa-circle"></i> Gasto neutro',
    '<i class="fa-solid fa-circle"></i> Razoável',
    '<i class="fa-solid fa-circle"></i> Bom — gasto planejado',
    '<i class="fa-solid fa-circle"></i> Gasto consciente — ótimo!',
    '<i class="fa-solid fa-leaf"></i> Excelente escolha!',
    '<i class="fa-solid fa-leaf"></i> Gasto 100% consciente!'
  ];

  document.getElementById('eco-meter-desc').innerHTML =
    descs[eco] || '—';

  if (currentType === 'income') {
    document.getElementById('eco-meter-desc').innerHTML =
      '<i class="fa-solid fa-money-bill-wave"></i> Receita — não avaliada';
  }
}

function updateEcoTip() {
  const tip = ECO_TIPS[Math.floor(Math.random() * ECO_TIPS.length)];

  document.getElementById('eco-tip').innerHTML =
    `<strong><i class="fa-solid fa-lightbulb"></i> Dica ecoSpending</strong>${tip}`;
}

// Retorna true se a descrição realmente especifica a instituição quando
// a categoria "Outro" foi escolhida (não pode ficar vazia nem repetir
// genericamente "outro"/"outros").
function descricaoValidaParaOutro(desc) {
  const d = (desc || '').toLowerCase().trim();
  return d.length >= 3 && d !== 'outro' && d !== 'outros';
}

async function submitExpense() {
  const val = parseFloat(document.getElementById('f-value').value);

  if (!val || val <= 0) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe um valor válido',
      true
    );
    return;
  }

  const desc = document.getElementById('f-desc').value.trim();

  if (!desc) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe uma descrição',
      true
    );
    return;
  }

  const dateVal = document.getElementById('f-date').value;

  if (!dateVal) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe a data',
      true
    );
    return;
  }

  // Regra: se a categoria for "Outro", a descrição precisa realmente
  // especificar a instituição/agência. Sem isso, o lançamento NÃO é
  // enviado (nem salvo, nem aparece no Histórico).
  if (currentType === 'expense' && selectedCat === 'outro' && !descricaoValidaParaOutro(desc)) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Especifique qual instituição no campo Descrição',
      true
    );
    return;
  }

  const obs = document.getElementById('f-obs').value.trim();
  const eco = parseInt(document.getElementById('f-eco').value);

  let resposta;

  if (currentType === 'expense') {
    const cat = CATEGORIES_GASTO.find(c => c.id === selectedCat);

    if (!cat || !cat.backendId) {
      showToast(
        '<i class="fa-solid fa-triangle-exclamation"></i> Categoria não cadastrada no backend (rode "npm run seed")',
        true
      );
      return;
    }

    resposta = await apiFetch('/gastos', {
      method: 'POST',
      body: JSON.stringify({
        categoria_id: cat.backendId,
        valor: val,
        descricao: desc,
        observacao: obs,
        eco_score: eco
      })
    });

  } else {

    resposta = await apiFetch('/receitas', {
      method: 'POST',
      body: JSON.stringify({
        valor: val,
        descricao: desc
      })
    });
  }

  if (!resposta) return;

  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => ({}));

    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> ' +
      (dados.message || 'Erro ao salvar lançamento'),
      true
    );

    return;
  }

  showToast(
    '<i class="fa-solid fa-circle-check"></i> Lançamento salvo!'
  );

  resetForm();
  await loadEntries();
  buildMonthTabs();
  renderPainel();

  // Mantém a aba "Minhas metas" em dia com o gasto recém-lançado,
  // sem precisar de F5 (carregarMetas() vem de metas.js).
  if (typeof carregarMetas === 'function') carregarMetas();

  // Requisitos atendidos (validação passou e o backend confirmou o
  // salvamento) => leva o usuário direto para a aba Histórico, onde o
  // novo lançamento já aparece na lista.
  showPage('historico');
}

function resetForm() {
  document.getElementById('f-value').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-date').value = todayStr();
  document.getElementById('f-obs').value = '';
  document.getElementById('f-eco').value = 8;

  updateEcoBadge();
  updatePreview();
  toggleOutroHint();
}


/* ─── EDIÇÃO DE LANÇAMENTOS ─────────────────────────── */

function openEditModal(id) {
  const entry = entries.find(e => e.id === id);

  if (!entry) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Lançamento não encontrado',
      true
    );
    return;
  }

  editingEntryId = id;

  document.getElementById('edit-id').value = id;
  document.getElementById('edit-type').value =
    entry.type === 'income' ? 'receita' : 'gasto';

  document.getElementById('edit-value').value = entry.value;
  document.getElementById('edit-desc').value = entry.desc || '';
  document.getElementById('edit-obs').value = entry.obs || '';
  document.getElementById('edit-eco').value = entry.eco ?? 8;

  preencherCategoriasEdicao(entry.cat);
  updateEditTypeFields();

  const modal = document.getElementById('edit-modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => document.getElementById('edit-value').focus(), 50);
}

function preencherCategoriasEdicao(selectedCat = 'outro') {
  const categorySelect = document.getElementById('edit-category');

  // A categoria só é gravada de fato para lançamentos do tipo Gasto, então
  // o select de edição usa sempre a lista de categorias de Gasto.
  categorySelect.innerHTML = CATEGORIES_GASTO
    .map(c => `
      <option value="${c.id}" ${c.id === selectedCat ? 'selected' : ''}>
        ${c.name}
      </option>
    `)
    .join('');
}

function updateEditTypeFields() {
  const tipo = document.getElementById('edit-type').value;
  const isIncome = tipo === 'receita';

  document.getElementById('edit-category-group').style.display =
    isIncome ? 'none' : '';

  document.getElementById('edit-observation-group').style.display =
    isIncome ? 'none' : '';

  document.getElementById('edit-eco-group').style.display =
    isIncome ? 'none' : '';

  document.getElementById('edit-category').required = !isIncome;

  updateEditEcoBadge();
}

function closeEditModal() {
  const modal = document.getElementById('edit-modal');

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');

  editingEntryId = null;
  document.getElementById('edit-form').reset();
}

function updateEditEcoBadge() {
  const eco = Number(document.getElementById('edit-eco').value);
  const badge = document.getElementById('edit-eco-badge');

  badge.textContent = `${eco} / 10`;

  if (eco >= 7) {
    badge.style.background = 'var(--g100)';
    badge.style.color = 'var(--g700)';
  } else if (eco >= 4) {
    badge.style.background = '#FFF8E1';
    badge.style.color = 'var(--amber-d)';
  } else {
    badge.style.background = 'var(--red-l)';
    badge.style.color = 'var(--red)';
  }
}

async function saveEdit(event) {
  event.preventDefault();

  const entry = entries.find(e => e.id === editingEntryId);

  if (!entry) {
    closeEditModal();
    return;
  }

  const value = Number(document.getElementById('edit-value').value);
  const desc = document.getElementById('edit-desc').value.trim();
  const novoTipo = document.getElementById('edit-type').value;
  const tipoAtual = entry.type === 'income' ? 'receita' : 'gasto';
  const [, backendId] = String(editingEntryId).split(':');
  const saveButton = document.getElementById('edit-save-btn');

  if (!Number.isFinite(value) || value <= 0) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe um valor maior que zero',
      true
    );
    return;
  }

  if (!desc) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe uma descrição',
      true
    );
    return;
  }

  // Mesma regra do formulário de adicionar: categoria "Outro" exige
  // que a descrição especifique a instituição.
  if (novoTipo === 'gasto') {
    const catSelecionadaEdicao = document.getElementById('edit-category').value;

    if (catSelecionadaEdicao === 'outro' && !descricaoValidaParaOutro(desc)) {
      showToast(
        '<i class="fa-solid fa-triangle-exclamation"></i> Especifique qual instituição no campo Descrição',
        true
      );
      return;
    }
  }

  saveButton.disabled = true;
  saveButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

  let resposta;

  try {
    // Quando o usuário troca Receita <-> Gasto, o backend faz a conversão
    // dentro de uma transação e remove o registro antigo.
    if (tipoAtual !== novoTipo) {
      let body = {
        novoTipo,
        valor: value,
        descricao: desc
      };

      if (novoTipo === 'gasto') {
        const catId = document.getElementById('edit-category').value;
        const cat = CATEGORIES_GASTO.find(c => c.id === catId);

        if (!cat?.backendId) {
          showToast(
            '<i class="fa-solid fa-triangle-exclamation"></i> Categoria inválida',
            true
          );
          return;
        }

        body = {
          ...body,
          categoria_id: cat.backendId,
          observacao: document.getElementById('edit-obs').value.trim(),
          eco_score: Number(document.getElementById('edit-eco').value)
        };
      }

      resposta = await apiFetch(`/lancamentos/${tipoAtual}/${backendId}/tipo`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
    } else {
      let body = {
        valor: value,
        descricao: desc
      };

      if (novoTipo === 'gasto') {
        const catId = document.getElementById('edit-category').value;
        const cat = CATEGORIES_GASTO.find(c => c.id === catId);

        if (!cat?.backendId) {
          showToast(
            '<i class="fa-solid fa-triangle-exclamation"></i> Categoria inválida',
            true
          );
          return;
        }

        body = {
          ...body,
          categoria_id: cat.backendId,
          observacao: document.getElementById('edit-obs').value.trim(),
          eco_score: Number(document.getElementById('edit-eco').value)
        };
      }

      const rota = novoTipo === 'gasto' ? '/gastos/' : '/receitas/';

      resposta = await apiFetch(rota + backendId, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
    }

    if (!resposta || !resposta.ok) {
      const dados = resposta
        ? await resposta.json().catch(() => ({}))
        : {};

      showToast(
        '<i class="fa-solid fa-triangle-exclamation"></i> ' +
        (dados.message || 'Erro ao atualizar lançamento'),
        true
      );
      return;
    }

    closeEditModal();

    await loadEntries();
    buildMonthTabs();
    renderPainel();
    renderHistorico();

    // Mantém a aba "Minhas metas" em dia com a edição.
    if (typeof carregarMetas === 'function') carregarMetas();

    showToast(
      '<i class="fa-solid fa-circle-check"></i> Lançamento atualizado com sucesso!'
    );
  } catch (error) {
    console.error(error);
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Erro de conexão com o servidor',
      true
    );
  } finally {
    saveButton.disabled = false;
    saveButton.innerHTML =
      '<i class="fa-solid fa-floppy-disk"></i> Salvar alterações';
  }
}

async function deleteEntry(id) {
  const [tipo, backendId] = String(id).split(':');

  const rota = tipo === 'gasto' ? '/gastos/' : '/receitas/';

  const resposta = await apiFetch(
    rota + backendId,
    { method: 'DELETE' }
  );

  if (!resposta || !resposta.ok) {
    showToast(
      '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao remover lançamento',
      true
    );
    return;
  }

  await loadEntries();

  renderPainel();
  renderHistorico();
  buildMonthTabs();

  // Mantém a aba "Minhas metas" em dia com a exclusão.
  if (typeof carregarMetas === 'function') carregarMetas();

  showToast('<i class="fa-solid fa-trash"></i> Removido');
}

/* ─── PAINEL ─────────────────────────────────────────── */

function getMonthEntries(ym) {
  if (!ym) return entries;

  return entries.filter(e => e.date && e.date.startsWith(ym));
}

function renderPainel() {
  const filtered = getMonthEntries(currentMonth);

  const expenses = filtered.filter(e => e.type === 'expense');
  const incomes = filtered.filter(e => e.type === 'income');

  const totalExp = expenses.reduce((s, e) => s + e.value, 0);
  const totalInc = incomes.reduce((s, e) => s + e.value, 0);
  const balance = totalInc - totalExp;

  const ecoArr = expenses
    .filter(e => e.eco != null)
    .map(e => e.eco);

  const ecoAvg = ecoArr.length
    ? (ecoArr.reduce((a, b) => a + b, 0) / ecoArr.length).toFixed(1)
    : '—';

  document.getElementById('kpi-total').textContent =
    'R$ ' + totalExp.toFixed(2).replace('.', ',');

  document.getElementById('kpi-income').textContent =
    'R$ ' + totalInc.toFixed(2).replace('.', ',');

  document.getElementById('kpi-balance').textContent =
    (balance < 0 ? '−R$ ' : 'R$ ') +
    Math.abs(balance).toFixed(2).replace('.', ',');

  document.getElementById('kpi-balance').className =
    'kpi-value ' + (balance >= 0 ? 'green' : 'red');

  document.getElementById('kpi-eco').textContent =
    ecoAvg + (ecoAvg !== '—' ? '/10' : '');

  document.getElementById('sidebar-eco-score').textContent =
    ecoAvg !== '—' ? ecoAvg : '—';

  renderBarChart(filtered);
  renderDonut(expenses);
  renderRecent(filtered.slice(0, 8));
}

function renderBarChart(filtered) {
  const ym = currentMonth || new Date().toISOString().slice(0, 7);

  const [y, m] = ym.split('-').map(Number);

  const days = new Date(y, m, 0).getDate();

  const byDay = {};

  filtered
    .filter(e => e.type === 'expense')
    .forEach(e => {
      const d = parseInt(e.date.split('-')[2]);
      byDay[d] = (byDay[d] || 0) + e.value;
    });

  const vals = Array.from({ length: days }, (_, i) => byDay[i + 1] || 0);

  const max = Math.max(...vals, 1);

  const container = document.getElementById('bar-chart');

  container.innerHTML =
    vals.map((v, i) => {
      const h = Math.round((v / max) * 140);
      const active = v > 0;

      return `
        <div class="bar-group" title="Dia ${i + 1}: R$ ${v.toFixed(2)}">
          ${active ? `<div class="bar-val" style="font-size:9px">R$${Math.round(v)}</div>` : ''}
          <div class="bar" style="height:${h}px;opacity:${active ? 1 : 0.25}"></div>
          <div class="bar-label">${i + 1}</div>
        </div>
      `;
    }).join('');

  const mNames = [
    'Jan', 'Fev', 'Mar', 'Abr',
    'Mai', 'Jun', 'Jul', 'Ago',
    'Set', 'Out', 'Nov', 'Dez'
  ];

  document.getElementById('chart-month-label').textContent =
    mNames[m - 1] + '/' + y;
}

function renderDonut(expenses) {
  const bycat = {};

  expenses.forEach(e => {
    bycat[e.cat] = (bycat[e.cat] || 0) + e.value;
  });

  const total = Object.values(bycat).reduce((a, b) => a + b, 0);

  const svg = document.getElementById('donut-svg');
  const legend = document.getElementById('donut-legend');

  const CX = 80;
  const CY = 80;
  const R = 64;
  const r = 44;

  document.getElementById('donut-center-val').textContent =
    total > 0 ? 'R$' + Math.round(total) : '0';

  svg.querySelectorAll('.arc').forEach(e => e.remove());

  if (total === 0) {
    legend.innerHTML =
      '<div class="empty-state" style="padding:.5rem"><p style="font-size:12px">Sem gastos ainda</p></div>';
    return;
  }

  const sorted = Object.entries(bycat).sort((a, b) => b[1] - a[1]);

  const colors = [
    '#40916C', '#2196A3', '#E9C46A', '#E63946', '#7B5EA7',
    '#6D4C41', '#1565C0', '#616161', '#C77D11', '#52B788'
  ];

  let angle = -Math.PI / 2;

  sorted.forEach(([catId, val], i) => {
    const frac = val / total;
    const sweep = frac * 2 * Math.PI;

    const x1 = CX + R * Math.cos(angle);
    const y1 = CY + R * Math.sin(angle);
    const x2 = CX + R * Math.cos(angle + sweep);
    const y2 = CY + R * Math.sin(angle + sweep);

    const large = sweep > Math.PI ? 1 : 0;

    const xi1 = CX + r * Math.cos(angle);
    const yi1 = CY + r * Math.sin(angle);
    const xi2 = CX + r * Math.cos(angle + sweep);
    const yi2 = CY + r * Math.sin(angle + sweep);

    const d =
      `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${xi2},${yi2} A${r},${r} 0 ${large},0 ${xi1},${yi1} Z`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('d', d);
    path.setAttribute('fill', colors[i % colors.length]);
    path.setAttribute('class', 'arc');
    path.setAttribute('opacity', '0.9');

    svg.insertBefore(path, svg.firstChild);

    angle += sweep;
  });

  legend.innerHTML =
    sorted
      .slice(0, 5)
      .map(([catId, val], i) => {
        const cat = findCategoryById(catId);
        const pct = Math.round((val / total) * 100);

        return `
          <div class="legend-item">
            <div class="legend-dot" style="background:${colors[i % colors.length]}"></div>
            <span class="legend-name">${cat ? cat.icon + ' ' + cat.name : catId}</span>
            <span class="legend-val">R$${val.toFixed(0)}</span>
            <span class="legend-pct">${pct}%</span>
          </div>
        `;
      })
      .join('');
}

function renderRecent(list) {
  const el = document.getElementById('recent-body');

  if (!list.length) {
    el.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">
          <i class="fa-solid fa-seedling"></i>
        </span>
        <p>
          Nenhum lançamento ainda.
          <br>
          Comece adicionando um gasto!
        </p>
      </div>
    `;

    return;
  }

  el.innerHTML = `
    <table class="expenses-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Eco</th>
          <th style="text-align:right">Valor</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        ${list.map(e => entryRow(e)).join('')}
      </tbody>
    </table>
  `;
}

function entryRow(e) {
  const cat =
    findCategoryById(e.cat) ||
    {
      icon: '<i class="fa-solid fa-box"></i>',
      name: e.cat,
      color: '#616161',
      bg: '#F5F5F5'
    };

  const dateStr =
    e.date
      ? new Date(e.date + 'T12:00').toLocaleDateString(
          'pt-BR',
          { day: '2-digit', month: '2-digit', year: '2-digit' }
        )
      : '—';

  const ecoChip =
    e.eco != null
      ? `
        <span class="eco-chip ${
          e.eco >= 7
            ? 'chip-high'
            : e.eco >= 4
              ? 'chip-med'
              : 'chip-low'
        }">
          ${
            e.eco >= 7
              ? '<i class="fa-solid fa-leaf"></i>'
              : '<i class="fa-solid fa-circle"></i>'
          }
          ${e.eco}/10
        </span>
      `
      : `
        <span style="color:var(--text3);font-size:11px">
          —
        </span>
      `;

  return `
    <tr>
      <td>
        <div class="expense-name-cell">

          <div class="cat-icon" style="background:${cat.bg}">
            ${cat.icon}
          </div>

          <div>
            <div class="expense-title">
              ${e.desc}
            </div>

            ${e.obs ? `<div class="expense-note">${e.obs}</div>` : ''}
          </div>

        </div>
      </td>

      <td>
        <span class="cat-badge" style="background:${cat.bg};color:${cat.color}">
          ${cat.name}
        </span>
      </td>

      <td style="white-space:nowrap">
        ${dateStr}
      </td>

      <td>
        ${ecoChip}
      </td>

      <td
        style="text-align:right;white-space:nowrap"
        class="${e.type === 'income' ? 'amount-green' : 'amount-red'}"
      >
        ${e.type === 'income' ? '+' : '−'}
        R$ ${e.value.toFixed(2).replace('.', ',')}
      </td>

      <td>
        <div class="row-actions">
          <button
            class="edit-btn"
            type="button"
            onclick="openEditModal('${e.id}')"
            title="Editar lançamento"
            aria-label="Editar lançamento"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>

          <button
            class="del-btn"
            type="button"
            onclick="deleteEntry('${e.id}')"
            title="Remover"
            aria-label="Remover lançamento"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

/* ─── HISTORICO ──────────────────────────────────────── */

function renderHistorico() {
  const monthSel = document.getElementById('hist-month').value;
  const catSel = document.getElementById('hist-cat').value;
  const typeSel = document.getElementById('hist-type').value;
  const search = document.getElementById('hist-search').value.toLowerCase();

  const list = entries.filter(e => {
    const inMonth = !monthSel || (e.date && e.date.startsWith(monthSel));
    const inCat = !catSel || e.cat === catSel;
    const inType = !typeSel || e.type === typeSel;
    const inSearch =
      !search ||
      e.desc.toLowerCase().includes(search) ||
      (e.obs && e.obs.toLowerCase().includes(search));

    return inMonth && inCat && inType && inSearch;
  });

  const el = document.getElementById('historico-body');

  if (!list.length) {
    el.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">
          <i class="fa-solid fa-envelope-open"></i>
        </span>

        <p>
          Nenhum lançamento encontrado.
        </p>
      </div>
    `;

    return;
  }

  el.innerHTML = `
    <table class="expenses-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Eco</th>
          <th style="text-align:right">Valor</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        ${list.map(e => entryRow(e)).join('')}
      </tbody>
    </table>
  `;
}

function populateHistFilters() {
  const months = [
    ...new Set(
      entries
        .map(e => (e.date ? e.date.slice(0, 7) : ''))
        .filter(Boolean)
    )
  ]
    .sort()
    .reverse();

  const mSel = document.getElementById('hist-month');
  const cur = mSel.value;

  const mNames = [
    'Jan', 'Fev', 'Mar', 'Abr',
    'Mai', 'Jun', 'Jul', 'Ago',
    'Set', 'Out', 'Nov', 'Dez'
  ];

  mSel.innerHTML =
    '<option value="">Todos os meses</option>' +
    months.map(m => {
      const [y, mo] = m.split('-');

      return `
        <option value="${m}" ${m === cur ? 'selected' : ''}>
          ${mNames[parseInt(mo) - 1]}/${y}
        </option>
      `;
    }).join('');

  const catSel = document.getElementById('hist-cat');
  const curCat = catSel.value;

  const usedCats = [...new Set(entries.map(e => e.cat))];

  catSel.innerHTML =
    '<option value="">Todas as categorias</option>' +
    ALL_CATEGORIES
      .filter(c => usedCats.includes(c.id))
      .map(c =>
        `<option value="${c.id}" ${c.id === curCat ? 'selected' : ''}>
          ${c.name}
        </option>`
      )
      .join('');
}

/* ─── MONTH TABS ─────────────────────────────────────── */

function buildMonthTabs() {
  const months = [
    ...new Set(
      entries
        .map(e => (e.date ? e.date.slice(0, 7) : ''))
        .filter(Boolean)
    )
  ]
    .sort()
    .reverse();

  const now = new Date().toISOString().slice(0, 7);

  if (!months.includes(now)) {
    months.unshift(now);
  }

  const mNames = [
    'Jan', 'Fev', 'Mar', 'Abr',
    'Mai', 'Jun', 'Jul', 'Ago',
    'Set', 'Out', 'Nov', 'Dez'
  ];

  if (!currentMonth) {
    currentMonth = now;
  }

  document.getElementById('month-tabs').innerHTML =
    months
      .slice(0, 6)
      .map(m => {
        const [y, mo] = m.split('-');

        return `
          <button 
            class="month-tab ${m === currentMonth ? 'active' : ''}"
            onclick="setMonth('${m}')"
          >
            ${mNames[parseInt(mo) - 1]}/${y}
          </button>
        `;
      })
      .join('');

  populateHistFilters();
}

function setMonth(ym) {
  currentMonth = ym;

  buildMonthTabs();
  renderPainel();
}

/* ─── UTILS ──────────────────────────────────────────── */

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function showToast(msg, warn = false) {
  const t = document.getElementById('toast');

  t.innerHTML = msg;

  t.style.background = warn ? 'var(--amber-d)' : 'var(--g700)';

  t.classList.add('show');

  setTimeout(() => t.classList.remove('show'), 2500);
}

/* ─── LOGOUT ─────────────────────────────────────────── */

async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' });

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  window.location.href = 'login.html';
}


document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeEditModal();
  }
});

document.addEventListener('click', event => {
  const modal = document.getElementById('edit-modal');

  if (event.target === modal) {
    closeEditModal();
  }
});

/* ─── INIT ───────────────────────────────────────────── */

async function init() {
  // Tema primeiro, para a interface já aparecer no modo certo
  initTheme();

  checkAuth();

  await loadCategories();

  buildCatGrid();

  document.getElementById('f-date').value = todayStr();

  updateEcoBadge();
  updatePreview();
  updateEcoTip();
  toggleOutroHint();

  document.getElementById('topbar-date').textContent =
    new Date().toLocaleDateString(
      'pt-BR',
      { weekday: 'short', day: '2-digit', month: 'short' }
    );

  await loadEntries();

  buildMonthTabs();
  renderPainel();
}

window.onload = init;

/* ─── MENU HAMBÚRGUER ────────────────────────────────── */

const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('menu-overlay');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('show');
  hamburger.classList.toggle('active');

  const aberto = sidebar.classList.contains('mobile-open');

  hamburger.setAttribute('aria-expanded', aberto);
});

overlay.addEventListener('click', () => {
  fecharMenu();
});

function fecharMenu() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('show');
  hamburger.classList.remove('active');

  hamburger.setAttribute('aria-expanded', 'false');
}

document
  .querySelectorAll('.sidebar .nav-item')
  .forEach(item => {
    item.addEventListener('click', () => {
      // O botão de tema não fecha o menu no celular
      if (item.id === 'theme-toggle') return;

      if (window.innerWidth <= 900) {
        fecharMenu();
      }
    });
  });