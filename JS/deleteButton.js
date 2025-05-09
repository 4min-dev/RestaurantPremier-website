document.addEventListener('DOMContentLoaded', function () { 
    const removableElementContainers = document.querySelectorAll('.removable__element');
    
    function handleRemoveElement(removableElement) {
        if(removableElement) {
            removableElement.remove();
        }
    }

    // Итерируем по всем контейнерам с кнопками удаления
    removableElementContainers.forEach((removableElementContainer) => {
        const deleteButton = removableElementContainer.querySelector('.remove__button');
        
        // Добавляем обработчик события на кнопку
        deleteButton.addEventListener('click', () => handleRemoveElement(removableElementContainer));
    });
});
