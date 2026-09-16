const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCount = document.querySelector('.lightbox-count');
let activeGalleryButtons = [];
let currentImage = 0;

function showImage(index) {
  currentImage = (index + activeGalleryButtons.length) % activeGalleryButtons.length;
  const button = activeGalleryButtons[currentImage];
  lightboxImage.src = button.dataset.image;
  lightboxImage.alt = button.dataset.alt;
  lightboxCount.textContent = `${currentImage + 1} / ${activeGalleryButtons.length}`;
}

function openLightbox(index) {
  showImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-section').forEach((gallerySection) => {
  const galleryButtons = [...gallerySection.querySelectorAll('.gallery-open')];
  const galleryFigures = [...gallerySection.querySelectorAll('figure')];
  const previousButton = gallerySection.querySelector('.screenshot-prev');
  const nextButton = gallerySection.querySelector('.screenshot-next');
  const position = gallerySection.querySelector('.screenshot-position');
  let currentGalleryImage = 0;

  function showGalleryImage(index) {
    currentGalleryImage = (index + galleryFigures.length) % galleryFigures.length;
    galleryFigures.forEach((figure, figureIndex) => { figure.hidden = figureIndex !== currentGalleryImage; });
    position.textContent = `${String(currentGalleryImage + 1).padStart(2, '0')} / ${String(galleryFigures.length).padStart(2, '0')}`;
  }

  showGalleryImage(0);
  previousButton.addEventListener('click', () => showGalleryImage(currentGalleryImage - 1));
  nextButton.addEventListener('click', () => showGalleryImage(currentGalleryImage + 1));
  galleryButtons.forEach((button, index) => button.addEventListener('click', () => {
    activeGalleryButtons = galleryButtons;
    openLightbox(index);
  }));
});
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentImage - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentImage + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentImage - 1);
  if (event.key === 'ArrowRight') showImage(currentImage + 1);
});

const gameSlides = [...document.querySelectorAll('.game-slide')];
const gamePosition = document.querySelector('.game-position');
let currentGame = 0;

function showGame(index) {
  currentGame = (index + gameSlides.length) % gameSlides.length;
  gameSlides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== currentGame;
    slide.classList.toggle('is-active', slideIndex === currentGame);
  });
  gamePosition.textContent = `${String(currentGame + 1).padStart(2, '0')} / ${String(gameSlides.length).padStart(2, '0')}`;
}

document.querySelectorAll('[data-game-direction]').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.gameDirection === 'next' ? 1 : -1;
    showGame(currentGame + direction);
  });
});
