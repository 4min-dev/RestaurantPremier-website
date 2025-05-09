export default class StageManager {
    constructor(popupOverlay) {
        this.popupOverlay = popupOverlay;
        this.stages = Array.from(popupOverlay.querySelectorAll('.popup__stage'));
        this.currentStageIndex = 0;

        this.init();
    }

    init() {
        // Инициализация первого стейджа как активного
        this.stages[this.currentStageIndex].classList.add('active');

        // Находим все кнопки "Следующий стейдж" и "Предыдущий стейдж" внутри попапа
        const nextButtons = this.popupOverlay.querySelectorAll('.next__stage__button');
        const prevButtons = this.popupOverlay.querySelectorAll('.return__prev__stage__button');

        // Добавляем обработчики для кнопок
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                this.nextStage();
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                this.prevStage();
            });
        });
    }

    nextStage() {
        if (this.currentStageIndex >= this.stages.length - 1) {
            console.warn("Это последний стейдж.");
            return; // Если это последний стейдж, ничего не делаем
        }

        const currentStage = this.stages[this.currentStageIndex];
        currentStage.classList.remove('active');
        currentStage.classList.add('prev__stage');

        this.currentStageIndex++;

        const nextStage = this.stages[this.currentStageIndex];
        nextStage.classList.remove('prev__stage');
        nextStage.classList.add('active');
    }

    prevStage() {
        if (this.currentStageIndex <= 0) {
            console.warn("Это первый стейдж.");
            return; // Если это первый стейдж, ничего не делаем
        }

        const currentStage = this.stages[this.currentStageIndex];
        currentStage.classList.remove('active');

        this.currentStageIndex--;

        const prevStage = this.stages[this.currentStageIndex];
        prevStage.classList.remove('prev__stage');
        prevStage.classList.add('active');
    }

    resetStages() {
        // Сброс всех стейджей к начальному состоянию
        this.stages.forEach(stage => {
            stage.classList.remove('active', 'prev__stage');
        });

        this.currentStageIndex = 0;
        this.stages[this.currentStageIndex].classList.add('active');
    }
}