import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  overlay,
  openOverlay,
  closeOverlay,
  renderFooter,
  enableFullscreenOn,
} from "./utils/utils.js";

const editUserButton = document.querySelector(".user__name-edit");
const addPlace = document.querySelector(".user__add-button");

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "", 
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const cardsContainer = document.querySelector(".cards");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function handleCardDeleteByName(name) {
  for (let i = 0; i < initialCards.length; i++) {
    if (initialCards[i].name === name) {
      initialCards.splice(i, 1);
      break;
    }
  }
}

function makeCard(cardData) {
  const card = new Card(cardData, ".card__template", handleCardDeleteByName);
  return card.getElement();
}

function renderInitialCards() {
  if (initialCards.length === 0) {
    cardsContainer.innerHTML = `<h2 class="cards__empty">Não há cards</h2>`;
    return;
  }

  initialCards.forEach((data) => {
    const cardElement = makeCard(data);
    cardsContainer.append(cardElement);
  });
}

function prependNewCard(data) {
  initialCards.unshift(data);
  cardsContainer.prepend(makeCard(data));
}

function activateForm(e) {
  if (e.target.closest(".user__name-edit")) {
    const node = document
      .querySelector(".form__template")
      .content.cloneNode(true);
    const form = node.querySelector(".form");

    node.querySelector(".form__title").textContent = "Editar perfil";
    form.querySelector(".form__input-name").minLength = 2;
    form.querySelector(".form__input-name").maxLength = 40;
    form.querySelector(".form__input-type").minLength = 2;
    form.querySelector(".form__input-type").maxLength = 200;
    form.setAttribute("name", "userForm");

    form.addEventListener("submit", handleProfileFormSubmit);

    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation();

    openOverlay(node);
    return;
  }

  if (e.target.closest(".user__add-button")) {
    const node = document
      .querySelector(".form__template")
      .content.cloneNode(true);
    const form = node.querySelector(".form");

    node.querySelector(".form__title").textContent = "Novo Lugar";
    form.querySelector(".form__input-name").placeholder = "Título";
    const urlInput = form.querySelector(".form__input-type");
    urlInput.placeholder = "Imagem";
    urlInput.type = "url";
    form.querySelector(".form__input-name").minLength = 2;
    form.querySelector(".form__input-name").maxLength = 30;
    form.setAttribute("name", "cardForm");

    form.addEventListener("submit", handleNewCardFormSubmit);

    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation();

    openOverlay(node);
  }
}

function closeForm() {
  closeOverlay();
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const inputName = form.querySelector(".form__input-name");
  const inputType = form.querySelector(".form__input-type");
  const nameEl = document.querySelector(".user__name-paragraph");
  const typeEl = document.querySelector(".user__type-paragraph");

  nameEl.textContent = inputName.value || nameEl.textContent;
  typeEl.textContent = inputType.value || typeEl.textContent;

  closeOverlay();
}

function handleNewCardFormSubmit(e) {
  e.preventDefault();

  console.log(document.forms.cardForm[0].validity);

  const inputPlace = document.querySelector(".form__input-name").value;
  const inputImage = document.querySelector(".form__input-type").value;

  const newCard = {
    name: inputPlace,
    link: inputImage,
  };

  prependNewCard(newCard);
  closeForm();
}

editUserButton.addEventListener("click", activateForm);
addPlace.addEventListener("click", activateForm);

renderInitialCards();
enableFullscreenOn(cardsContainer);
renderFooter();
