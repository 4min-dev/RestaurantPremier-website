document.addEventListener("DOMContentLoaded", function () {
    const timeDeliveryNavbar = document.querySelector('.time__stage__availability__navbar');

    if (timeDeliveryNavbar) {
        const timeDeliveryNavbarValues = timeDeliveryNavbar.querySelectorAll('.time__delivery__values');

        function handleUpdateSelectedTime(event) {
            const selectedTime = event.target.closest('.time__delivery__value')

            const selectedDeliveryTimeInput = document.querySelector('.selected__delivery__time__input')

            if (selectedTime) {
                selectedDeliveryTimeInput.value = selectedTime.getAttribute('data-value')
            }

            timeDeliveryNavbarValues.forEach((el) => {
                const timeDeliveryValues = el.querySelectorAll('.time__delivery__value')

                timeDeliveryValues.forEach((timeDeliveryValue) => {
                    if (timeDeliveryValue.getAttribute('data-id') == selectedTime.getAttribute('data-id')) {
                        timeDeliveryValue.classList.add('active')
                    } else {
                        timeDeliveryValue.classList.remove('active')
                    }
                })
            })

            updatePlaceholder(selectedDeliveryTimeInput)
        }

        function updatePlaceholder(input) {

            const inputContainer = input.closest('.named__input__container');
            const inputPlaceholder = inputContainer.querySelector('.input__name');

            setTimeout(() => {
                const visibleValue = input.value.trim();

                if (visibleValue) {
                    inputPlaceholder.classList.add('translated');
                } else {
                    inputPlaceholder.classList.remove('translated');
                }
            }, 1);
        }

        function observeInputValue(input, inputContainer) {
            const observer = new MutationObserver(() => {
                updatePlaceholder(input)
            })

            observer.observe(input, {
                attributes: true,
                attributeFilter: ['value']
            })
        }

        function handleTranslatePlaceholder(input, inputContainer) {
            updatePlaceholder(input)
        }

        function handleClearInput(event) {
            const clearButton = event.target
            const input = clearButton.closest('.named__input__container').querySelector('.named__input')

            input.value = ''

            updatePlaceholder(input)
        }

        const namedInputContainers = document.querySelectorAll('.named__input__container')
        namedInputContainers.forEach((namedInputContainer) => {
            const input = namedInputContainer.querySelector('.named__input')

            observeInputValue(input, namedInputContainer)

            input.addEventListener('input', (event) => handleTranslatePlaceholder(event.target, namedInputContainer))
        })

        const clearButtons = document.querySelectorAll('.clear__input__button')
        clearButtons.forEach((clearButton) => {
            clearButton.addEventListener('click', handleClearInput)
        })

        timeDeliveryNavbarValues.forEach((timeDeliveryNavbarValue) =>
            timeDeliveryNavbarValue.addEventListener('click', handleUpdateSelectedTime)
        )

    } else {
        function handleUpdateSelectedTime(event) {
            const selectedTime = event.target.closest('.time__delivery__value')

            const selectedDeliveryTimeInput = document.querySelector('.selected__delivery__time__input')

            if (selectedTime) {
                selectedDeliveryTimeInput.value = selectedTime.getAttribute('data-value')
            }

            updatePlaceholder(selectedDeliveryTimeInput)
        }

        function updatePlaceholder(input) {

            const inputContainer = input.closest('.named__input__container');
            const inputPlaceholder = inputContainer.querySelector('.input__name');

            setTimeout(() => {
                const visibleValue = input.value.trim();

                if (visibleValue) {
                    inputPlaceholder.classList.add('translated');
                } else {
                    inputPlaceholder.classList.remove('translated');
                }
            }, 1);
        }

        function observeInputValue(input, inputContainer) {
            const observer = new MutationObserver(() => {
                updatePlaceholder(input)
            })

            observer.observe(input, {
                attributes: true,
                attributeFilter: ['value']
            })
        }

        function handleTranslatePlaceholder(input, inputContainer) {
            updatePlaceholder(input)
        }

        function handleClearInput(event) {
            const clearButton = event.target
            const input = clearButton.closest('.named__input__container').querySelector('.named__input')

            input.value = ''

            updatePlaceholder(input)
        }

        const namedInputContainers = document.querySelectorAll('.named__input__container')
        namedInputContainers.forEach((namedInputContainer) => {
            const input = namedInputContainer.querySelector('.named__input')

            observeInputValue(input, namedInputContainer)

            input.addEventListener('input', (event) => handleTranslatePlaceholder(event.target, namedInputContainer))
        })

        const clearButtons = document.querySelectorAll('.clear__input__button')
        clearButtons.forEach((clearButton) => {
            clearButton.addEventListener('click', handleClearInput)
        })
    }
})
