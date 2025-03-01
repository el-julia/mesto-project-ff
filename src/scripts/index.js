import '../pages/index.css';
import { buildCard, removeCard, toggleLike } from './card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './modal.js';
import { initialCards } from './cards.js';


const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formElementProfile = document.querySelector('form[name="edit-profile"]');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
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

document.addEventListener('click', closePopupOnOverlayClick);


const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');




function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    formElementProfile.reset();
    closePopup(evt.target.closest('.popup'));

}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);


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
        handleCardImageClick,
        toggleLike,
    )

    placesList.prepend(newCard);
    formElementCard.reset();
    closePopup(evt.target.closest('.popup'));
}

formElementCard.addEventListener('submit', handleCardFormSubmit);


function handleCardImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupTypeImage);
}

initialCards.forEach(cardData => {
    const card = buildCard(cardData, removeCard, handleCardImageClick, toggleLike);
    placesList.append(card);
});

//7


//7 функция которая добавляет класс с ошибкой. красное поле
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

//7 функция которая удаляет класс с ошибкой. красное поле
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

//7 функция которая проверяет валидность
function checkInputValidity(formElement, inputElement) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
    hideInputError(formElement, inputElement);
    }
};

//7 функция которая вешает слушателя на каждый инпут
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
//7 функция которая 
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};
//7 
enableValidation();

//7 функция которая 
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

hasInvalidInput(inputList);

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('.popup__button-inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('.popup__button-inactive');
    }
};