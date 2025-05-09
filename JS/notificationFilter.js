import StageManager from './stageManager.js'

document.addEventListener("DOMContentLoaded", function () {
    const notificationPopupOverlay = document.querySelector('#catalog__notifications__popup__overlay')
    const notificationsContainer = document.querySelector('.notification__popup__navbar__container')
    const notificationCards = notificationsContainer.querySelectorAll('.notification__filter__card')

    const stageManager = new StageManager(notificationPopupOverlay)

    function handleNotification(event) {
        const clickedCard = event.currentTarget

        if (clickedCard.classList.contains('active')) {
            return
        }

        notificationCards.forEach(card => {
            card.classList.remove('active')
        })

        clickedCard.classList.add('active')
    }

    notificationCards.forEach(card => {
        card.addEventListener('click', handleNotification)
    })

    function closePopupHandler() {
        notificationPopupOverlay.classList.remove('visible')
        stageManager.resetStages()
    }

    notificationPopupOverlay.addEventListener('click', (e) => {
        
        if (!e.target.closest('.popup')) {
            closePopupHandler()
        }
    })

    const closePopupButtons = notificationPopupOverlay.querySelectorAll('.close__popup__button')
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopupHandler)
    })

    const popupContent = notificationPopupOverlay.querySelector('.popup')
    if (popupContent) {
        popupContent.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }
})