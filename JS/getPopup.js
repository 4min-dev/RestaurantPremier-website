document.addEventListener("DOMContentLoaded", function () {
    const popupActivateButtons = document.querySelectorAll('.get__popup__button');
    const popupOverlays = document.querySelectorAll('.popup__overlay');

    function getPopupHandler(event) {
        const getPopupButton = event.currentTarget;
        const popupId = getPopupButton.getAttribute('data-popup-id');

        popupOverlays.forEach((popupOverlay) => {
            if (popupOverlay.getAttribute('data-id') === popupId) {
                popupOverlay.classList.add('visible');
            }
        });
    }

    function closePopupHandler() {
        popupOverlays.forEach((popupOverlay) => {
            if (popupOverlay.classList.contains('visible')) {
                resetPopupContent(popupOverlay);
                popupOverlay.classList.remove('visible');
            }
        });
    }

    function resetTimeDelivery(popupOverlay) {
        const timeDeliveryValues = popupOverlay.querySelectorAll('.time__delivery__value');
        const timeInputContainer = popupOverlay.querySelector('.selected__delivery__time__input__container');

        if (!timeInputContainer) {
            return;
        }

        const timeInput = timeInputContainer.querySelector('.selected__delivery__time__input');
        const inputName = timeInputContainer.querySelector('.input__name');
        const clearButton = timeInputContainer.querySelector('.clear__input__button');

        if (inputName && clearButton) {
            inputName.classList.add('translated');
            clearButton.classList.add('visible');
        }

        timeDeliveryValues.forEach((value, index) => {
            if (index === 0) {
                value.classList.add('active');
            } else {
                value.classList.remove('active');
            }
        });

        if (timeInput) {
            timeInput.value = timeInput.getAttribute('data-default') || '';
        }
    }

    function resetPopupContent(popupOverlay) {
        const inputs = popupOverlay.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="password"], textarea');
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('error', 'success');
        });

        const checkboxes = popupOverlay.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        checkboxes.forEach(checkbox => {
            // Ничего не делаем с чекбоксами и радио-кнопками
        });

        // Передаем popupOverlay в resetTimeDelivery
        resetTimeDelivery(popupOverlay);

        const selects = popupOverlay.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });

        const messages = popupOverlay.querySelectorAll('.error-message, .success-message');
        messages.forEach(message => {
            message.textContent = '';
            message.classList.remove('visible');
        });
    }

    popupActivateButtons.forEach((popupActivateButton) => {
        popupActivateButton.addEventListener('click', getPopupHandler);
    });

    popupOverlays.forEach((popupOverlay) => {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopupHandler();
            }
        });

        const closePopupButtons = popupOverlay.querySelectorAll('.close__popup__button');
        closePopupButtons.forEach((closePopupButton) => {
            closePopupButton.addEventListener('click', closePopupHandler);
        });

        const popupContent = popupOverlay.querySelector('.popup');
        if (popupContent) {
            popupContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
});