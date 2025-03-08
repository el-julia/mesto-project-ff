import { deletCard, updateLikeCard } from './api.js';
import { openPopup, closePopup } from './modal.js';
export function toggleLike(event, cardData, userId) {
    const isLiked = cardData.likes.some(like => like._id === userId);

    updateLikeCard(cardData._id, isLiked)
        .then((updatedCard) => {
            cardData.likes = updatedCard.likes;
            event.target.classList.toggle('card__like-button_is-active', !isLiked);
            event.target.nextElementSibling.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function buildCard(cardData, handleDeleteButtonClick, handleCardImageClick, handleCardLikeButtonClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;


    imageElement.addEventListener('click', () => handleCardImageClick(cardData));


    const cardTitleElement = cardElement.querySelector('.card__title');
    cardTitleElement.textContent = cardData.name;

    const likeButton = cardElement.querySelector('.card__like-button');
    const isLiked = cardData.likes.some(like => like._id === userId);
    likeButton.classList.toggle('card__like-button_is-active', isLiked);
    likeButton.addEventListener('click', (event) => {
        handleCardLikeButtonClick(event, cardData, userId);
    });

    const cardLikeSum = cardElement.querySelector('.card__like-sum');
    cardLikeSum.textContent = cardData.likes.length;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const popupTypeAgreementTemplate = document
        .querySelector('#popup_delete-agreement-template')
        .content
        .querySelector('.popup');

    if (cardData.owner._id !== userId) {
        cardDeleteButton.style.display = 'none';
    } else {
        const popupTypeAgreement = popupTypeAgreementTemplate.cloneNode(true);
        const popupButtonAgreement = popupTypeAgreement.querySelector('.popup__button-agreement');
        document.body.append(popupTypeAgreement);

        cardDeleteButton.addEventListener('click', () => {
            popupButtonAgreement.addEventListener('click', (evt) => {
                handleDeleteButtonClick(cardElement, cardData);
                closePopup(popupTypeAgreement);
                popupTypeAgreement.remove();
            });
            openPopup(popupTypeAgreement);
        });
    }

    return cardElement;
}




export function removeCard(cardElement, cardData) {
    deletCard(cardData._id)
        .then((card) => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

