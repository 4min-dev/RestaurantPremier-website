document.addEventListener("DOMContentLoaded", function () {
    const inputContainers = document.querySelectorAll('.input__container__with__clear')

    function handleClearInputButton(event, input) {
        const button = event.currentTarget

        if(input.value) {
            input.value = ''
            button.classList.remove('visible')
        }
    }
    function handleClearInput(event, clearButton) {
        const input = event.target

        if(input.value) {
            clearButton.classList.add('visible')
        } else {
            clearButton.classList.remove('visible')
        }
    }

    inputContainers.forEach((inputContainer) => {
        const clearInputButton = inputContainer.querySelector('.clear__input__button')
        const input = inputContainer.querySelector('.clear__input')

        clearInputButton.addEventListener('click', (event) => handleClearInputButton(event, input))
        input.addEventListener('input', (event) => handleClearInput(event, clearInputButton))

    })
})