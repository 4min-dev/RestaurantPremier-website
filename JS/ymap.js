function debounce(func, ms) {
    let timeout

    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, arguments), ms)
    }
}

ymaps.ready(init)

function init() {
    const ymapContainers = document.querySelectorAll('.ymap__container')

    if (!ymapContainers.length) {
        console.error("Контейнеры для карт не найдены.")
        return
    }

    // Функция для получения геолокации пользователя
    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Геолокация не поддерживается вашим браузером.")
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve([position.coords.latitude, position.coords.longitude])
                    },
                    (error) => {
                        reject(`Ошибка при получении геолокации: ${error.message}`)
                    }
                )
            }
        })
    }

    ymapContainers.forEach((container, index) => {
        const addressInputContainer = container.closest('.popup__stage').querySelector('.address__input__container')
        const addressInputPlaceholder = addressInputContainer.querySelector('.input__name')
        const addressInput = addressInputContainer.querySelector('.address__input')
        const clearButton = addressInputContainer.querySelector('.clear__input__button')

        getUserLocation()
            .then((userCoords) => {
                const myMap = new ymaps.Map(container, {
                    center: userCoords,
                    zoom: 15,
                    controls: []
                })

                myMap.controls.remove('geolocationControl')
                myMap.controls.remove('searchControl')
                myMap.controls.remove('trafficControl')
                myMap.controls.remove('typeSelector')
                myMap.controls.remove('fullscreenControl')
                myMap.controls.remove('zoomControl')
                myMap.controls.remove('rulerControl')

                const customCursor = new ymaps.Placemark(userCoords, {}, {
                    iconLayout: 'default#image',
                    iconImageHref: '../static/img/gps.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-15, -42]
                })
                myMap.geoObjects.add(customCursor)

                // Функция геокодирования адреса и обновления карты
                const geocodeAddressAndUpdateMap = async (address) => {
                    try {
                        const res = await ymaps.geocode(address)
                        const firstGeoObject = res.geoObjects.get(0)
                        if (firstGeoObject) {
                            const coords = firstGeoObject.geometry.getCoordinates()
                            myMap.setCenter(coords)
                            customCursor.geometry.setCoordinates(coords)
                            addressInputPlaceholder.classList.add('translated')
                        } else {
                            console.warn("Адрес не найден.")
                        }
                    } catch (error) {
                        console.error("Ошибка при геокодировании адреса:", error)
                    }
                }

                const debouncedUpdateMap = debounce((inputValue) => {
                    if (inputValue.trim()) {
                        geocodeAddressAndUpdateMap(inputValue)
                    }
                }, 700)

                function handleAddressInput(event) {
                    const inputValue = event.target.value
                    debouncedUpdateMap(inputValue)
                }

                addressInput.addEventListener('input', handleAddressInput)

                // Перемещение курсора при клике по карте
                myMap.events.add('click', (e) => {
                    const coords = e.get("coords")
                    customCursor.geometry.setCoordinates(coords)

                    ymaps.geocode(coords).then((res) => {
                        const firstGeoObject = res.geoObjects.get(0)
                        if (firstGeoObject) {
                            addressInput.value = firstGeoObject.getAddressLine()
                            addressInputPlaceholder.classList.add('translated')
                        }
                    })
                })

                // Центрирование курсора при перемещении карты
                myMap.events.add('actionend', () => {
                    const center = myMap.getCenter()
                    customCursor.geometry.setCoordinates(center)

                    ymaps.geocode(center).then((res) => {
                        const firstGeoObject = res.geoObjects.get(0)
                        if (firstGeoObject) {
                            addressInput.value = firstGeoObject.getAddressLine()
                            addressInputPlaceholder.classList.add('translated')
                        }
                    })

                    if (!clearButton.classList.contains('visible')) {
                        clearButton.classList.add('visible')
                    }
                })

                clearButton.addEventListener('click', (event) => event.currentTarget.classList.remove('visible'))
            })
            .catch((error) => {
                console.error(error)
                // Если геолокация недоступна, используем дефолтные корды
                const defaultCoords = [55.751244, 37.618423] // Корды Москвы, можно будет поменять на любой другой город
                const myMap = new ymaps.Map(container, {
                    center: defaultCoords,
                    zoom: 10,
                    controls: []
                })

                const customCursor = new ymaps.Placemark(defaultCoords, {}, {
                    iconLayout: 'default#image',
                    iconImageHref: '../static/img/gps.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-15, -42]
                })
                myMap.geoObjects.add(customCursor)
            })
    })
}