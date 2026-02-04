# 🎵 Artists Hub — Music Discovery Landing

> A compact web app for discovering artists, browsing details, and leaving feedback.

This project is a Vite-based static site that pulls artist data from an external API, renders artist cards with a details modal, and includes a feedback slider and form.

---

## ✅ What’s Inside

- Responsive sections: hero, artists, about, reviews, footer
- Artist cards with a “Learn more” modal
- Feedback slider with rating UI and submission modal
- Mobile menu with smooth anchor scrolling

---

## 🧰 Tech Stack

- HTML + CSS (modular partials)
- JavaScript (ES modules)
- Vite bundler
- Swiper (feedback slider)
- Axios (API requests)

---

## ▶️ Run Locally

1. Install dependencies:
   - npm install
2. Start dev server:
   - npm run dev

---

## 📁 Structure (short)

- src/index.html (HTML entry)
- src/partials/ (section templates)
- src/js/ (features + modals)
- src/css/ (base + section styles)
- src/img/, src/fonts/ (assets)

---

## 📝 Notes

- Data comes from the sound-wave API endpoints used in the JS modules.
- For production build: npm run build
