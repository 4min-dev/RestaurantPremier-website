function initializeSwiper() {
    const swiper = new Swiper('.swiper-container', {
        freeMode: true,
        simulateTouch: true,
        touchRatio: 1,
        direction: 'horizontal',
        spaceBetween: 0,
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            1025: {
                slidesPerView: 5
            },

            0: {
                slidesPerView: 1.3
            },
        },
    });

    const swiperContainer = document.querySelector('.gallery__swiper__container')

    swiperContainer.addEventListener('wheel', function (event) {

        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
            event.preventDefault()

            const minTranslate = swiper.minTranslate()
            const maxTranslate = swiper.maxTranslate()

            const currentTranslate = swiper.translate

            let newTranslate = currentTranslate + event.deltaX

            if (newTranslate < maxTranslate) {
                newTranslate = maxTranslate
            }
            if (newTranslate > minTranslate) {
                newTranslate = minTranslate
            }

            swiper.setTranslate(newTranslate)
        }
    })
}


initializeSwiper()