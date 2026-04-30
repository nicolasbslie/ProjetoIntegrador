  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    const aside = document.querySelector('aside');

    if (id === 'dashboard') {
      aside.style.display = 'block';
    } else if (id === 'login' || id === 'cadastrar') {
      aside.style.display = 'none';
    }
  }
  // Gráfico financeiro
function criarGrafico() {
  const ctx = document.getElementById('financeChart');

  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#1fa463',
        backgroundColor: 'rgba(31, 164, 99, 0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => 'R$ ' + value
          }
        }
      }
    }
  });
}

// chama quando abrir dashboard
const oldShow = show;
show = function(id) {
  oldShow(id);

  if (id === 'dashboard') {
    setTimeout(criarGrafico, 100);
  }
};

async function login() {
  const email = document.querySelector("input[placeholder='Email ou número']").value;
  const senha = document.querySelector("input[type='password']").value;

  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login OK");
    show("dashboard");
  } else {
    alert(data.error);
  }
}

async function adicionarGasto() {
  const valor = document.querySelector("input[type='number']").value;
  const descricao = document.querySelector("input[type='text']").value;
  const categoria_id = document.querySelector("select").selectedIndex + 1;

  await fetch("http://localhost:3000/gastos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: 1,
      valor,
      categoria_id,
      descricao
    })
  });

  alert("Gasto salvo!");
}