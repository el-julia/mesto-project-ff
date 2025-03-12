import { deleteCard, updateLikeCard } from './api.js';


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

    if (cardData.owner._id !== userId) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', () => {
            handleDeleteButtonClick(cardData._id, cardElement);
        });
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

