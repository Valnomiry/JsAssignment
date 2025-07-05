import { getGamesDetial, getGamesData } from './display.js';


const games = document.querySelector('.games');
export const loading = document.querySelector('.loading');
const details = document.querySelector('.details');
const btnClose = document.getElementById('btnClose');


export function setupCardClickListeners() {
    console.log('Card clicked with data-id:', 'setupCardClickListeners');
    document.querySelectorAll('.card[data-id]').forEach(card => {
        card.addEventListener('click', function () {
            const dataId = this.getAttribute('data-id');
            console.log('Card clicked with data-id:', dataId);
            games.classList.add('d-none');
            loading.classList.remove('d-none');
            details.classList.remove('d-none');
            getGamesDetial(dataId);

        });
    });
}


export function closeDetails() {
    btnClose.addEventListener('click', () => {
        games.classList.remove('d-none');
        loading.classList.add('d-none');
        details.classList.add('d-none');
    });
}
export function getCategoryItems() {
    document.querySelectorAll('.nav-item .nav-link').forEach(link => {
        link.addEventListener('click', function () {
            loading.classList.remove('d-none');
            // Remove 'active' from all nav links
            document.querySelectorAll('.nav-item .nav-link').forEach(l => l.classList.remove('active'));
            // Add 'active' to the clicked link
            this.classList.add('active');
            // Get data-category value
            const category = this.getAttribute('data-category');
            // Do something with category if needed
            console.log('Selected category:', category);
            getGamesData(category);

        });
    });
}