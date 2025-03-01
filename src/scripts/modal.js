import { validationConfig } from "./index.js";
import { clearValidation } from "./validation.js"

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
}


export function closePopup(popupElement) {
    clearValidation(popupElement.querySelector('.popup__form'), validationConfig);
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
}


export function closeOnEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

export function closePopupOnOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}
