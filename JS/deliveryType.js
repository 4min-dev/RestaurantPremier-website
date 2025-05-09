document.addEventListener('DOMContentLoaded', function () {
    const deliveryTypeContainers = document.querySelectorAll('.delivery__type__container')

    function handleTypeButton(event, deliveryTypeButtons) {

        deliveryTypeButtons.forEach((deliveryTypeButton) => {
            deliveryTypeButton.classList.remove('active')
        })

        event.classList.add('active')
    }

    deliveryTypeContainers.forEach((deliveryTypeContainer) => {
        const deliveryTypeButtons = deliveryTypeContainer.querySelectorAll('.delivery__type__button')
        deliveryTypeButtons.forEach((deliveryTypeButton) => {
            deliveryTypeButton.addEventListener('click', (event) => {
                handleTypeButton(event.target, deliveryTypeButtons)
            })
        })
    })
})