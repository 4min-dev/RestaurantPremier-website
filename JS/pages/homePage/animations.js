import Animations from "../../animations.js";
const animations = new Animations()

const startedSection = document.getElementById('started__section')
const banquetsSection = document.getElementById('banquets__section')
const banquetsAboutSection = document.getElementById('banquets__about__section')
const chiefSection = document.getElementById('chief__section')
const interiorSection = document.getElementById('interior__section')
const eventsSection = document.querySelector('.event__about__text__container')
const gallerySection = document.getElementById('about__us__section')
const requestSection = document.querySelector('.landing__footer')

animations.opacity(startedSection, '.started__section__landing__text')
animations.transformToRight(startedSection, '.header__geo__container')
animations.transformToLeft(startedSection, '.header__ui__container')
animations.transformFromBottom(startedSection, '.started__section__about__scroll')

animations.opacity(banquetsSection, '.banquets__about')
animations.transformToLeftWithRotation(banquetsSection, '.banquets__section__first__block__first__image')
animations.transformToRightWithRotation(banquetsSection, '.banquets__section__first__block__second__image')
animations.transformToLeft(banquetsAboutSection, '.banquets__about__menu__block__first__image')
animations.transformToRight(banquetsAboutSection, '.banquets__about__menu__block__second__image')
animations.transformFromBottom(banquetsAboutSection, '.banquets__about__tags__container')

animations.opacity(chiefSection, '.chief__section__text__container')
animations.transformToLeft(chiefSection, '.chief__section__image__container')

animations.transformScaleY(interiorSection, '.interior__image__container')

animations.transformToRight(eventsSection, '.event__card__1')
animations.transformToLeft(eventsSection, '.event__card__2')


animations.transformScaleYLazy(document.querySelector('.gallery__section__title__container'), '.gallery__section__title__container .block__title')
animations.transformFromBottom(gallerySection, '.gallery__swiper__container')

animations.transformScaleX(requestSection, '.request__form')