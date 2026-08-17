async function cadastrar() {
  limparErros();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirma = document.getElementById('confirmar-senha').value;

  let valido = true;

  if (!nome) {
    mostrarErro('erro-nome');
    valido = false;
  }

  if (!email) {
    mostrarErro('erro-email');
    valido = false;
  }

  if (senha.length < 6) {
    mostrarErro('erro-senha');
    valido = false;
  }

  if (senha !== confirma) {
    mostrarErro('erro-confirmar');
    valido = false;
  }

  if (!valido) return;

  try {
    const resposta = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        confirmarSenha: confirma
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.message || 'Erro ao cadastrar usuário.');
      return;
    }

    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);

    window.location.href = 'login.html';

  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar com o servidor.');
  }
}