import StageManager from './stageManager.js'

document.addEventListener("DOMContentLoaded", function () {
    const loginPopupOverlay = document.querySelector('#catalog__login__popup__overlay')
    const phoneVerifyStage = document.querySelector('#order__popup__payment__phone__verify__stage')
    const smsVerifyStage = document.querySelector('#order__popup__payment__sms__verify__stage')
    const nextStageButton = phoneVerifyStage.querySelector('.get__phone__code__button')
    const closePopupButtons = loginPopupOverlay.querySelectorAll('.close__popup__button')
    const returnPrevStageButton = smsVerifyStage.querySelector('.return__prev__stage__button')

    const stageManager = new StageManager(loginPopupOverlay)

    function switchToSmsVerifyStage() {
        phoneVerifyStage.classList.remove('visible')
        smsVerifyStage.classList.add('visible')
        stageManager.updateStage(smsVerifyStage)
    }

    function switchToPhoneVerifyStage() {
        smsVerifyStage.classList.remove('visible')
        phoneVerifyStage.classList.add('visible')
        stageManager.updateStage(phoneVerifyStage)
    }

    function closePopupHandler() {
        loginPopupOverlay.classList.remove('visible')
        stageManager.resetStages()

        phoneVerifyStage.classList.add('visible')
        smsVerifyStage.classList.remove('visible')
    }

    nextStageButton.addEventListener('click', function () {
        switchToSmsVerifyStage()
    })

    returnPrevStageButton.addEventListener('click', function () {
        switchToPhoneVerifyStage()
    })

    loginPopupOverlay.addEventListener('click', (e) => {
        if (e.target === loginPopupOverlay) {
            closePopupHandler()
        }
    })

    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopupHandler)
    })

    const popupContent = loginPopupOverlay.querySelector('.popup')
    if (popupContent) {
        popupContent.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }
})