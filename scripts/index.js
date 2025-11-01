import {
  enableValidation,
  setEventListeners,
  resetValidation,
} from "./validate.js";

const editUserButton = document.querySelector(".user__name-edit");
const addPlace = document.querySelector(".user__add-button");
const overlay = document.querySelector(".overlay");
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "", // você está usando apenas disabled
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

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

function showFullscreenImage() {
  document.querySelector(".cards").addEventListener("click", (e) => {
    if (e.target.closest(".card__image")) {
      const clickedCard = e.target.closest(".card");
      const image = clickedCard.querySelector(".card__image").src;
      const name = clickedCard.querySelector(
        ".card__text-paragraph"
      ).textContent;

      console.log(image, name); //feito

      const fullscreenImage = document
        .querySelector(".fullscreen__template")
        .content.cloneNode(true);

      fullscreenImage.querySelector(".fullscreen__image").src = image;
      fullscreenImage.querySelector(".fullscreen__name").textContent = name;
      overlay.append(fullscreenImage);
      overlay.classList.add("overlay_active");
      closeFullscreenImage();
    }
  });
}

function closeFullscreenImage() {
  document.querySelector(".overlay").addEventListener("click", (e) => {
    if (e.target.closest(".fullscreen__delete-button")) {
      overlay.innerHTML = "";
      overlay.classList.remove("overlay_active");
    }
  });
}

function activateForm(e) {
  if (e.target.closest(".user__name-edit")) {
    const userForm = document
      .querySelector(".form__template")
      .content.cloneNode(true);

    const formElement = userForm.querySelector(".form");
    const closeFormButton = userForm.querySelector(".form__close-button");

    formElement.addEventListener("submit", handleProfileFormSubmit);
    closeFormButton.addEventListener("click", closeForm);

    formElement.querySelector(".form__input-name").minlength = 2;
    formElement.querySelector(".form__input-name").maxlength = 40;
    formElement.querySelector(".form__input-type").minlength = 2;
    formElement.querySelector(".form__input-type").maxlength = 200;
    formElement.setAttribute("name", "userForm");

    overlay.innerHTML = "";
    overlay.append(userForm);
    setEventListeners(formElement, config);

    overlay.classList.add("overlay_active");
  } else if (e.target.closest(".user__add-button")) {
    const newCardForm = document
      .querySelector(".form__template")
      .content.cloneNode(true);

    newCardForm.querySelector(".form__title").textContent = "Novo Lugar";
    newCardForm.querySelector(".form__input-name").placeholder = "Título";
    newCardForm.querySelector(".form__input-type").placeholder = "Imagem";

    const formElement = newCardForm.querySelector(".form");
    const closeFormButton = newCardForm.querySelector(".form__close-button");

    formElement.querySelector(".form__input-type").type = "url";
    formElement.querySelector(".form__input-name").minlength = 2;
    formElement.querySelector(".form__input-name").maxlength = 30;
    formElement.setAttribute("name", "cardForm");

    formElement.addEventListener("submit", handleNewCardFormSubmit);
    closeFormButton.addEventListener("click", closeForm);

    overlay.innerHTML = "";
    overlay.append(newCardForm);
    setEventListeners(formElement, config);

    overlay.classList.add("overlay_active");
  }
}

function closeForm(e) {
  const formElement = overlay.querySelector(config.formSelector);
  if (overlay.classList.contains("overlay_active")) {
    overlay.classList.remove("overlay_active");
    overlay.innerHTML = "";
  }
  if (formElement) {
    resetValidation(formElement, config);
  }
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  const inputName = document.querySelector(".form__input-name");
  const inputType = document.querySelector(".form__input-type");
  const currentUserName = document.querySelector(".user__name-paragraph");
  const currentUserType = document.querySelector(".user__type-paragraph");

  if (!inputName.value) {
    inputName.value = currentUserName.innerHTML;
  }

  if (!inputType.value) {
    inputType.value = currentUserType.innerHTML;
  }

  currentUserName.textContent = inputName.value;
  currentUserType.textContent = inputType.value;

  closeForm();
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

  initialCards.unshift(newCard);

  closeForm();
  renderCards();
}

function createCards(name, link) {
  const templateCard = document.querySelector(".card__template").content;

  const cardElement = templateCard.cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__text-paragraph").textContent = name;

  return cardElement;
}

function renderCards() {
  const cardsContainer = document.querySelector(".cards");

  if (cardsContainer.children.length === 0) {
    initialCards.forEach((card) => {
      const cardElement = createCards(card.name, card.link);
      cardsContainer.append(cardElement);
    });
  } else {
    const card = initialCards[0];
    const cardElement = createCards(card.name, card.link);
    cardsContainer.prepend(cardElement);
    likeButtonsListener();
  }
}

function removeCards() {
  document.querySelector(".cards").addEventListener("click", (e) => {
    if (e.target.closest(".card__delete-button")) {
      const cardElement = e.target.closest(".card");
      const cardName = cardElement.querySelector(
        ".card__text-paragraph"
      ).textContent;

      const index = initialCards.findIndex((card) => card.name === cardName);

      if (index !== -1) {
        initialCards.splice(index, 1);
      }

      cardElement.remove();
    }
  });
}

function likeButtonsListener() {
  const toggleButtons = document.querySelectorAll(".card__like");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("card__like-button-heart_active");
    });
  });
}

function renderFooter() {
  let footerParagraph = document.querySelector(".footer__text");
  let d = new Date();
  let currentYear = d.getFullYear();

  footerParagraph.innerHTML = `&copy; ${currentYear} Around The U.S.`;
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("overlay_active");
    overlay.innerHTML = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("overlay_active")) {
    overlay.classList.remove("overlay_active");
    overlay.innerHTML = "";
  }
});

editUserButton.addEventListener("click", activateForm);
addPlace.addEventListener("click", activateForm);

renderCards();
showFullscreenImage();
likeButtonsListener();
enableValidation(config);
removeCards();
renderFooter();
