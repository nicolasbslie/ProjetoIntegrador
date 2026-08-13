 
    function limparErros() {
      document.querySelectorAll('.erro').forEach(el => el.style.display = 'none');
    }

    function mostrarErro(id) {
      document.getElementById(id).style.display = 'block';
    }

    function cadastrar() {
      limparErros();

      const nome     = document.getElementById('nome').value.trim();
      const email    = document.getElementById('email').value.trim();
      const senha    = document.getElementById('senha').value;
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

      alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);
      window.location.href = 'login.html';
    }
  
