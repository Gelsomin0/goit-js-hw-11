import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37084690-566054f69b0903988f9ff1e75';
const ell = {
    galleryEl: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}
let searchQuery = undefined;
let currentPage = 1;

ell.searchForm.addEventListener('submit', doSearchRequest);
ell.loadMoreBtn.addEventListener('click', () => {
    fetchSearchingData(searchQuery);
});

const lightbox = new SimpleLightbox('.gallery a');


function doSearchRequest(e) {
    e.preventDefault();

    searchQuery = ell.searchForm.querySelector('[name="searchQuery"]').value;
    currentPage = 1;
    ell.galleryEl.innerHTML = '';
    ell.loadMoreBtn.classList.remove('js-visible');

    if (searchQuery === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }

    fetchSearchingData(searchQuery);
}

async function fetchSearchingData(searchQuery) {
    const FETCH_URL = `${BASE_URL}?key=${API_KEY}&page=${currentPage}&per_page=40&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
    const fetchData = await axios.get(FETCH_URL)
        .then((res) => {
            return res;
        });
    createGalleryOfDataMarkup(fetchData.data);

    
}

function createGalleryOfDataMarkup({ hits, totalHits }) {
    if (totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    if (currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);    
    }

    

    const gettedData = hits.map(({ likes, views, downloads, comments, webformatURL, largeImageURL, tags }) => {
        return `
            <div class="photo-card">
                <a href='${largeImageURL}'>
                    <img class='image' src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes:</b>
                        <span>${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views:</b>
                        <span>${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments:</b>
                        <span>${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads:</b>
                        <span>${downloads}</span>
                    </p>
                </div>
            </div>
        `;
    }).join('');

    ell.galleryEl.insertAdjacentHTML('beforeend', gettedData);
    ell.loadMoreBtn.classList.add('js-visible');
    currentPage += 1;

    let cardsQuantity = ell.galleryEl.querySelectorAll('.photo-card').length;
    
    if (cardsQuantity >= totalHits) {
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        ell.loadMoreBtn.classList.remove('js-visible');
    }

    lightbox.refresh();
}