import StageManager from '../../stageManager.js'

document.addEventListener("DOMContentLoaded", function () {
    const orderPopupOverlay = document.querySelector('#order__popup__overlay')
    const orderPopup = orderPopupOverlay.querySelector('.popup')
    const closePopupButtons = document.querySelectorAll('.close__popup__button')
    const stageManager = new StageManager(orderPopupOverlay)

    const catalogMenuCards = document.querySelectorAll('.catalog__menu__card')

    let addOrderHandler = null
    let cart = []

    function removeOrderHandler(catalogMenuCard) {
        const orderId = catalogMenuCard.getAttribute('data-id')
        const cartOrder = cart.find((cartOrder) => cartOrder.id === orderId)
        const orderPrice = cartOrder.price
        const cardQuantityContainer = catalogMenuCard.querySelector('.catalog__menu__card__quantity')
        const removeQuantityButton = cardQuantityContainer.querySelector('.remove__quantity__button')

        const formattedOrderPrice = new Intl.NumberFormat('ru-RU').format(orderPrice) + " ₽"

        if (cartOrder.quantity <= 1) {
            cart = cart.filter((el) => el.id !== cartOrder.id)

            cardQuantityContainer.querySelector('.catalog__menu__card__price').textContent = formattedOrderPrice

            removeQuantityButton.style.display = 'none'
        } else {
            cartOrder.quantity -= 1

            cardQuantityContainer.querySelector('.catalog__menu__card__price').textContent = cartOrder.quantity
        }

        updateCardStates(catalogMenuCard)
    }

    function closePopupHandler() {
        orderPopup.querySelector('.order__popup__button').removeEventListener('click', addOrderHandler)

        document.querySelector('.order__popup__title').textContent = 'Введите код из sms'
        document.querySelector('.order__popup__verify__number').textContent = '+7(999)999-99-99'

        if (document.querySelectorAll('.translated')) {
            document.querySelectorAll('.translated').forEach(translatedElem => translatedElem.classList.remove('translated'))
        }

        document.querySelectorAll('.time__delivery__value').forEach((deliveryValue, i) => {
            if (i === 0) {
                deliveryValue.classList.add('active')
            } else {
                deliveryValue.classList.remove('active')
            }
        })

        document.querySelector('.get__phone__code__button').setAttribute('disabled', 'true')

        if (document.querySelectorAll('.clear__input__button.visible')) {
            document.querySelectorAll('.clear__input__button').forEach(clearButton => clearButton.classList.remove('visible'))
        }

        if (document.querySelector('.otp__container__order__popup').querySelector('.close__popup__button').classList.contains('visible')) {
            document.querySelector('.otp__container__order__popup').querySelector('.close__popup__button').classList.remove('visible')
        }

        document.querySelectorAll('.removed').forEach((removedElement) => {
            removedElement.classList.remove('removed')
        })

        if (document.querySelector('.success__added__svg')) {
            document.querySelector('.success__added__svg').remove()
        }

        if (!document.querySelector('.stage__sms__verify__footer').classList.contains('flex')) {
            document.querySelector('.stage__sms__verify__footer').classList.add('flex')
        }

        document.querySelectorAll('.otp__wrapper').forEach((otpWrapper) => {
            otpWrapper.classList.add('flex')

            otpWrapper.querySelector('.otp__input').classList.remove('cleared')
        })

        // Сброс стейджей через StageManager
        stageManager.resetStages()
    }

    let orderId
    let orderPreviewImage
    let orderTitle
    let orderGramms
    let orderDescription
    let orderComposition
    let parsedOrderCompositionArray
    let orderPrice

    function getPopupHandler() {
        orderPopup.querySelector('.order__preview').setAttribute('src', orderPreviewImage)
        orderPopup.querySelector('.popup__title').innerHTML = orderTitle
        orderPopup.querySelector('.popup__product__gramms').innerHTML = `${orderGramms}г`
        orderPopup.querySelector('.order__popup__description').innerHTML = orderDescription
        orderPopup.querySelector('.order__popup__composition__container').innerHTML =
            parsedOrderCompositionArray.map((element) =>
                `<div class="order__popup__composition__value__container flex column">
                <span class="composition__name">${element.name}</span>
                <span class="composition__value">${element.value}</span>
            </div>`).join('')
    }

    function popupHandler(event) {
        const order = event.currentTarget ?? event

        orderId = order.getAttribute('data-id')
        orderPreviewImage = order.querySelector('.catalog__menu__card__preview').getAttribute('src')
        orderTitle = order.querySelector('.catalog__menu__card__title').innerHTML
        orderGramms = order.querySelector('.catalog__menu__card__grams__amount').innerHTML.split('г')[0]
        orderDescription = order.getAttribute('data-description')
        orderComposition = order.getAttribute('data-composition')
        parsedOrderCompositionArray = Object.entries(JSON.parse(orderComposition)).map(([key, value]) => ({
            name: key,
            value: value
        }))
        orderPrice = order.getAttribute('data-price')

        if (!orderPopupOverlay.classList.contains('visible')) {
            getPopupHandler()

            // Инициализация addOrderHandler при открытии попапа
            addOrderHandler = () => {
                const cartOrder = cart.find((cartElement) => cartElement.id === orderId)

                if (!cart.some((cartElement) => cartElement.id == orderId)) {
                    cart.push({
                        id: orderId,
                        title: orderTitle,
                        description: orderDescription,
                        previewImage: orderPreviewImage,
                        gramms: orderGramms,
                        composition: orderComposition,
                        price: orderPrice,
                        quantity: 1
                    })

                    order.querySelector('.catalog__menu__card__price').innerHTML = 1
                } else {
                    cartOrder.quantity += 1
                    order.querySelector('.catalog__menu__card__price').innerHTML = cartOrder.quantity
                }

                setTimeout(() => {
                    updateCardStates(order)
                }, 200)
            }
        } else {
            closePopupHandler()
        }
    }

    document.querySelector('.get__order__button').addEventListener('click', (event) => {
        setTimeout(() => {
            if (document.querySelector('#order__popup__overlay').getAttribute('data-status') == 'verifyed' && addOrderHandler) {
                addOrderHandler(event)
            } else {
                console.log(addOrderHandler)
            }
        }, 1)
    })

    function updateCardStates(catalogMenuCard) {
        const cardQuantityContainer = catalogMenuCard.querySelector('.catalog__menu__card__quantity')
        const removeQuantityButton = cardQuantityContainer.querySelector('.remove__quantity__button')
        const addQuantityButton = cardQuantityContainer.querySelector('.add__quantity__button')

        const orderId = catalogMenuCard.getAttribute('data-id')
        const cartOrder = cart.find((cartElement) => cartElement.id === orderId)

        if (!catalogMenuCard._addOrderHandler) {
            catalogMenuCard._addOrderHandler = (ev) => {
                popupHandler(catalogMenuCard)

                document.querySelectorAll('.popup__overlay').forEach((popupOverlay) => {
                    if (popupOverlay.getAttribute('data-id') === ev.currentTarget.getAttribute('data-popup-id')) {
                        popupOverlay.classList.add('visible')
                    }
                })
            }
        }

        if (!cartOrder) {
            catalogMenuCard.classList.add('not-added')
            removeQuantityButton.style.display = 'none'

            setTimeout(() => {
                catalogMenuCard.addEventListener('click', popupHandler)
                catalogMenuCard.setAttribute('data-popup-id', 'order__popup')
            }, 1)
            addQuantityButton.removeEventListener('click', catalogMenuCard._addOrderHandler)
            addQuantityButton.removeAttribute('data-popup-id')
        } else {
            catalogMenuCard.classList.remove('not-added')
            removeQuantityButton.style.display = 'block'

            addQuantityButton.addEventListener('click', catalogMenuCard._addOrderHandler)
            addQuantityButton.setAttribute('data-popup-id', 'order__popup')

            catalogMenuCard.removeEventListener('click', popupHandler)
            catalogMenuCard.removeAttribute('data-popup-id')

            cardQuantityContainer.querySelector('.catalog__menu__card__price').textContent = cartOrder.quantity

            if (!catalogMenuCard.dataset.isOrderAdded) {
                catalogMenuCard.dataset.isOrderAdded = "true"

                removeQuantityButton.addEventListener('click', () => removeOrderHandler(catalogMenuCard))
            }
        }
    }

    catalogMenuCards.forEach((catalogMenuCard) => {
        catalogMenuCard.addEventListener('click', popupHandler)

        updateCardStates(catalogMenuCard)
    })

    document.querySelectorAll('.popup__overlay').forEach((popupOverlay) => {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopupHandler()
            }
        })
    })

    closePopupButtons.forEach(closePopupButton => closePopupButton.addEventListener('click', closePopupHandler))
})