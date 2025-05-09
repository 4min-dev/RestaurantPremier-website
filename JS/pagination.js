document.addEventListener('DOMContentLoaded', function () {
    const leftButton = document.querySelector('.to__left')
    const rightButton = document.querySelector('.to__right')
    const availabilityNavbar = document.querySelector('.time__stage__availability__navbar')
    const list = document.querySelector('.pagination__wrapper')
    const listItems = document.querySelectorAll('.pagination__element')
    const itemWidth = listItems[0].offsetWidth
    const visibleItemsCount = Math.floor(list.clientWidth / itemWidth)
    let currentIndex = 0

    function updateButtonVisibility() {
        if (currentIndex === 0) {
            leftButton.classList.remove('visible')
            availabilityNavbar.classList.remove('not__first')
        } else {
            leftButton.classList.add('visible')
            availabilityNavbar.classList.add('not__first')
        }

        if (currentIndex >= listItems.length - (visibleItemsCount - 1)) {
            rightButton.classList.remove('visible')
        } else {
            rightButton.classList.add('visible')
        }
    }

    // Функция для сдвига влево
    function moveLeft() {
        if (currentIndex > 0) {
            currentIndex--
            list.style.transform = `translateX(-${(itemWidth + 50) * currentIndex}px)`
            updateButtonVisibility()
        }
    }

    // Функция для сдвига вправо
    function moveRight() {
        console.log(currentIndex)
        console.log(listItems.length)
        console.log(visibleItemsCount)

        if (currentIndex < listItems.length - (visibleItemsCount - 1)) {
            currentIndex++
            list.style.transform = `translateX(-${(itemWidth + 50) * currentIndex}px)`
            updateButtonVisibility()
        }
    }

    leftButton.addEventListener('click', moveLeft)
    rightButton.addEventListener('click', moveRight)

    updateButtonVisibility()
})


document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.pagination__time__navbar__button');
    const navbar = document.querySelector('.time__stage__availability__navbar');

    if (button && navbar) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (button.classList.contains('visible')) {
                        navbar.classList.add('time__stage__availability__navbar__first');
                    } else {
                        navbar.classList.remove('time__stage__availability__navbar__first');
                    }
                }
            });
        });

        observer.observe(button, {
            attributes: true // отслеживаем изменения атрибутов
        });
    }
});