document.addEventListener('DOMContentLoaded', function() {
    const clearCartButton = document.querySelector('.clear__cart__button')

    const cartOrdersContainer = document.querySelector('.cart__orders__container')

    const emptyCartMessage = document.querySelector('.cart__empty__message')

    function updateCartState() {
        const hasItems = cartOrdersContainer.querySelector('.cart__order') !== null

        if (hasItems) {
            clearCartButton.style.display = 'block'
            emptyCartMessage.style.display = 'none'
        } else {
            clearCartButton.style.display = 'none'
            emptyCartMessage.style.display = 'block'
        }
    }

    clearCartButton.addEventListener('click', function() {
        while (cartOrdersContainer.firstChild) {
            cartOrdersContainer.removeChild(cartOrdersContainer.firstChild)
        }

        updateCartState()

        console.log('Корзина очищена')
    })

    updateCartState()
})