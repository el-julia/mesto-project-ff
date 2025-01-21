const placesList = document.querySelector('.places__list');

//  создаю функцию добавления карточки
function buildCard(cardData, cardRemover) {
    // выбираю шаблон карточки template
    const cardTemplate = document.querySelector('#card-template').content;

    // создаю новую карточку, клонировав содержимое шаблона карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;

    const cardTitleElement = cardElement.querySelector('.card__title');
    cardTitleElement.textContent = cardData.name;
    const resetButton = cardElement.querySelector('.card__delete-button');

    resetButton.addEventListener('click', () => {
        cardRemover(cardElement);
    });

    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(cardData => {
    const card = buildCard(cardData, removeCard);
    placesList.append(card);
});