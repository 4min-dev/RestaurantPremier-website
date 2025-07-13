import Animations from "./animations.js"
const animation = new Animations()

const started__section = document.getElementById('started__section__main__page')
const aboutSection = document.getElementById('about__section')
const services__section = document.getElementById('services__section')
const catalog__section = document.getElementById('catalog__section')
const feedback__section = document.getElementById('feedback__section')
const team__section = document.getElementById('team__section')
const examples__catalog = document.getElementById('examples__catalog__section')
const contacts__section = document.getElementById('contacts__section')

// Анимация для Started Section

gsap.fromTo('.author__about__content',
    { y: '-300%', opacity: 0 },
    {
        y: 0, opacity: 1, duration: 1.3, scrollTrigger: {
            trigger: started__section,
            start: "top 80%",
            once: true
        }
    })

animation.transformToRight(started__section, '.started__section__landing__text')
animation.opacity(started__section, '.landing__btns__container')

// Анимация для Catalog Section
animation.transformToRight(catalog__section, '.catalog__section__heading')
animation.transformToLeft(catalog__section, '.catalog__items__container')

// Анимация для About Section
animation.transformToRight(aboutSection, '.about__section .section__text__content')
animation.opacity(aboutSection, '.about__section__aside__panel')

// Анимация для Services Section
animation.opacity(services__section, '.services-section .section__text__content')
animation.transformToLeft(services__section, '.service__cards__container')


// Анимация для Feedback Section
animation.opacity(feedback__section, '.feedback__section .section__text__content')
animation.opacity(feedback__section, '.feedback__section .feedback__cards__container .feedback__cards__wrapper')

// Анимация для Team Section
animation.transformFromBottom(team__section, '.team__section .section__title')
animation.transformToRight(team__section, '.team__section .section__description')
animation.transformToRight(team__section, '.team__section #team__card__1')
animation.transformToLeft(team__section, '.team__section #team__card__2')

// Анимация для Examples Section
animation.transformFromBottom(examples__catalog, '.examples__catalog__section .section__title')
animation.transformToRight(examples__catalog, '.examples__catalog__section .section__description')

// Анимация для Contacts Section
animation.transformFromBottom(contacts__section, '.contacts__section .section__title')
animation.transformToRight(contacts__section, '.contacts__section .yandex__map__container')
animation.transformToLeft(contacts__section, '.contacts__section .contacts__block')