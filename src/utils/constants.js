export const editUserButton = document.querySelector(".user__name-edit");
export const addPlaceButton = document.querySelector(".user__add-button");
export const cardsContainerSelector = ".cards";
export const cardTemplateSelector = ".card__template";
export const fullscreenTemplateSelector = ".fullscreen__template";

export const userSelectors = {
  nameSelector: ".user__name-paragraph",
  jobSelector: ".user__type-paragraph",
};

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const initialCards = [
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
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

export const overlaySelector = ".overlay";
