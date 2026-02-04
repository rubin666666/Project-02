let container;

function ensureContainer() {
  if (container) return container;
  container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

export function notify(message, type = 'error') {
  const wrap = ensureContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  wrap.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), {
      once: true,
    });
  }, 3500);
}
