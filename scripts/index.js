//  создаю функцию добавления карточки
function addCard(cardTitle, imageLink, cardRemover) {
    // выбираю шаблон карточки template
    const cardTemplate = document.querySelector('#card-template').content;

    // создаю новую карточку, клонировав содержимое шаблона карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = imageLink;
    imageElement.alt = cardTitle;

    const cardTitleElement = cardElement.querySelector('.card__title');
    cardTitleElement.textContent = cardTitle;
    const resetButton = cardElement.querySelector('.card__delete-button');

    resetButton.addEventListener('click', function () {
        cardRemover(cardElement);
    });

    //добавляю новую карточку в конец контейнера с карточками
    const placesList = document.querySelector('.places__list');
    placesList.append(cardElement);
}

function removeCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(card => {
    addCard(card.name, card.link, removeCard);
});




