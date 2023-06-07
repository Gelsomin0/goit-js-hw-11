const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';

const ell = {
    galleryEl: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
}


ell.searchForm.addEventListener('submit', getSearchQueryData);

async function getSearchQueryData(e) {
    e.preventDefault();
    const searchQuery = ell.searchForm.querySelector('[name="searchQuery"]').value;    
    const FETCH_URL = `${BASE_URL}?key=37084690-566054f69b0903988f9ff1e75&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=5&q=${searchQuery}`;
    const searchData = await axios.get(FETCH_URL).then((res) =>  res.data.hits);
    const getContentDataMarkup = await createContentDataMarkup(searchData);

    ell.galleryEl.innerHTML = getContentDataMarkup;
};   

async function createContentDataMarkup(data) {

    return data.map((element) => {
        console.log(element);

        const { previewURL } = element;

        return `
            <img src='${previewURL}'>
        `
    }).join('');
}