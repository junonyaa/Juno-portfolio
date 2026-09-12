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
