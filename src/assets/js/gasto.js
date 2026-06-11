
/* ─── DATA ───────────────────────────────────────────── */
const STORAGE_KEY = 'ecospending_entries';

const CATEGORIES = [
  { id:'moradia',     icon:'🏠', name:'Moradia',     color:'#2196A3', bg:'#E0F4F6' },
  { id:'alimentacao', icon:'🍽️', name:'Alimentação', color:'#C77D11', bg:'#FFF8E1' },
  { id:'transporte',  icon:'🚗', name:'Transporte',  color:'#7B5EA7', bg:'#F0EBF8' },
  { id:'saude',       icon:'💊', name:'Saúde',       color:'#E63946', bg:'#FDECEA' },
  { id:'lazer',       icon:'🎯', name:'Lazer',        color:'#40916C', bg:'#D8F3DC' },
  { id:'educacao',    icon:'📚', name:'Educação',    color:'#2D6A4F', bg:'#D8F3DC' },
  { id:'vestuario',   icon:'👕', name:'Vestuário',   color:'#6D4C41', bg:'#EFEBE9' },
  { id:'investimento',icon:'📈', name:'Investimento',color:'#1565C0', bg:'#E3F2FD' },
  { id:'salario',     icon:'💰', name:'Salário',     color:'#2D6A4F', bg:'#D8F3DC' },
  { id:'outros',      icon:'📦', name:'Outros',      color:'#616161', bg:'#F5F5F5' },
];

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
let selectedCat = 'alimentacao';
let currentMonth = '';

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    entries = raw ? JSON.parse(raw) : [];
  } catch(e) { entries = []; }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/* ─── NAVIGATION ─────────────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => {
    if(n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + id + "'")) n.classList.add('active');
  });
  if(id === 'painel') renderPainel();
  if(id === 'historico') renderHistorico();
}

/* ─── FORM SETUP ─────────────────────────────────────── */
function buildCatGrid() {
  const grid = document.getElementById('cat-grid');
  grid.innerHTML = CATEGORIES.map(c => `
    <button class="cat-btn ${c.id === selectedCat ? 'selected' : ''}" id="cat-${c.id}"
      onclick="selectCat('${c.id}')" style="${c.id === selectedCat ? `border-color:${c.color};background:${c.bg};` : ''}">
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
  const c = CATEGORIES.find(x => x.id === id);
  const btn = document.getElementById('cat-' + id);
  btn.classList.add('selected');
  btn.style.borderColor = c.color;
  btn.style.background = c.bg;
  updatePreview();
  updateEcoTip();
}

function setType(type) {
  currentType = type;
  document.getElementById('type-expense').className = 'type-btn' + (type === 'expense' ? ' selected-expense' : '');
  document.getElementById('type-income').className = 'type-btn' + (type === 'income' ? ' selected-income' : '');
  const ecoSection = document.getElementById('eco-section');
  const ecoWrap = document.getElementById('eco-wrap');
  ecoSection.style.display = type === 'income' ? 'none' : '';
  ecoWrap.style.display = type === 'income' ? 'none' : '';
  document.getElementById('prev-type').textContent = type === 'expense' ? 'Gasto' : 'Receita';
  document.getElementById('prev-total').className = 'val' + (type === 'income' ? ' income' : '');
  updatePreview();
}

function updateEcoBadge() {
  const val = parseInt(document.getElementById('f-eco').value);
  const badge = document.getElementById('eco-badge');
  badge.textContent = val + ' / 10';
  if(val >= 7) { badge.style.background = 'var(--g100)'; badge.style.color = 'var(--g700)'; }
  else if(val >= 4) { badge.style.background = '#FFF8E1'; badge.style.color = 'var(--amber-d)'; }
  else { badge.style.background = 'var(--red-l)'; badge.style.color = 'var(--red)'; }
  updatePreview();
}

function updatePreview() {
  const val = parseFloat(document.getElementById('f-value').value) || 0;
  const desc = document.getElementById('f-desc').value || '—';
  const dateRaw = document.getElementById('f-date').value;
  const eco = parseInt(document.getElementById('f-eco').value) || 8;
  const cat = CATEGORIES.find(c => c.id === selectedCat);

  document.getElementById('prev-date').textContent = dateRaw ? new Date(dateRaw + 'T12:00').toLocaleDateString('pt-BR', {day:'2-digit',month:'long',year:'numeric'}) : '—';
  document.getElementById('prev-cat').textContent = cat ? cat.icon + ' ' + cat.name : '—';
  document.getElementById('prev-desc').textContent = desc;
  document.getElementById('prev-total').textContent = 'R$ ' + val.toFixed(2).replace('.',',');

  const pct = (eco / 10) * 100;
  const fill = document.getElementById('eco-meter-fill');
  fill.style.width = pct + '%';
  fill.style.background = eco >= 7 ? 'var(--g500)' : eco >= 4 ? 'var(--amber)' : 'var(--red)';
  const descs = ['','🔴 Gasto impulsivo — refletir!','🔴 Gasto sem planejamento','🔴 Pouco consciente','🟡 Abaixo do ideal','🟡 Gasto neutro','🟡 Razoável','🟢 Bom — gasto planejado','🟢 Gasto consciente — ótimo!','🌿 Excelente escolha!','🌿 Gasto 100% consciente!'];
  document.getElementById('eco-meter-desc').textContent = descs[eco] || '—';
  if(currentType === 'income') document.getElementById('eco-meter-desc').textContent = '💰 Receita — não avaliada';
}

function updateEcoTip() {
  const tips = {
    alimentacao: 'Planejar o cardápio semanal reduz desperdício e economiza até 30% nas compras.',
    moradia: 'Revise seus contratos de serviços como internet e energia — há espaço para negociar.',
    transporte: 'Combinar transporte público com bicicleta pode economizar mais de R$400/mês.',
    lazer: 'Lazer em casa ou ao ar livre pode ser tão satisfatório e muito mais barato.',
    saude: 'Plano de saúde preventivo sai mais barato que tratamentos emergenciais.',
    educacao: 'Investimento em educação tem o melhor ROI da sua vida.',
    vestuario: 'Comprar peças de qualidade dura mais e economiza a longo prazo.',
    investimento: 'Consistência supera tentativas de timing. Invista todo mês, mesmo pouco.',
    salario: 'Separe pelo menos 10% do salário para investimentos assim que receber.',
    outros: ECO_TIPS[Math.floor(Math.random() * ECO_TIPS.length)],
  };
  document.getElementById('eco-tip').innerHTML = `<strong>💡 Dica ecoSpending</strong>${tips[selectedCat] || ECO_TIPS[0]}`;
}

function submitExpense() {
  const val = parseFloat(document.getElementById('f-value').value);
  if(!val || val <= 0) { showToast('⚠️ Informe um valor válido', true); return; }
  const desc = document.getElementById('f-desc').value.trim();
  if(!desc) { showToast('⚠️ Informe uma descrição', true); return; }
  const dateVal = document.getElementById('f-date').value;
  if(!dateVal) { showToast('⚠️ Informe a data', true); return; }

  const entry = {
    id: Date.now(),
    type: currentType,
    value: val,
    desc,
    date: dateVal,
    cat: selectedCat,
    obs: document.getElementById('f-obs').value.trim(),
    eco: currentType === 'expense' ? parseInt(document.getElementById('f-eco').value) : null,
  };

  entries.unshift(entry);
  saveEntries();
  showToast('✅ Lançamento salvo!');
  resetForm();
  buildMonthTabs();
  renderPainel();
}

function resetForm() {
  document.getElementById('f-value').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-date').value = todayStr();
  document.getElementById('f-obs').value = '';
  document.getElementById('f-eco').value = 8;
  updateEcoBadge();
  updatePreview();
}

function deleteEntry(id) {
  entries = entries.filter(e => e.id !== id);
  saveEntries();
  renderPainel();
  renderHistorico();
  buildMonthTabs();
  showToast('🗑️ Removido');
}

/* ─── PAINEL ─────────────────────────────────────────── */
function getMonthEntries(ym) {
  if(!ym) return entries;
  return entries.filter(e => e.date && e.date.startsWith(ym));
}

function renderPainel() {
  const filtered = getMonthEntries(currentMonth);
  const expenses = filtered.filter(e => e.type === 'expense');
  const incomes  = filtered.filter(e => e.type === 'income');

  const totalExp = expenses.reduce((s, e) => s + e.value, 0);
  const totalInc = incomes.reduce((s, e) => s + e.value, 0);
  const balance  = totalInc - totalExp;
  const ecoArr   = expenses.filter(e => e.eco != null).map(e => e.eco);
  const ecoAvg   = ecoArr.length ? (ecoArr.reduce((a,b)=>a+b,0)/ecoArr.length).toFixed(1) : '—';

  document.getElementById('kpi-total').textContent   = 'R$ ' + totalExp.toFixed(2).replace('.',',');
  document.getElementById('kpi-income').textContent  = 'R$ ' + totalInc.toFixed(2).replace('.',',');
  document.getElementById('kpi-balance').textContent = (balance < 0 ? '−R$ ' : 'R$ ') + Math.abs(balance).toFixed(2).replace('.',',');
  document.getElementById('kpi-balance').className   = 'kpi-value ' + (balance >= 0 ? 'green' : 'red');
  document.getElementById('kpi-eco').textContent     = ecoAvg + (ecoAvg !== '—' ? '/10' : '');
  document.getElementById('sidebar-eco-score').textContent = ecoAvg !== '—' ? ecoAvg : '—';

  renderGoals(expenses);
  renderBarChart(filtered);
  renderDonut(expenses);
  renderRecent(filtered.slice(0, 8));
}

function renderGoals(expenses) {
  const goals = { moradia: 1500, alimentacao: 800, lazer: 400 };
  const totals = {};
  expenses.forEach(e => { totals[e.cat] = (totals[e.cat] || 0) + e.value; });

  Object.entries(goals).forEach(([cat, goal]) => {
    const spent = totals[cat] || 0;
    const pct   = Math.min(100, Math.round((spent / goal) * 100));
    const over  = pct >= 100;
    document.getElementById('gp-' + (cat === 'alimentacao' ? 'alim' : cat)).textContent = pct + '%';
    const bar = document.getElementById('gb-' + (cat === 'alimentacao' ? 'alim' : cat));
    bar.style.width = pct + '%';
    bar.style.background = over ? 'var(--red)' : pct > 75 ? 'var(--amber)' : '';
    document.getElementById('ga-' + (cat === 'alimentacao' ? 'alim' : cat)).textContent = 'R$ ' + spent.toFixed(2).replace('.',',');
  });
}

function renderBarChart(filtered) {
  const ym = currentMonth || new Date().toISOString().slice(0,7);
  const [y, m] = ym.split('-').map(Number);
  const days = new Date(y, m, 0).getDate();
  const byDay = {};
  filtered.filter(e => e.type === 'expense').forEach(e => {
    const d = parseInt(e.date.split('-')[2]);
    byDay[d] = (byDay[d] || 0) + e.value;
  });
  const vals = Array.from({length: days}, (_, i) => byDay[i+1] || 0);
  const max  = Math.max(...vals, 1);

  const container = document.getElementById('bar-chart');
  container.innerHTML = vals.map((v, i) => {
    const h = Math.round((v / max) * 140);
    const active = v > 0;
    return `
      <div class="bar-group" title="Dia ${i+1}: R$ ${v.toFixed(2)}">
        ${active ? `<div class="bar-val" style="font-size:9px">R$${Math.round(v)}</div>` : ''}
        <div class="bar" style="height:${h}px;opacity:${active?1:0.25}"></div>
        <div class="bar-label">${i+1}</div>
      </div>
    `;
  }).join('');

  const mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  document.getElementById('chart-month-label').textContent = mNames[m-1] + '/' + y;
}

function renderDonut(expenses) {
  const bycat = {};
  expenses.forEach(e => { bycat[e.cat] = (bycat[e.cat] || 0) + e.value; });
  const total = Object.values(bycat).reduce((a,b)=>a+b, 0);
  const svg   = document.getElementById('donut-svg');
  const legend= document.getElementById('donut-legend');
  const CX=80, CY=80, R=64, r=44;

  document.getElementById('donut-center-val').textContent = total > 0 ? 'R$' + Math.round(total) : '0';

  // remove old arcs
  svg.querySelectorAll('.arc').forEach(e=>e.remove());

  if(total === 0) {
    legend.innerHTML = '<div class="empty-state" style="padding:.5rem"><p style="font-size:12px">Sem gastos ainda</p></div>';
    return;
  }

  const sorted = Object.entries(bycat).sort((a,b)=>b[1]-a[1]);
  const colors = ['#40916C','#2196A3','#E9C46A','#E63946','#7B5EA7','#6D4C41','#1565C0','#616161','#C77D11','#52B788'];

  let angle = -Math.PI/2;
  sorted.forEach(([catId, val], i) => {
    const frac   = val / total;
    const sweep  = frac * 2 * Math.PI;
    const x1 = CX + R * Math.cos(angle);
    const y1 = CY + R * Math.sin(angle);
    const x2 = CX + R * Math.cos(angle + sweep);
    const y2 = CY + R * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const xi1 = CX + r * Math.cos(angle);
    const yi1 = CY + r * Math.sin(angle);
    const xi2 = CX + r * Math.cos(angle + sweep);
    const yi2 = CY + r * Math.sin(angle + sweep);
    const d = `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${xi2},${yi2} A${r},${r} 0 ${large},0 ${xi1},${yi1} Z`;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', d);
    path.setAttribute('fill', colors[i % colors.length]);
    path.setAttribute('class','arc');
    path.setAttribute('opacity','0.9');
    svg.insertBefore(path, svg.firstChild);
    angle += sweep;
  });

  legend.innerHTML = sorted.slice(0,5).map(([catId, val], i) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    const pct = Math.round((val/total)*100);
    return `
      <div class="legend-item">
        <div class="legend-dot" style="background:${colors[i % colors.length]}"></div>
        <span class="legend-name">${cat ? cat.icon + ' ' + cat.name : catId}</span>
        <span class="legend-val">R$${val.toFixed(0)}</span>
        <span class="legend-pct">${pct}%</span>
      </div>
    `;
  }).join('');
}

function renderRecent(list) {
  const el = document.getElementById('recent-body');
  if(!list.length) {
    el.innerHTML = '<div class="empty-state"><span class="empty-icon">🌱</span><p>Nenhum lançamento ainda.<br>Comece adicionando um gasto!</p></div>';
    return;
  }
  el.innerHTML = `
    <table class="expenses-table">
      <thead><tr>
        <th>Descrição</th>
        <th>Categoria</th>
        <th>Data</th>
        <th>Eco</th>
        <th style="text-align:right">Valor</th>
        <th></th>
      </tr></thead>
      <tbody>${list.map(e => entryRow(e)).join('')}</tbody>
    </table>
  `;
}

function entryRow(e) {
  const cat = CATEGORIES.find(c => c.id === e.cat) || { icon:'📦', name: e.cat, color:'#616161', bg:'#F5F5F5' };
  const dateStr = e.date ? new Date(e.date + 'T12:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'}) : '—';
  const ecoChip = e.eco != null
    ? `<span class="eco-chip ${e.eco>=7?'chip-high':e.eco>=4?'chip-med':'chip-low'}">${e.eco>=7?'🌿':e.eco>=4?'🟡':'🔴'} ${e.eco}/10</span>`
    : '<span style="color:var(--text3);font-size:11px">—</span>';
  return `
    <tr>
      <td>
        <div class="expense-name-cell">
          <div class="cat-icon" style="background:${cat.bg}">${cat.icon}</div>
          <div>
            <div class="expense-title">${e.desc}</div>
            ${e.obs ? `<div class="expense-note">${e.obs}</div>` : ''}
          </div>
        </div>
      </td>
      <td><span class="cat-badge" style="background:${cat.bg};color:${cat.color}">${cat.name}</span></td>
      <td style="white-space:nowrap">${dateStr}</td>
      <td>${ecoChip}</td>
      <td style="text-align:right;white-space:nowrap" class="${e.type==='income'?'amount-green':'amount-red'}">
        ${e.type==='income'?'+':'−'} R$ ${e.value.toFixed(2).replace('.',',')}
      </td>
      <td><button class="del-btn" onclick="deleteEntry(${e.id})" title="Remover">✕</button></td>
    </tr>
  `;
}

/* ─── HISTORICO ──────────────────────────────────────── */
function renderHistorico() {
  const monthSel  = document.getElementById('hist-month').value;
  const catSel    = document.getElementById('hist-cat').value;
  const typeSel   = document.getElementById('hist-type').value;
  const search    = document.getElementById('hist-search').value.toLowerCase();

  let list = entries.filter(e => {
    const inMonth  = !monthSel || (e.date && e.date.startsWith(monthSel));
    const inCat    = !catSel || e.cat === catSel;
    const inType   = !typeSel || e.type === typeSel;
    const inSearch = !search || e.desc.toLowerCase().includes(search) || (e.obs && e.obs.toLowerCase().includes(search));
    return inMonth && inCat && inType && inSearch;
  });

  const el = document.getElementById('historico-body');
  if(!list.length) {
    el.innerHTML = '<div class="empty-state"><span class="empty-icon">📭</span><p>Nenhum lançamento encontrado.</p></div>';
    return;
  }
  el.innerHTML = `
    <table class="expenses-table">
      <thead><tr>
        <th>Descrição</th>
        <th>Categoria</th>
        <th>Data</th>
        <th>Eco</th>
        <th style="text-align:right">Valor</th>
        <th></th>
      </tr></thead>
      <tbody>${list.map(e => entryRow(e)).join('')}</tbody>
    </table>
  `;
}

function populateHistFilters() {
  const months = [...new Set(entries.map(e => e.date ? e.date.slice(0,7) : '').filter(Boolean))].sort().reverse();
  const mSel = document.getElementById('hist-month');
  const cur  = mSel.value;
  mSel.innerHTML = '<option value="">Todos os meses</option>' + months.map(m => {
    const [y,mo] = m.split('-');
    const mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return `<option value="${m}" ${m===cur?'selected':''}>${mNames[parseInt(mo)-1]}/${y}</option>`;
  }).join('');

  const catSel = document.getElementById('hist-cat');
  const curCat = catSel.value;
  const usedCats = [...new Set(entries.map(e => e.cat))];
  catSel.innerHTML = '<option value="">Todas as categorias</option>' + CATEGORIES.filter(c=>usedCats.includes(c.id)).map(c =>
    `<option value="${c.id}" ${c.id===curCat?'selected':''}>${c.icon} ${c.name}</option>`
  ).join('');
}

/* ─── MONTH TABS ─────────────────────────────────────── */
function buildMonthTabs() {
  const months = [...new Set(entries.map(e => e.date ? e.date.slice(0,7) : '').filter(Boolean))].sort().reverse();
  const now = new Date().toISOString().slice(0,7);
  if(!months.includes(now)) months.unshift(now);

  const mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  if(!currentMonth) currentMonth = now;

  document.getElementById('month-tabs').innerHTML = months.slice(0,6).map(m => {
    const [y,mo] = m.split('-');
    return `<button class="month-tab ${m===currentMonth?'active':''}" onclick="setMonth('${m}')">${mNames[parseInt(mo)-1]}/${y}</button>`;
  }).join('');

  populateHistFilters();
}

function setMonth(ym) {
  currentMonth = ym;
  buildMonthTabs();
  renderPainel();
}

/* ─── UTILS ──────────────────────────────────────────── */
function todayStr() {
  return new Date().toISOString().slice(0,10);
}

function showToast(msg, warn=false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = warn ? 'var(--amber-d)' : 'var(--g700)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

/* ─── INIT ───────────────────────────────────────────── */
function init() {
  loadEntries();
  buildCatGrid();
  document.getElementById('f-date').value = todayStr();
  updateEcoBadge();
  updatePreview();
  updateEcoTip();

  // topbar date
  document.getElementById('topbar-date').textContent =
    new Date().toLocaleDateString('pt-BR', {weekday:'short', day:'2-digit', month:'short'});

  buildMonthTabs();
  renderPainel();

  // seed demo data if empty
  if(entries.length === 0) seedDemo();
}

function seedDemo() {
  const today = todayStr();
  const ym = today.slice(0,7);
  const demos = [
    { type:'income', value:4500, desc:'Salário maio', date:ym+'-01', cat:'salario', obs:'', eco:null },
    { type:'expense', value:1200, desc:'Aluguel', date:ym+'-02', cat:'moradia', obs:'', eco:9 },
    { type:'expense', value:380, desc:'Supermercado', date:ym+'-05', cat:'alimentacao', obs:'compra mensal planejada', eco:8 },
    { type:'expense', value:120, desc:'Uber', date:ym+'-07', cat:'transporte', obs:'', eco:4 },
    { type:'expense', value:200, desc:'Academia', date:ym+'-10', cat:'saude', obs:'', eco:9 },
    { type:'expense', value:89, desc:'Netflix + Spotify', date:ym+'-12', cat:'lazer', obs:'assinaturas', eco:6 },
    { type:'expense', value:300, desc:'Curso de investimentos', date:ym+'-15', cat:'educacao', obs:'ecoSpending', eco:10 },
    { type:'income', value:500, desc:'Freela design', date:ym+'-18', cat:'salario', obs:'', eco:null },
    { type:'expense', value:65, desc:'Farmácia', date:ym+'-20', cat:'saude', obs:'', eco:8 },
    { type:'expense', value:150, desc:'Jantar aniversário', date:ym+'-22', cat:'lazer', obs:'', eco:5 },
  ].map((e,i) => ({...e, id: Date.now() + i}));
  entries = demos;
  saveEntries();
  buildMonthTabs();
  renderPainel();
}

window.onload = init;
