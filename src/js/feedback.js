import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'css-star-rating/css/star-rating.css';
import axios from 'axios';
import { openFeedbackModal } from './feedback-modal.js';
import { notify } from './notifications.js';

document.addEventListener('DOMContentLoaded', async () => {
  const slides = await loadFeedbacks();
  if (slides.length >= 3) initSwiper();
});

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

async function loadFeedbacks() {
  try {
    toggleGlobalLoader(true);
    const allRes = await axios.get('/feedbacks', {
      params: { limit: 25, page: 1 },
    });

    const all = Array.isArray(allRes.data) ? allRes.data : allRes.data.data;

    if (!Array.isArray(all) || all.length === 0) {
      notify('Відгуки поки що недоступні.', 'error');
      return [];
    }

    const feedbacks = all.slice(0, 10);
    renderFeedbacks(feedbacks);
    return feedbacks;
  } catch (err) {
    document.getElementById('feedback-container').innerHTML =
      '<li class="swiper-slide"><p>Відгуки недоступні.</p></li>';
    notify('Не вдалося завантажити відгуки.', 'error');
    return [];
  } finally {
    toggleGlobalLoader(false);
  }
}

function renderFeedbacks(feedbacks) {
  const wrapper = document.getElementById('feedback-container');
  wrapper.innerHTML = '';

  feedbacks.forEach(item => {
    const r = Math.round(item.rating);
    wrapper.insertAdjacentHTML(
      'beforeend',
      `
      <li class="swiper-slide">
        <div class="feedback-card">
          ${renderRating(r)}
          <p class="feedback-text">${item.descr}</p>
          <p class="feedback-author">${item.name}</p>
        </div>
      </li>`
    );
  });
}

function renderRating(value) {
  const stars = Array.from({ length: 5 })
    .map(
      () => `
      <div class="star">
        <i class="star-empty"></i>
        <i class="star-half"></i>
        <i class="star-filled"></i>
      </div>
    `
    )
    .join('');

  return `
    <div class="rating star-icon value-${value} label-hidden" aria-label="Rating: ${value} з 5">
      <div class="star-container">
        ${stars}
      </div>
    </div>
  `;
}

function initSwiper() {
  new Swiper('.feedback-swiper', {
    speed: 1000,
    loop: true,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      renderBullet: (i, cls) => {
        if (i < 3) {
          return `<span class="${cls}"></span>`;
        }
        return '';
      },
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });
}

const btn = document.querySelector('#open-feedback');
if (btn) {
  btn.addEventListener('click', () => {
    openFeedbackModal();
  });
}

function toggleGlobalLoader(isVisible) {
  const loader = document.getElementById('globalLoader');
  if (!loader) return;
  loader.classList.toggle('hidden', !isVisible);
}