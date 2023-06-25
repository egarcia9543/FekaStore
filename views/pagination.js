const paginationNumbers = document.getElementById('paginationNumbers');
const content = document.getElementById('productsContainer');
const items = document.querySelectorAll('productCard');
const prevButton = document.getElementById('previous');
const nextButton = document.getElementById('next');


const paginationLimit = 25;
const pageCount = Math.ceil(items.length/paginationLimit);
let currentPage;

const appendPageNumber = (index) => {
    const pageNumber = document.createElement('button');
    pageNumber.classList.add('btn btn-dark')
    pageNumber.innerHTML = index;

}

const getPaginationNumber = () => {
    for (let i = 0; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};


const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = (pageNum * paginationLimit);

    items.forEach((item, index) => {
        item.classList.add('hidden');
        if (index >= prevRange && index < currRange) {
            item.classList.remove('hidden');
        }
    });
};let

window.addEventListener('load', () => {
    getPaginationNumber();
    setCurrentPage(1);
});