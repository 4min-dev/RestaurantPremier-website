import StageManager from './stageManager.js'

document.addEventListener("DOMContentLoaded", function () {
    const deliveryPopupOverlay = document.querySelector('#catalog__delivery__popup__overlay')
    const addressesStage = deliveryPopupOverlay.querySelector('#order__popup__payment__addresses__stage')
    const deliveryStage = deliveryPopupOverlay.querySelector('#order__popup__payment__delivery__stage')
    const nextStageButton = addressesStage.querySelector('.next__stage__button')
    const returnPrevStageButton = deliveryPopupOverlay.querySelector('.return__prev__stage__button')
    const closePopupButtons = deliveryPopupOverlay.querySelectorAll('.close__popup__button')

    const stageManager = new StageManager(deliveryPopupOverlay)

    // Переключение на стейдж адресов
    function switchToAddressesStage() {
        deliveryStage.classList.remove('visible')
        addressesStage.classList.add('visible')
        stageManager.updateStage(addressesStage)
    }

    // Закрытие попапа
    function closePopupHandler() {
        deliveryPopupOverlay.classList.remove('visible')
        stageManager.resetStages()
    }

    if(returnPrevStageButton) {
        returnPrevStageButton.addEventListener('click', function () {
            switchToAddressesStage()
        })
    }

    deliveryPopupOverlay.querySelectorAll('.popup__stage').forEach((ev) => {
        ev.addEventListener('click', (event) => {
            event.stopPropagation()
            event.preventDefault()
        })
    })

    // Закрытие попапа по клику на оверлей
    deliveryPopupOverlay.addEventListener('click', (e) => {
        closePopupHandler()
    })

    // Закрытие попапа по клику на кнопки закрытия
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopupHandler)
    })

    // Предотвращение закрытия попапа при клике на его содержимое
    const popupContent = deliveryPopupOverlay.querySelector('.popup')
    if (popupContent) {
        popupContent.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }
})