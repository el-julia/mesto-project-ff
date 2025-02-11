
//  функция открытие попап окна
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
}

//  функция закрытия попап окна

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
}
//  функция закрытия попап окна ESC
function closeOnEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function closePopupOnOverlayClick(event) {
    // Проверяем, был ли клик на элементе с классом 'popup' (оверлей)
    if (event.target.classList.contains('popup')) {
        closePopup(event.target); // Закрываем попап
    }
}

export { openPopup, closePopup, closeOnEscape, closePopupOnOverlayClick };
