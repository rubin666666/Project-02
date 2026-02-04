// /js/artistModal/utils/loader.js
import { domRefs } from '../domRefs.js';

function showArtistLoader() {
  if (!domRefs.artistDataLoader || !domRefs.artistCardSection) {
    return;
  }
  document.querySelector('#globalLoader').classList.remove('hidden');
  domRefs.artistDataLoader.classList.remove('loader-hidden');
  domRefs.artistDataLoader.classList.add('loader-visible');
  domRefs.artistCardSection.classList.add('hidden');
}

function hideArtistLoader() {
  if (!domRefs.artistDataLoader || !domRefs.artistCardSection) {
    return;
  }
  document.querySelector('#globalLoader').classList.add('hidden');
  domRefs.artistDataLoader.classList.remove('loader-visible');
  domRefs.artistDataLoader.classList.add('loader-hidden');
  domRefs.artistCardSection.classList.remove('hidden');
}

export default {
  showArtistLoader,
  hideArtistLoader,
};
