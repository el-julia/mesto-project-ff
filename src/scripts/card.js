import { deletCard, updateLikeCard } from './api.js';

export function toggleLike(event, cardData, userId) {

    const isLiked = cardData.likes.some(like => like._id === userId);

    updateLikeCard(cardData._id, isLiked)
        .then((updatedCard) => {
            cardData.likes = updatedCard.likes; // обновляем данные лайков
            event.target.classList.toggle('card__like-button_is-active', !isLiked);
            event.target.nextElementSibling.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function buildCard(cardData, handleCardDeleteButtonClick, handleCardImageClick, handleCardLikeButtonClick, userId) {
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


    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData.owner._id !== "ad5ad4feacfe8216f8d53be6") {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => {
            handleCardDeleteButtonClick(cardElement, cardData);
        });
    }

    return cardElement;
}


export function removeCard(cardElement, cardData) {

    deletCard(cardData._id)
        .then((card) => {
            console.log("удалаяем", card)
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}
