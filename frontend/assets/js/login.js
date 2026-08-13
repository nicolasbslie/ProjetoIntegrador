  
    function entrar() {
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();

      if (!email || !senha) {
        alert('Preencha todos os campos.');
        return;
      }

      alert('Login realizado com sucesso!');
    }
 