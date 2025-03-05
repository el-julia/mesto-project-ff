import '../pages/index.css';
import { buildCard, removeCard, toggleLike } from './card.js';
import { openPopup, closePopup, closePopupOnOverlayClick } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getusersinformation, addNewCard, updateUserData, updateAvatar, getAvatar } from './api.js';

let userId;



const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formElementProfile = document.querySelector('form[name="edit-profile"]');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupInputTypeAvatarUrl = document.querySelector('.popup__input_type_avatar_url');
const formElementAvatar = document.querySelector('form[name="update-avatar"]');


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

profileImage.addEventListener('click', function () {
    popupInputTypeAvatarUrl.value = profileImage.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, ''); // Очищаем значение
    clearValidation(popupTypeEditAvatar, validationConfig);
    openPopup(popupTypeEditAvatar);
});

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = popupInputTypeAvatarUrl.value.trim();

    // Отправляем запрос на сервер
    updateAvatar(avatarUrl)
        .then((data) => {
            console.log("avatar", data)
            // Обновляем аватар на странице, используя данные из ответа сервера
            profileImage.style.backgroundImage = `url("${data.avatar}")`;
            formElementAvatar.reset();
            closePopup(evt.target.closest('.popup'));
        })
        .catch((err) => {
            console.log(err); // Логируем ошибку, если что-то пошло не так
        });
}

formElementAvatar.addEventListener('submit', handleAvatarFormSubmit);

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(popupTypeEdit, validationConfig);
    openPopup(popupTypeEdit);
});


const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
    clearValidation(popupTypeNewCard, validationConfig);
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


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    updateUserData(nameValue, jobValue)
        .then((newProfil) => {
            console.log("Добавлен новый пользователь", newProfil)
            profileTitle.textContent = nameValue;
            profileDescription.textContent = jobValue;
            formElementProfile.reset();
            closePopup(evt.target.closest('.popup'));
        })
        .catch((err) => {
            console.log(err);
        });

}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);


const formElementCard = document.querySelector('form[name="new-place"]');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardUrl = document.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {

    evt.preventDefault();

    const cardNameValue = inputCardName.value;
    const cardUrlValue = inputCardUrl.value;

    addNewCard(cardNameValue, cardUrlValue)
        .then((newNewCard) => {
            console.log("Добавлена новая карточка", newNewCard)
            const newCard = buildCard(
                newNewCard,
                removeCard,
                handleCardImageClick,
                toggleLike,
                userId,

            )

            placesList.prepend(newCard);
            formElementCard.reset();
            closePopup(evt.target.closest('.popup'));

        })
        .catch((err) => {
            console.log(err);
        });

}

formElementCard.addEventListener('submit', handleCardFormSubmit);


function handleCardImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupTypeImage);
}


//включаем валидацию
enableValidation(validationConfig);


// подключаем карточки с сервера
getInitialCards()
    .then((result) => {
        result.forEach(cardData => {
            const card = buildCard(cardData, removeCard, handleCardImageClick, toggleLike, userId);
            placesList.append(card);
        })
    })

    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });

// подключаем данные пользователя
getusersinformation()
    .then((result) => {
        // console.log("user", result);
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
    })

    .catch((err) => {
        console.log(err);
    });

getAvatar()
    .then((result) => {
        console.log(result);
        profileImage.style.backgroundImage = `url("${result.avatar}")`;
    })
    .catch((err) => {
        console.log(err);
    });
