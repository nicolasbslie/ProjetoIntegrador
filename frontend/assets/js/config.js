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

/* ─── PERFIL ─────────────────────────────────────────── */
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

  if (novaSenha && novaSenha !== confirmarNovaSenha) {
    mostrarErro('As senhas não coincidem.');
    return;
  }

  const body = { nome, email };
  if (novaSenha) {
    body.senha = novaSenha;
  }

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

  localStorage.setItem('usuario', JSON.stringify(dados.usuario));
  usuarioAtual = { ...usuarioAtual, ...dados.usuario };
  document.getElementById('nova-senha').value = '';
  document.getElementById('confirmar-nova-senha').value = '';
  mostrarSucesso('Dados atualizados com sucesso!');
}

async function excluirConta() {
  if (!usuarioAtual) return;

  const confirmar = confirm(
    'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.'
  );
  if (!confirmar) return;

  const resposta = await apiFetch('/users/' + usuarioAtual.id, {
    method: 'DELETE'
  });

  if (!resposta || !resposta.ok) {
    mostrarErro('Erro ao excluir a conta.');
    return;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  alert('Conta excluída com sucesso.');
  window.location.href = 'login.html';
}

/* ─── LOGOUT ─────────────────────────────────────────── */
async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' });
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

/* ─── INIT ───────────────────────────────────────────── */
window.onload = () => {
  checkAuth();
  carregarPerfil();
};
