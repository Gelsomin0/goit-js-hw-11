import Notiflix from 'notiflix';
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37084690-566054f69b0903988f9ff1e75';
const ell = {
    galleryEl: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}

