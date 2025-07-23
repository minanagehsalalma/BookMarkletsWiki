(() => {
  const pw = document.querySelectorAll('input[type="password"], input[data-showing="true"]');
  pw.forEach(el => {
    if (el.type === 'password') {
      el.dataset.showing = 'true';
      el.type = 'text';
    } else {
      el.type = 'password';
      delete el.dataset.showing;
    }
  });
})();
