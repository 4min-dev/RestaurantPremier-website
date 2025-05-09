document.addEventListener("DOMContentLoaded", () => { 
    const requestForm = document.querySelector('.request__form')
    const requestFormInputs = requestForm.querySelector('.inputs__container').querySelectorAll('.request__input')
    const error__input = requestForm.querySelector('.error__input')
    const requestFormButton = requestForm.querySelector('.request__button')

    function handleValidationEmptyInputs() {
        const inputsArray = Array.from(requestFormInputs)
        
        if (inputsArray.some((el) => el.value === '')) {
            error__input.classList.add('visible')
        } else {
            error__input.classList.remove('visible')
        }
    }

    requestFormButton.addEventListener('click', handleValidationEmptyInputs)
})
