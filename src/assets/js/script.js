// NAVEGAÇÃO
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const aside = document.querySelector('aside');

  if (id === 'dashboard') {
    aside.style.display = 'block';
    setTimeout(criarGrafico, 100);
  } else if (id === 'login' || id === 'cadastrar') {
    aside.style.display = 'none';
  }
}


// LOGIN
async function login() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login OK");

    // salva usuário
    localStorage.setItem("usuario", JSON.stringify(data));

    show("dashboard");
  } else {
    alert(data.error);
  }
}

// CADASTRO
async function cadastrar() {
  const nome = document.getElementById("cadNome").value;
  const sobrenome = document.getElementById("cadSobrenome").value;
  const idade = document.getElementById("cadIdade").value;
  const email = document.getElementById("cadEmail").value;
  const senha = document.getElementById("cadSenha").value;
  const confirmar = document.getElementById("cadConfirmar").value;

  if (!nome || !sobrenome || !idade || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha !== confirmar) {
    alert("Senhas não conferem");
    return;
  }

  const res = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nome + " " + sobrenome,
      idade,
      email,
      senha
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Cadastro realizado!");
    show("dashboard");
  } else {
    alert(data.error);
  }
}

// GASTO
async function adicionarGasto() {
  const valor = document.getElementById("gastoValor").value;
  const descricao = document.getElementById("gastoDescricao").value;
  const categoria_id = document.getElementById("gastoCategoria").value;

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Você precisa estar logado");
    return;
  }

  await fetch("http://localhost:3000/gastos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: usuario.id,
      valor,
      categoria_id,
      descricao
    })
  });

  alert("Gasto salvo!");
}