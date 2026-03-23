// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
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
  if (query.trim() === '') {
    return iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }

  render.clearGallery();
  render.showLoader();
  render.hideLoadMoreButton();

  page = 1;
  try {
    const res = await pixabay.getImagesByQuery(query, page);
    render.createGallery(res.hits);

    totalPages = Math.ceil(res.totalHits / count_imgs);
    if (totalPages === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } catch (error) {
    iziToast.error({
      message: error,
    });
  }
  render.hideLoader();
  checkCountPages();

  e.target.reset();
});

refs.btnLoad.addEventListener('click', async e => {
  render.hideLoadMoreButton();
  render.showLoader();

  page += 1;
  try {
    const res = await pixabay.getImagesByQuery(query, page);
    render.createGallery(res.hits, true);
    scrollDown();
  } catch (error) {
    iziToast.error({
      message: error,
    });
  }
  checkCountPages();
  render.hideLoader();
});

function checkCountPages() {
  if (page >= totalPages) {
    render.hideLoadMoreButton();
    if (totalPages > 0) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } else {
    render.showLoadMoreButton();
  }
}

function scrollDown() {
  const elem = document.querySelector('.item');
  if (!elem) return;
  const rect = elem.getBoundingClientRect();

  window.scrollBy({
    top: rect.height * 2,
    behavior: 'smooth',
  });
}
