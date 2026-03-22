// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
  galleryList: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.btn-load'),
};
const count_imgs = 15;

let query;
let page;
let totalPages;

render.hideLoader();
render.hideLoadMoreButton();
refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  query = formData.get('search-text');

  render.clearGallery();
  render.showLoader();

  page = 1;
  try {
    const res = await pixabay.getImagesByQuery(query, page);
    const markup = render.createGallerys(res.hits);
    refs.galleryList.innerHTML = markup;
    render.lightBox();
    totalPages = Math.ceil(res.totalHits / count_imgs);
    if (totalPages === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } catch (error) {
    iziToast.info({
      message: error,
    });
  }
  render.hideLoader();
  checkCountPages();

  e.target.reset();
});

refs.btnLoad.addEventListener('click', async e => {
  page += 1;
  render.hideLoadMoreButton();
  try {
    const res = await pixabay.getImagesByQuery(query, page);
    const markup = render.createGallerys(res.hits);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
    scrollDown();
  } catch (error) {
    iziToast.error({
      message: error,
    });
  }
  render.lightBox();
  checkCountPages();
});

function checkCountPages() {
  if (page >= totalPages) {
    render.hideLoadMoreButton();
  } else {
    render.showLoadMoreButton();
  }
}

function scrollDown() {
  window.scrollBy({
    top: 1000,
    behavior: 'smooth',
  });
}
