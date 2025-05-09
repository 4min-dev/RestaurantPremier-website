document.addEventListener("DOMContentLoaded", () => { 
    const verifyPhoneNumberInputs = document.querySelectorAll('.verify__phone__number__input');
    const verifyNumberValues = document.querySelectorAll('.verify__number__value');
    const updateVerifyNumberValueButtons = document.querySelectorAll('.get__phone__code__button');

    function handlePushVerifyNumberValue(event) {
        console.log(event.currentTarget)
        const button = event.currentTarget;
        const phoneNumber = verifyPhoneNumberInputs[button.getAttribute('data-id') - 1].value;

        if (phoneNumber) {
            verifyNumberValues[button.getAttribute('data-id') - 1].textContent = phoneNumber;
        }
    }

    function updateButtonState(input) {
        const dataId = input.getAttribute('data-id');
        const button = updateVerifyNumberValueButtons[dataId - 1];

        console.log(button)
        if (input.value.length === 16) {
            button.removeAttribute('disabled');
            button.addEventListener('click', handlePushVerifyNumberValue);
        } else {
            button.setAttribute('disabled', 'true');
            button.removeEventListener('click', handlePushVerifyNumberValue);
        }
    }

    verifyPhoneNumberInputs.forEach((input) => {
        const dataId = input.getAttribute('data-id');
        updateButtonState(input); // Проверить состояние кнопки при загрузке
        input.addEventListener('input', () => updateButtonState(input)); // Проверять при изменении значения
    });
});
