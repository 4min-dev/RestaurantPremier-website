document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".otp__input")

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const currentValue = e.target.value

            if (currentValue.length > 1) {
                e.target.value = currentValue[0]
            }

            if (currentValue && index < inputs.length - 1) {
                inputs[index + 1].focus()
                inputs[index].classList.add('cleared')
            } else if (e.inputType !== 'deleteContentBackward') {
                inputs[index].classList.add('cleared')
            }
        })

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
                if (index === 3 && inputs[3].value) {
                    inputs[3].focus()
                    inputs[3].classList.remove('cleared')
                } else {
                    inputs[index - 1].focus()
                    inputs[index - 1].classList.remove('cleared')
                }
            }
        })
    })
})
