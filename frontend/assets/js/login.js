async function entrar() {
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();

      try {
        const resposta = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          credentials: 'include', // necessário para o cookie httpOnly ser salvo
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

        // guarda o token também no localStorage (usado como Authorization
        // Bearer nas próximas requisições, além do cookie httpOnly)
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.usuario));

        alert("Login realizado com sucesso! Bem vindo(a).")

      window.location.href='gasto.html'
      } catch (erro) {
        console.error(erro);
        alert('Não foi possível conectar ao servidor')
      }
    }
 