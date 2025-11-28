export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._submit = formElement.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._addEventListeners();
    this._toggleButton();
  }

  resetValidation() {
    this._inputs.forEach((i) => this._hide(i));
    this._submit?.setAttribute("disabled", true);
  }

  _addEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._check(input);
        this._toggleButton();
      });
    });
  }

  _check(input) {
    if (!input.validity.valid) {
      this._show(input, input.validationMessage);
    } else {
      this._hide(input);
    }
  }

  _toggleButton() {
    const invalid = this._inputs.some((i) => !i.validity.valid);
    if (invalid) {
      this._submit?.setAttribute("disabled", true);
    } else {
      this._submit?.removeAttribute("disabled");
    }
  }

  _show(input, message) {
    const span = this._form.querySelector(`.${input.id}-error`);
    if (!span) return;
    input.classList.add(this._config.inputErrorClass);
    span.textContent = message;
    span.classList.add(this._config.errorClass);
  }

  _hide(input) {
    const span = this._form.querySelector(`.${input.id}-error`);
    if (!span) return;
    input.classList.remove(this._config.inputErrorClass);
    span.textContent = "";
    span.classList.remove(this._config.errorClass);
  }
}
