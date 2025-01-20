// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const placesItem = placesList.querySelector('.places__item');



// // создаю функцию добавления карточки (функция которая принимает данные одной карточки)
function addCard(name, link, removeCard) {

    // выбираю шаблон карточки template
    const cardTemplate = document.querySelector('#card-template').content;

    // создаю новую карточку, клонировав содержимое шаблона карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = link;
    imageElement.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    const resetButton = cardElement.querySelector('.card__delete-button');

    resetButton.addEventListener('click', function () {
        removeCard(cardElement)
    });


    //добавляем новую карточку в конец контейнера с карточками
    placesList.append(cardElement);
}

function removeCard(cardElement) {
    cardElement.remove()
}

initialCards.forEach(card => {
    addCard(card.name, card.link, removeCard);
});




