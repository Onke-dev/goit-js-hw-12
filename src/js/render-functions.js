// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryItems = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

export function createGallery(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;
  return `<li class="item">
        <a class="img-photo" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
        <div class="wrap-info">
            <p class="info">Likes ${likes}</p>
            <p class="info">Views ${views}</p>
            <p class="info">Comments ${comments}</p>
            <p class="info">Downloads ${downloads}</p>
        </div>
      </li>`;
}
export function createGallerys(images) {
  return images.map(createGallery).join('');
}

export function lightBox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}

export function clearGallery() {
  galleryItems.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  btnLoad.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  btnLoad.classList.add('hidden');
}
