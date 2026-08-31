function pegarTokenDaURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

async function redefinirSenha() {

  const token = pegarTokenDaURL();

  if (!token) {
    alert('Link inválido. Solicite uma nova redefinição de senha.');
    window.location.href = 'esqueci-senha.html';
    return;
  }

  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const botao = document.getElementById('btn-redefinir');
  const textoOriginal = botao.textContent;

  botao.disabled = true;
  botao.textContent = 'Redefinindo...';

  try {
    const resposta = await fetch('http://localhost:3000/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, senha, confirmarSenha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.message || 'Não foi possível redefinir a senha.');
      return;
    }

    alert(dados.message || 'Senha redefinida com sucesso!');
    window.location.href = 'login.html';

  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar ao servidor.');
  } finally {
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
}

window.onload = () => {
  if (!pegarTokenDaURL()) {
    alert('Link inválido ou expirado. Solicite uma nova redefinição de senha.');
    window.location.href = 'esqueci-senha.html';
  }
};
