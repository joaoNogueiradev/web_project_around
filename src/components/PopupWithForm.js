import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formConfig, handleSubmit, validationConfig) {
    super(selector);

    this._formTemplate = document.querySelector(".form__template").content;
    this._formConfig = formConfig;
    this._handleSubmit = handleSubmit;
    this._validationConfig = validationConfig;

    this._form = null;
    this._validator = null;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  open() {
    if (!this._popupElement) return;

    this._popupElement.innerHTML = "";

    const node = this._formTemplate.cloneNode(true);
    this._form = node.querySelector(".form");
    if (!this._form) return;

    this._submitButton = this._form.querySelector(".form__submit-button");
    this._submitButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";

    if (this._formConfig.title) {
      this._form.querySelector(".form__title").textContent =
        this._formConfig.title;
    }

    if (Array.isArray(this._formConfig.fields)) {
      this._formConfig.fields.forEach((field) => {
        const input = this._form.querySelector(field.selector);
        if (!input) return;

        input.style.display = "block";
        input.required = true;

        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.type) input.type = field.type;
        if (field.min) input.minLength = field.min;
        if (field.max) input.maxLength = field.max;
        if (field.value !== undefined) input.value = field.value;
      });
    }

    if (Array.isArray(this._formConfig.hideFields)) {
      this._formConfig.hideFields.forEach((selector) => {
        const input = this._form.querySelector(selector);
        if (!input) return;

        input.style.display = "none";
        input.required = false;
        input.value = "";
      });
    }

    this._popupElement.appendChild(this._form);

    if (this._validationConfig) {
      this._validator = new FormValidator(this._validationConfig, this._form);
      this._validator.enableValidation();
    }

    super.open();
    this.setEventListeners();
  }

  _getInputValues() {
    const values = {};
    this._form.querySelectorAll(".form__input").forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  }
  renderLoading(isLoading, loadingText = "Salvando...") {
    if (!this._submitButton) return;
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._submitButtonText;
  }

  setEventListeners() {
    if (!this._form) return;

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleSubmit === "function") {
        this.renderLoading(true);

        const result = this._handleSubmit(this._getInputValues());
        if (result && typeof result.then === "function") {
          result
            .then(() => this.close())
            .catch(() => {})
            .finally(() => this.renderLoading(false));
        } else {
          this.close();
          this.renderLoading(false);
        }
      }
    });

    const closeBtn = this._form.querySelector(".form__close-button");
    if (closeBtn)
      closeBtn.addEventListener("click", this._handleCloseButtonClick);

    this._popupElement.addEventListener("click", this._handleOverlayClick);

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (this._validator) this._validator.resetValidation();
    if (this._form) this._form.reset();

    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClick);

    super.close();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") this.close();
  }

  _handleOverlayClick(e) {
    if (e.target === this._popupElement) this.close();
  }

  _handleCloseButtonClick() {
    this.close();
  }
}
