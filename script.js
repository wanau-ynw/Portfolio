'use strict';
const artworks = [...document.querySelectorAll('[data-art]')];
const dialog = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const count = document.querySelector('#art-count');
const closeButton = document.querySelector('#close-lightbox');
let current = 0;
let opener;
function showArt(index) {
  current = (index + artworks.length) % artworks.length;
  const art = artworks[current];
  image.src = art.getAttribute('href');
  count.textContent = `${current + 1} / ${artworks.length}`;
}
artworks.forEach((art, index) => art.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  opener = art;
  showArt(index);
  dialog.showModal();
  document.body.classList.add('modal-open');
  closeButton.focus();
}));
closeButton.addEventListener('click', () => dialog.close());
document.querySelector('#prev-art').addEventListener('click', () => showArt(current - 1));
document.querySelector('#next-art').addEventListener('click', () => showArt(current + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showArt(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showArt(current + 1); }
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  opener?.focus();
});
