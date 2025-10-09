let editUserButton = document.querySelector(".user__name-edit");
let addPlace = document.querySelector(".user__add-button");
let overlay = document.querySelector(".overlay");
let footerParagraph = document.querySelector(".footer__text");
let d = new Date();
let currentYear = d.getFullYear();

footerParagraph.innerHTML = `&copy; ${currentYear} Around The U.S.`;

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

  closeForm();
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

    overlay.innerHTML = "";
    overlay.append(userForm);

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

    formElement.addEventListener("submit", handleProfileFormSubmit);
    closeFormButton.addEventListener("click", closeForm);

    overlay.innerHTML = "";
    overlay.append(newCardForm);

    overlay.classList.add("overlay_active");
  }
}

function closeForm(e) {
  if (overlay.classList.contains("overlay_active"))
    overlay.classList.remove("overlay_active");
}

function createCards() {}

editUserButton.addEventListener("click", activateForm);
addPlace.addEventListener("click", activateForm);

// ao clicar no botao adicionar, abre um form apenas com os valoeres dos campos mudados, então ele pode ser uma cópia do outro com os valores mudados.
