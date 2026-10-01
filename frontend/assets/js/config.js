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

/* ─── FEEDBACK VISUAL ────────────────────────────────── */
function mostrarErro(msg) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = 'feedback erro';
}

function mostrarSucesso(msg) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = 'feedback sucesso';
}

function limparFeedback() {
  const el = document.getElementById('feedback');
  el.textContent = '';
  el.className = 'feedback';
}

/* ─── PERFIL (READ) ──────────────────────────────────── */
let usuarioAtual = null;

async function carregarPerfil() {
  const resposta = await apiFetch('/users/me');
  if (!resposta) return;

  if (!resposta.ok) {
    mostrarErro('Não foi possível carregar seus dados.');
    return;
  }

  usuarioAtual = await resposta.json();

  document.getElementById('nome').value = usuarioAtual.nome;
  document.getElementById('email').value = usuarioAtual.email;
}

/* ─── ATUALIZAR PERFIL (UPDATE) ──────────────────────── */
async function salvarPerfil() {
  if (!usuarioAtual) return;

  limparFeedback();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarNovaSenha = document.getElementById('confirmar-nova-senha').value;

  if (!nome || !email) {
    mostrarErro('Preencha nome e email.');
    return;
  }

  if (novaSenha && novaSenha.length < 6) {
    mostrarErro('A nova senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (novaSenha !== confirmarNovaSenha) {
    mostrarErro('As senhas não coincidem.');
    return;
  }

  const body = { nome, email };
  if (novaSenha) {
    body.senha = novaSenha;
  }

  try {
    const resposta = await apiFetch('/users/' + usuarioAtual.id, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    if (!resposta) return;

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarErro(dados.message || 'Erro ao atualizar seus dados.');
      return;
    }

    // Mantém o localStorage em dia (outras páginas leem nome/email daqui)
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || '{}');
    localStorage.setItem(
      'usuario',
      JSON.stringify({ ...usuarioSalvo, ...dados.usuario })
    );

    usuarioAtual = { ...usuarioAtual, ...dados.usuario };

    document.getElementById('nova-senha').value = '';
    document.getElementById('confirmar-nova-senha').value = '';

    mostrarSucesso('Dados atualizados com sucesso!');
  } catch (erro) {
    mostrarErro('Não foi possível conectar ao servidor.');
  }
}

/* ─── EXCLUIR CONTA (DELETE) ─────────────────────────── */
async function excluirConta() {
  if (!usuarioAtual) return;

  limparFeedback();

  const confirmar = confirm(
    'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.'
  );
  if (!confirmar) return;

  try {
    const resposta = await apiFetch('/users/' + usuarioAtual.id, {
      method: 'DELETE'
    });

    if (!resposta) return;

    if (!resposta.ok) {
      const dados = await resposta.json().catch(() => ({}));
      mostrarErro(dados.message || 'Erro ao excluir a conta.');
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    document.documentElement.setAttribute('data-theme', 'light');

    alert('Conta excluída com sucesso.');
    window.location.href = 'login.html';
  } catch (erro) {
    mostrarErro('Não foi possível conectar ao servidor.');
  }
}

/* ─── LOGOUT ─────────────────────────────────────────── */
async function logout() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch (erro) {
    // Mesmo sem resposta do servidor, encerra a sessão localmente
  }

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  // Volta o visual para o claro, para a tela de login não herdar o tema
  // da conta que acabou de sair (a preferência dela continua salva).
  document.documentElement.setAttribute('data-theme', 'light');

  window.location.href = 'login.html';
}

/* ─── INIT ───────────────────────────────────────────── */
window.onload = () => {
  checkAuth();
  carregarPerfil();
};
