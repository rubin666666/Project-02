//modal.js
import { domRefs } from './artistModal/domRefs.js';
import {
  closeModal,
  initCloseModalListeners,
  handleEscDownModal,
} from './artistModal/closeModal.js';
import { fetchArtistData } from './artistModal/fetchArtistData.js';
import { renderArtistInfo } from './artistModal/renderArtistInfo.js';
import { renderAlbums } from './artistModal/renderAlbums.js';
import { renderGenres } from './artistModal/renderGenres.js';
import loader from './artistModal/utils/loader.js';
import { notify } from './notifications.js';

let loaderTimerId = null;
// час затримки для лоадера (в мілісекундах)
const LOADER_DELAY_MS = 300;

// Function to open the modal and fetch artist data
export async function openModal(artistId) {
  //  Show the loader

  try {
    loader.showArtistLoader();

    const artistData = await fetchArtistData(artistId);
    const genres = artistData.genres || [];

    clearModalContent();
    renderArtistInfo(artistData);
    renderAlbums(artistData.tracksList, artistData.strArtist);
    renderGenres(domRefs.artist.genres, genres);

    loader.hideArtistLoader();

    domRefs.modal.classList.remove('modal--hidden');
    // document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    document.addEventListener('keydown', handleEscDownModal);
    // document.body.loaderTimerId = setTimeout(() => {
    //   loader.showArtistLoader();
    // }, LOADER_DELAY_MS);
  } catch (error) {
    loader.hideArtistLoader();
    notify('Не вдалося завантажити дані артиста.', 'error');
    closeModal();
  } finally {
    // if (loaderTimerId) {
    //   clearTimeout(loaderTimerId);
    //   loaderTimerId = null;
    // }
    // Hide the loader
    // loader.hideArtistLoader();
  }
}

function clearModalContent() {
  // Clear all content in the modal

  if (domRefs.albumsContainer) domRefs.albumsContainer.innerHTML = '';
  if (domRefs.genres) domRefs.genres.innerHTML = '';
  if (domRefs.artistInfoContainer) domRefs.artistInfoContainer.innerHTML = '';
}

// Initialize close modal listeners
initCloseModalListeners();
