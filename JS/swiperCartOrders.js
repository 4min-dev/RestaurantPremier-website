document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumVelocityRatio: 0.5,
        resistance: true,
        resistanceRatio: 0.8,
        simulateTouch: true,
        touchRatio: 1,
        direction: 'horizontal',
        spaceBetween: 12,
        slidesPerView: 2,
        watchOverflow: true,

        mousewheel: {
            enabled: true,
            forceToAxis: true,
            sensitivity: 1,
        },

        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2.5,
            },
        },

        on: {
            sliderFirstMove: function () {
                swiper.el.style.cursor = 'grabbing'
            },
            sliderMove: function () {
                swiper.el.style.cursor = 'grabbing'
            },
            slideChangeTransitionEnd: function () {
                swiper.el.style.cursor = 'grab'
            },
            touchEnd: function () {
                swiper.el.style.cursor = 'grab'
            },
        },
    })

    swiper.el.style.cursor = 'grab'
})