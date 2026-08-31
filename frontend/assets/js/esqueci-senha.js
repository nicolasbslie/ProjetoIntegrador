async function enviarLink() {

  const email = document.getElementById('email').value.trim();

  if (!email) {
    alert('Informe seu email.');
    return;
  }

  const botao = document.getElementById('btn-enviar');
  const textoOriginal = botao.textContent;

  botao.disabled = true;
  botao.textContent = 'Enviando...';

  try {
    const resposta = await fetch('http://localhost:3000/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const dados = await resposta.json();

    // A mensagem é sempre a mesma (email exista ou não), por segurança.
    alert(dados.message || 'Se este email estiver cadastrado, você receberá um link para redefinir sua senha.');

    window.location.href = 'login.html';

  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar ao servidor.');
  } finally {
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
}
