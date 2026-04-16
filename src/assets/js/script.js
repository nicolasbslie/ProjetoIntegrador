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