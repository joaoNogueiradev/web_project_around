let editUserButton = document.querySelector(".user__name-edit");
let overlay = document.querySelector(".overlay");
let closeFormButton = document.querySelector(".form__close-button");
let inputName = document.querySelector(".form__input-name");
let inputType = document.querySelector(".form__input-type");
let currentUserName = document.querySelector(".user__name-paragraph");
let currentUserType = document.querySelector(".user__type-paragraph");
let formElement = document.querySelector(".form");

if (!inputName.value) {
  inputName.value = currentUserName.innerHTML;
}

if (!inputType.value) {
  inputType.value = currentUserType.innerHTML;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  currentUserName.textContent = inputName.value;
  currentUserType.textContent = inputType.value;

  closeForm();
}

function activateForm() {
  overlay.classList.add("overlay_active");
}

function closeForm() {
  if (overlay.classList.contains("overlay_active"))
    overlay.classList.remove("overlay_active");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editUserButton.addEventListener("click", activateForm);
closeFormButton.addEventListener("click", closeForm);
