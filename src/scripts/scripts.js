const btnMenu = window.document.querySelector('.btn-menu');
const navigation = window.document.querySelector('.navigation');
const overlay = window.document.querySelector('.overlay');
const btnBookmark = window.document.querySelector('.btn-bookmark');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn-menu--active');
    navigation.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
});

overlay.addEventListener('click', () => {
    if(overlay.classList.contains('is-active')){
        closeModal();
    }
});

window.onresize = function() {
    if(window.innerWidth > 1024 && navigation.classList.contains('is-active')){
        closeModal();
    }
}

function closeModal(){
    btnMenu.classList.remove('btn-menu--active');
    navigation.classList.remove('is-active');
    overlay.classList.remove('is-active');
}

btnBookmark.addEventListener('click', () => {
    btnBookmark.classList.toggle('btn-bookmark--active');

    if(btnBookmark.classList.contains('btn-bookmark--active')){
        btnBookmark.lastElementChild.innerHTML = "Bookmarked";
    } else {
        btnBookmark.lastElementChild.innerHTML = "Bookmark";
    }
});