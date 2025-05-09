document.addEventListener("DOMContentLoaded", () => {
    const orderPopup = document.querySelector('#order__popup__overlay');
    const verifyStage = document.querySelector('.sms__verify__stage');
    const verifyPhoneNumber = document.querySelector('.verify__number__value')
    const getPhoneCodeButton = document.querySelector('.get__phone__code__button')
    const stageHeading = verifyStage.querySelector('.order__popup__sms__verify__stage__heading');
    const getCodeButton = document.querySelector('.get__new__code')
    const returnButton = stageHeading.querySelector('.return__prev__stage__button');
    const closePopupButton = stageHeading.querySelector('.close__popup__button');
    const headingTextContainer = stageHeading.querySelector('.popup__heading__text__container');
    const stageOrderPopupTitle = document.querySelector('.order__popup__title')
    const stageOrderPopupDescription = document.querySelector('.order__popup__verify__number')
    const stageDescription = headingTextContainer.querySelector('.popup_description');
    const verifyButtons = document.querySelectorAll('.verify__button');
    const otpContainer = verifyStage.querySelector('.otp__container');
    const stageOrderPopupOtpContainer = document.querySelector('.otp__container__order__popup')
    const otpInputs = document.querySelectorAll('.otp__wrapper__without__button');
    const otpInputsArray = [...otpInputs];
    const stageFooter = verifyStage.querySelector('.stage__sms__verify__footer');
    const orderPopupStageFooter = document.querySelector('.stage__sms__order__popup__footer')

    // Функция для отображения сообщения об ошибке
    function handleErrorMessage() {
        verifyStage.classList.add('error__stage');
        orderPopup.setAttribute('data-status', 'not-verifyed');
        returnButton.classList.remove('flex');
        returnButton.classList.add('removed');
        closePopupButton.classList.remove('flex');
        closePopupButton.classList.add('removed');

        orderPopupStageFooter.classList.remove('flex');
        orderPopupStageFooter.classList.add('removed');

        stageOrderPopupTitle.textContent = 'Упс... Что то пошло не так';
        stageOrderPopupDescription.textContent = 'Текст ошибки.';

        stageOrderPopupOtpContainer.querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.remove('flex'));
        stageOrderPopupOtpContainer.querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.add('removed'));
        stageOrderPopupOtpContainer.querySelector('.close__popup__button').classList.add('visible');
    }

    // Функция для отображения сообщения об успехе
    function handleSuccessMessage() {
        verifyStage.classList.add('success__stage');
        orderPopup.setAttribute('data-status', 'verifyed');
        returnButton.classList.add('removed');

        orderPopupStageFooter.classList.remove('flex')
        orderPopupStageFooter.classList.add('removed')

        stageOrderPopupTitle.textContent = 'Ваш заказ в обработке';
        stageOrderPopupDescription.textContent = 'Мы вам перезвоним';

        document.querySelector('.otp__container__order__popup').querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.remove('flex'));
        document.querySelector('.otp__container__order__popup').querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.add('removed'));

        // Создание SVG элемента
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "40");
        svg.setAttribute("viewBox", "0 0 40 40");
        svg.setAttribute("fill", "none");

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("width", "40");
        rect.setAttribute("height", "40");
        rect.setAttribute("rx", "20");
        rect.setAttribute("fill", "#2ECC2E");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M11.5 20L17.1671 26L28.5 14");
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        svg.appendChild(rect);
        svg.appendChild(path);
        svg.classList.add('success__added__svg');

        document.querySelector('.otp__container__order__popup').appendChild(svg);
    }

    function handleSuccessLogin(phoneNumber) {
        verifyStage.classList.add('success__stage');
        orderPopup.setAttribute('data-status', 'verifyed');
        returnButton.classList.add('removed');

        if (stageFooter) {
            stageFooter.classList.remove('flex');
            stageFooter.classList.add('removed');
        } else {
            getCodeButton.classList.remove('flex')
            getCodeButton.classList.add('removed')
        }

        stageDescription.textContent = `${phoneNumber}`;

        otpContainer.querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.remove('flex'));
        otpContainer.querySelectorAll('.otp__wrapper').forEach((otpWrapper) => otpWrapper.classList.add('removed'));

        // Создание SVG элемента
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "40");
        svg.setAttribute("viewBox", "0 0 40 40");
        svg.setAttribute("fill", "none");

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("width", "40");
        rect.setAttribute("height", "40");
        rect.setAttribute("rx", "20");
        rect.setAttribute("fill", "#2ECC2E");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M11.5 20L17.1671 26L28.5 14");
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        svg.appendChild(rect);
        svg.appendChild(path);
        svg.classList.add('success__added__svg');

        otpContainer.appendChild(svg);

        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    // Функция для валидации OTP
    function handleValidateOtp(isLogin, phoneNumber, allFilled) {
        if (!allFilled) {
            handleErrorMessage(); // Если не все инпуты заполнены, показываем ошибку
        } else if (isLogin) {
            handleSuccessLogin(phoneNumber.textContent); // Если все инпуты заполнены, показываем успех
        } else {
            handleSuccessMessage(); // Если все инпуты заполнены, показываем успех
        }
    }

    // Автоматическая проверка при вводе
    otpInputsArray.forEach(otpInput => {
        console.log(otpInput)
        otpInput.querySelector('.otp__input').addEventListener('input', (e) => {

            const allFilled = otpInputsArray.every(otp => otp.querySelector('.otp__input').value.trim() !== '');

            if (!e.target.classList.contains('activate__without__button') && !allFilled) {
                return; // Если не все инпуты заполнены и режим "без кнопки" не активирован, ничего не делаем
            } else if (allFilled) {
                handleValidateOtp(true, verifyPhoneNumber, allFilled); // Если все инпуты заполнены, вызываем валидацию
            }
        });
    });

    // Обработка клика по кнопке проверки
    verifyButtons.forEach(verifyButton => verifyButton.addEventListener('click', () => handleValidateOtp(false, null, [...document.querySelectorAll('.otp__wrapper__with__button')].every(otp => otp.querySelector('.otp__input').value.trim() !== ''))));
    getPhoneCodeButton.addEventListener('click', () => {
        stageDescription.textContent = verifyPhoneNumber
    })
});