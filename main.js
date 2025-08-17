/*
    * Designed & Coded by: Ritik Kumar
*/

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    loader.classList.add('stop');

    setTimeout(() => {
        loader.style.display = 'none';
    }, 5000);
});


/*========-- 02) Current Page Active-link --========*/
const activeLink = document.querySelectorAll('.active-link');
const currLocation = location.href;

activeLink.forEach(actLink => {

    if (actLink.href === currLocation) {
        actLink.classList.add('current-link');
    }

    actLink.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


/*========-- 03) on Window Scroll (sticky-header, scrollTop-btn & scroll-spy) --========*/
const header = document.querySelector('#header');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {

    const currentTop = window.scrollY;

    // Sticky Header
    if (currentTop > 100) {
        header.classList.add('sticky');
    }
    else {
        header.classList.remove('sticky');
    }

    // Scroll-to-top btn
    if (currentTop > 1000) {
        scrollTopBtn.style.transform = 'translateY(0)';
    }
    else {
        scrollTopBtn.style.transform = 'translateY(100px)';
    }

    // Scroll-spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');

    sections.forEach(currSection => {

        let sectionId = currSection.getAttribute('id');
        let sectionHeight = currSection.offsetHeight;
        let sectionTop = currSection.offsetTop;

        if (currentTop >= (sectionTop - sectionHeight / 3)) {

            navLinks.forEach(currLink => {

                currLink.classList.remove('active-link');

                const hrefValue = currLink.getAttribute('href').substring(1);
                if (hrefValue === sectionId) {
                    currLink.classList.add('active-link');
                }
            });
        }

    });

});


const sidebar = document.querySelector('#side-bar');
const sidebarBtn = document.querySelector('.sidebar-btn');

sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// closing the Sidebar on clicking Outside or any of the Links inside it
document.addEventListener('click', (e) => {
    if (e.target.id !== 'side-bar' && e.target.className !== 'sidebar-btn') {
        sidebar.classList.remove('open');
    }
});



const galleryImgs = document.querySelectorAll('.item-box img');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxWrapper = document.querySelector('.lightbox-wrapper');
const lightboxClose = document.querySelector('.lightbox-close');

galleryImgs.forEach(currImg => {
    currImg.addEventListener('click', () => {

        let imgSrc = currImg.getAttribute('src');

        lightboxImg.setAttribute('src', imgSrc);

        document.documentElement.classList.add('overflow-hide');

        lightboxWrapper.classList.add('visible');

    });
});

// closing the Lightbox on clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === lightboxWrapper) {

        document.documentElement.classList.remove('overflow-hide');

        lightboxWrapper.classList.remove('visible')
    }
});



// Reviews Swiper
const swiper2 = new Swiper('.reviews-swiper', {
    effect: "coverflow",
    grabCursor: true,
    speed: 600,
    loop: true,
    loopedSlides: 4,
    centeredSlides: true,
    slideToClickedSlide: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".reviews-swiper .swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    }
});


// =============For Silder Photo Slider=============
// =============For Silder Photo Slider=============
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000);