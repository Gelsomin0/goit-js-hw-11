import Notiflix from 'notiflix';

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37084690-566054f69b0903988f9ff1e75';
let currentPage = 1;

const ell = {
    galleryEl: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}


ell.searchForm.addEventListener('submit', getSearchQueryData);
ell.loadMoreBtn.addEventListener('click', loadMoreData);

// async function getSearchQueryData(e) {
//     e.preventDefault();
//     const searchQuery = ell.searchForm.querySelector('[name="searchQuery"]').value;    
//     const FETCH_URL = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=15&q=${searchQuery}`;
//     const searchData = await axios.get(FETCH_URL).then((res) => {
//         ell.loadMoreBtn.classList.add('js-visible');
//         return res.data;
//     });

//     if (searchData.totalHits === 0 || searchQuery === '') {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         ell.galleryEl.innerHTML = '';
//         ell.loadMoreBtn.classList.remove('js-visible');
//         return;
//     } 

//     const getContentDataMarkup = await createContentDataMarkup(searchData);

    
//     if (currentPage === 1) {
//         ell.galleryEl.innerHTML = getContentDataMarkup;   
//     } else {
//         ell.galleryEl.insertAdjacentHTML('beforeend', getContentDataMarkup);
//     }
    
// };   

// async function createContentDataMarkup(data) {
//     const { totalHits } = data;
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

//     return data.hits.map(({ previewURL, likes, downloads, comments, views }) => {
//         return `
//             <div class="photo-card">
//                 <img class='image' src="${previewURL}" alt="" loading="lazy" />
//                 <div class="info">
//                     <p class="info-item">
//                         <b>Likes:</b>
//                         <span class='number'>${likes}</span>
//                     </p>
//                     <p class="info-item">
//                         <b>Views:</b>
//                         <span class='number'>${views}</span>
//                     </p>
//                     <p class="info-item">
//                         <b>Comments:</b>
//                         <span class='number'>${comments}</span>
//                     </p>
//                     <p class="info-item">
//                         <b>Downloads:</b>
//                         <span class='number'>${downloads}</span>
//                     </p>
//                 </div>
//             </div>
//         `
//     }).join('');
// }

