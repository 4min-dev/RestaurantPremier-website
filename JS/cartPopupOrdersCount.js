document.addEventListener('DOMContentLoaded', function() {
    const cartOrders = document.querySelectorAll('.cart__order')

    cartOrders.forEach(cartOrder => {
        const removeButton = cartOrder.querySelector('.remove__quantity__button')
        const addButton = cartOrder.querySelector('.add__quantity__button')
        const amountValue = cartOrder.querySelector('.cart__order__amount__value')

        let quantity = parseInt(amountValue.textContent)

        function updateQuantity(newQuantity) {
            quantity = newQuantity
            amountValue.textContent = `${quantity} шт`

            if (quantity <= 1) {
                removeButton.disabled = true
            } else {
                removeButton.disabled = false
            }

            if (quantity >= 99) {
                addButton.disabled = true
            } else {
                addButton.disabled = false
            }
        }

        removeButton.addEventListener('click', function() {
            if (quantity > 1) {
                updateQuantity(quantity - 1)
            }
        })

        addButton.addEventListener('click', function() {
            if (quantity < 99) {
                updateQuantity(quantity + 1)
            }
        })

        updateQuantity(quantity)
    })
})