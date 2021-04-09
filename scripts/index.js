const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const userName = content.querySelector('.profile__name');
const userDescription = content.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup_type_edit');
const popupInputName = popupEdit.querySelector('.popup__input_type_name');
const popupInputDescription = popupEdit.querySelector('.popup__input_type_description');
const editForm = popupEdit.querySelector('.popup__form_type_edit');
const closeEditPopupBtn = popupEdit.querySelector('.popup__close');

const popupAdd = document.querySelector('.popup_type_add');
const placeName = popupAdd.querySelector('.popup__input_type_text');
const placeImageSrc = popupAdd.querySelector('.popup__input_type_link');
const closeAddPopupBtn = popupAdd.querySelector('.popup__close');
const addForm = popupAdd.querySelector('.popup__form');

const popupImage = document.querySelector('.popup_type_image');
const closeImagePopupBtn = popupImage.querySelector('.popup__close');
const frame = popupImage.querySelector('.popup__image')
const caption = popupImage.querySelector('.popup__caption')

const cardsWrapper = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function setProfileInfo(event) {
    event.preventDefault();

    userName.textContent = popupInputName.value;
    userDescription.textContent = popupInputDescription.value;

    closePopup(closeEditPopupBtn);
}

function getProfileInfo() {
    popupInputName.value = userName.textContent;
    popupInputDescription.value = userDescription.textContent;
}

function openPopup(popupName) {
    popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
}

function setImagePopupInfo(src, name) {
    frame.src = src;
    caption.textContent = name;
}

function createCard(src, text) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-btn');
    const likeBtn = cardElement.querySelector('.card__button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__name');

    cardImage.src = src;
    cardName.textContent = text;

    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.card');
        cardItem.remove();
    });

    likeBtn.addEventListener('click', (event) => {
        const eventTarget = event.target;
        eventTarget.classList.toggle('card__button_active');
    });

    cardImage.addEventListener('click', () => {
        setImagePopupInfo(cardImage.src, cardName.textContent);
        openPopup(popupImage);
    });

    return cardElement;
}

function renderCard(card) {
    cardsWrapper.prepend(card);
}

function renderAllCards() {
    initialCards.reverse().forEach((card) => {
        renderCard(createCard(card.link, card.name));
    });
}

renderAllCards();

editButton.addEventListener('click', () => {
    getProfileInfo();
    openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

closeAddPopupBtn.addEventListener('click', () => {
    closePopup(popupAdd);
});

closeEditPopupBtn.addEventListener('click', () => {
    closePopup(popupEdit);
});

closeImagePopupBtn.addEventListener('click', () => {
    closePopup(popupImage);
});

editForm.addEventListener('submit', setProfileInfo);

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    renderCard(createCard(placeImageSrc.value, placeName.value));
    closePopup(closeAddPopupBtn);

    placeImageSrc.value = '';
    placeName.value = '';
});