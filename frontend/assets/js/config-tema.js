/* ─── MODO ESCURO ────────────────────────────────────── */

// Usa exatamente a mesma chave utilizada pela página gasto.html.
function getThemeKey() {
  try {
    const usuario = JSON.parse(
      localStorage.getItem('usuario') || 'null'
    );

    const id = usuario && (usuario.id ?? usuario.email);

    return id ? 'theme:' + id : 'theme';
  } catch (erro) {
    return 'theme';
  }
}


function aplicarTema() {

  let tema = 'light';

  try {
    tema = localStorage.getItem(getThemeKey()) || 'light';
  } catch (erro) {
    console.warn(
      'Não foi possível recuperar o tema salvo.',
      erro
    );
  }

  if (tema === 'dark') {

    document.documentElement.setAttribute(
      'data-theme',
      'dark'
    );

  } else {

    document.documentElement.setAttribute(
      'data-theme',
      'light'
    );

  }
}


/* Aplica o tema ao carregar a página */
aplicarTema();
