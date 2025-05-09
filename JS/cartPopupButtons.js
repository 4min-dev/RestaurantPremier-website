document.addEventListener("DOMContentLoaded", function () { 
    const cartPopupOverlay = document.querySelector('#catalog__profile__popup__overlay')
    const cartPopupButtons = document.querySelectorAll('.profile__link__card')

    function handleClosePopup() {
        cartPopupOverlay.classList.remove('visible')
        cartPopupOverlay.classList.add('closing')
console.log(cartPopupOverlay)
        setTimeout(() => {
            cartPopupOverlay.classList.remove('closing')
        }, 400);
    }

    cartPopupButtons.forEach(cartPopupButtons => cartPopupButtons.addEventListener('click', handleClosePopup))
})