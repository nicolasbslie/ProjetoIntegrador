async function entrar() {
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();

      try {
        const resposta = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            senha
          })
        });

        const dados = await resposta.json();

        if(!resposta.ok) {
          alert(dados.message || 'Erro ao realizar login do usuário')
          return
        }

        alert("Login realizado com sucesso! Bem vindo(a).")

      window.location.href='gasto.html'
      } catch (erro) {
        console.error(erro);
        alert('Não foi possível conectar ao servidor')
      }
    }
 