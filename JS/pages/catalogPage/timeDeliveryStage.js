document.addEventListener("DOMContentLoaded", function () {
    const timeDeliveryNavbar = document.querySelector('.time__stage__availability__navbar')
    const timeDeliveryNavbarValues = timeDeliveryNavbar.querySelectorAll('.time__delivery__values')

    const clearButton = document.querySelector('.time__stage__content').querySelector('.clear__input__button')

    function handleClearDeliveryStage() {
        timeDeliveryNavbarValues.forEach((el) => {
            const timeDeliveryValues = el.querySelectorAll('.time__delivery__value')

            timeDeliveryValues.forEach((timeDeliveryValue) => { 
                timeDeliveryValue.classList.remove('active')
            })

            clearButton.classList.remove('visible')
        })
    }
    
    function handleUpdateSelectedTime(event) {
        const selectedTime = event.target.closest('.time__delivery__value')

        const selectedDeliveryTimeInput = document.querySelector('.selected__delivery__time__input')

        if (selectedTime) {
            selectedDeliveryTimeInput.value = selectedTime.getAttribute('data-value')
            clearButton.classList.add('visible')
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
    }

    timeDeliveryNavbarValues.forEach((timeDeliveryNavbarValue) =>
        timeDeliveryNavbarValue.addEventListener('click', handleUpdateSelectedTime)
    )

    clearButton.addEventListener('click', handleClearDeliveryStage)
})
