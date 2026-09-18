(() => {
  const waves = document.querySelectorAll('[data-wave]');
  waves.forEach((wave) => {
    const count = Number(wave.dataset.wave || 24);
    wave.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const bar = document.createElement('i');
      const height = 10 + ((i * 17 + 13) % 30);
      bar.style.height = `${height}px`;
      wave.appendChild(bar);
    }
  });

  document.querySelectorAll('[data-toggle-active]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('.action-strip');
      if (!group) return;
      group.querySelectorAll('.action-chip').forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
    });
  });
})();
