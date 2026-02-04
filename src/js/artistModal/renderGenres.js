// renderGenres.js
export function renderGenres(container, genres) {
  if (!(container instanceof HTMLElement)) {
    return;
  }

  container.innerHTML = '';

  if (genres && genres.length > 0) {
    genres.forEach(genreKey => {
      const genreEl = document.createElement('span');
      genreEl.classList.add('artist-card__genres-item');
      genreEl.textContent = genreKey;
      container.appendChild(genreEl);
    });
  } else {
    const noGenresEl = document.createElement('span');
    noGenresEl.classList.add('artist-card__genres-item');
    noGenresEl.textContent = 'Genres not available';
    container.appendChild(noGenresEl);
  }
}
