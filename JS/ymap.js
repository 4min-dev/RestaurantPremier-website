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

    const kurskBounds = [
        [51.609, 36.058], // Юго-запад Курска
        [51.811, 36.318]  // Северо-восток Курска
    ]
    const kurskCenter = [51.730, 36.193] // Центр Курска

    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Геолокация не поддерживается вашим браузером.")
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const coords = [position.coords.latitude, position.coords.longitude]
                        // Проверка, находится ли пользователь в пределах Курска
                        if (coords[0] >= kurskBounds[0][0] && coords[0] <= kurskBounds[1][0] &&
                            coords[1] >= kurskBounds[0][1] && coords[1] <= kurskBounds[1][1]) {
                            resolve(coords)
                        } else {
                            resolve(kurskCenter) // Если вне Курска, возвращаем центр Курска
                        }
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
                    controls: [],
                    restrictMapArea: kurskBounds // Ограничение области карты Курском
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

                const geocodeAddressAndUpdateMap = async (address) => {
                    try {
                        const res = await ymaps.geocode(`Курск, ${address}`)
                        const firstGeoObject = res.geoObjects.get(0)
                        if (firstGeoObject) {
                            const coords = firstGeoObject.geometry.getCoordinates()
                            // Проверка, что координаты находятся в пределах Курска
                            if (coords[0] >= kurskBounds[0][0] && coords[0] <= kurskBounds[1][0] &&
                                coords[1] >= kurskBounds[0][1] && coords[1] <= kurskBounds[1][1]) {
                                myMap.setCenter(coords)
                                customCursor.geometry.setCoordinates(coords)
                                addressInputPlaceholder.classList.add('translated')
                            } else {
                                myMap.setCenter(coords)
                                alert("Адрес находится за пределами Курска.")
                            }
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

                myMap.events.add('click', (e) => {
                    const coords = e.get("coords")
                    if (coords[0] >= kurskBounds[0][0] && coords[0] <= kurskBounds[1][0] &&
                        coords[1] >= kurskBounds[0][1] && coords[1] <= kurskBounds[1][1]) {
                        customCursor.geometry.setCoordinates(coords)
                        ymaps.geocode(coords).then((res) => {
                            const firstGeoObject = res.geoObjects.get(0)
                            if (firstGeoObject) {
                                addressInput.value = firstGeoObject.getAddressLine()
                                addressInputPlaceholder.classList.add('translated')
                            }
                        })
                    }
                })

                myMap.events.add('actionend', () => {
                    const center = myMap.getCenter()
                    if (center[0] >= kurskBounds[0][0] && center[0] <= kurskBounds[1][0] &&
                        center[1] >= kurskBounds[0][1] && center[1] <= kurskBounds[1][1]) {
                        customCursor.geometry.setCoordinates(center)
                        ymaps.geocode(center).then((res) => {
                            const firstGeoObject = res.geoObjects.get(0)
                            if (firstGeoObject) {
                                addressInput.value = firstGeoObject.getAddressLine()
                                addressInputPlaceholder.classList.add('translated')
                            }
                        })
                    } else {
                        myMap.setCenter(kurskCenter)
                        customCursor.geometry.setCoordinates(kurskCenter)
                    }

                    if (!clearButton.classList.contains('visible')) {
                        clearButton.classList.add('visible')
                    }
                })

                clearButton.addEventListener('click', (event) => event.currentTarget.classList.remove('visible'))
            })
            .catch((error) => {
                console.error(error)
                const myMap = new ymaps.Map(container, {
                    center: kurskCenter,
                    zoom: 10,
                    controls: [],
                    restrictMapArea: kurskBounds
                })

                const customCursor = new ymaps.Placemark(kurskCenter, {}, {
                    iconLayout: 'default#image',
                    iconImageHref: '../static/img/gps.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-15, -42]
                })
                myMap.geoObjects.add(customCursor)
            })
    })
}