import Notiflix from 'notiflix';
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37084690-566054f69b0903988f9ff1e75';
const ell = {
    galleryEl: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}

ell.searchForm.addEventListener('submit', doSearchRequest);


function doSearchRequest(e) {
    e.preventDefault();

    const searchQuery = ell.searchForm.querySelector('[name="searchQuery"]').value;

    ell.galleryEl.innerHTML = '';

    fetchSearchingData(searchQuery);
}

async function fetchSearchingData(searchQuery) {
    const FETCH_URL = `${BASE_URL}?key=${API_KEY}&page=1&per_page=10&q=${searchQuery}`;
    const fetchData = await axios.get(FETCH_URL);
    const gettedData = createGalleryOfDataMarkup(fetchData.data);

    ell.galleryEl.insertAdjacentHTML('beforeend', gettedData);
}

function createGalleryOfDataMarkup({hits, totalHits}) {
    return hits.map((element) => {
        const { likes, views, downloads, comments, previewURL } = element;
        console.log(element);
        return `
            <div class="photo-card">
                <img class='image' src="${previewURL}" alt="" loading="lazy" />
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
}