
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
import { openPopup } from './modal.js';

// функция лайка

function toggleLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

//  создаю функцию добавления карточки
function buildCard(cardData, cardRemover) {
    // выбираю шаблон карточки template
    const cardTemplate = document.querySelector('#card-template').content;

    // создаю новую карточку, клонировав содержимое шаблона карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;

    imageElement.addEventListener('click', function () {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;

        openPopup(popupTypeImage);
    });

    const cardTitleElement = cardElement.querySelector('.card__title');
    cardTitleElement.textContent = cardData.name;

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);

    const resetButton = cardElement.querySelector('.card__delete-button');
    resetButton.addEventListener('click', () => {
        cardRemover(cardElement);
    });

    return cardElement;
}


//функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

export { buildCard, toggleLike, removeCard, popupTypeImage, popupImage, popupCaption };