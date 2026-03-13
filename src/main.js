import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
const userForm = document.querySelector('.form');

userForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userSearch = formData.get('search-text').trim();
  if (!userSearch) return;

  clearGallery();
  showLoader();

  getImagesByQuery(userSearch)
    .then(data => {
      if (!data.hits.length) {
        iziToast.show({
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: 'white',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.show({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: 'white',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
