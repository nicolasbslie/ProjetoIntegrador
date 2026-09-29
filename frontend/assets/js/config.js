/* ─── MODO ESCURO ────────────────────────────────────── */

const THEME_KEY = 'theme';

function aplicarTema() {
  let tema = 'light';

  try {
    tema = localStorage.getItem(THEME_KEY) || 'light';
  } catch (erro) {
    console.warn('Não foi possível recuperar o tema salvo.', erro);
  }

  // Mantém o mesmo tema utilizado na página de gastos.
  document.documentElement.setAttribute(
    'data-theme',
    tema === 'dark' ? 'dark' : 'light'
  );
}

// Aplica o tema ao carregar a página.
aplicarTema();