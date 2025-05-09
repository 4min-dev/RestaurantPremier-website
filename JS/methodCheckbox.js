document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.method__checkbox')

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false
                    }
                })
            }
        })

        checkbox.addEventListener('click', function () {
            if (!checkbox.checked) {
                checkbox.checked = true
            }
        })
    })
})