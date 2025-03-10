import { deleteCard, updateLikeCard } from './api.js';
import { openPopup } from './modal.js';


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

export function buildCard(cardData, handleDeleteButtonClick, handleCardImageClick, handleCardLikeButtonClick, userId, deleteButton) {
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


    if (cardData.owner._id !== userId) {
        deleteButton.style.display = 'none';
    }

    return cardElement;
}


export function removeCard(cardElement, cardId) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

