import '../pages/index.css';
import { buildCard, removeCard } from './card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './modal.js';
import { initialCards } from './cards.js';

const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
});

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

const popupButtonSave = document.querySelectorAll('.popup__button');
popupButtonSave.forEach(button => {
    button.addEventListener('click', function () {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});


document.addEventListener('click', closePopupOnOverlayClick);


// форма человека

const formElementProfile = document.querySelector('form[name="edit-profile"]');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
}

formElementProfile.addEventListener('submit', handleFormSubmit);


//форма карточки
const formElementCard = document.querySelector('form[name="new-place"]');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardUrl = document.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {

    evt.preventDefault();

    const cardNameValue = inputCardName.value;
    const cardUrlValue = inputCardUrl.value;

    const newCard = buildCard(
        {
            name: cardNameValue,
            link: cardUrlValue,
        },
        removeCard,
    )

    placesList.prepend(newCard);
}

formElementCard.addEventListener('submit', handleCardFormSubmit);



initialCards.forEach(cardData => {
    const card = buildCard(cardData, removeCard);
    placesList.append(card);
});

