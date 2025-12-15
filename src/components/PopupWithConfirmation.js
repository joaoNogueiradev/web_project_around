import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._confirmationTemplate = document.querySelector(
      ".confirmation__template"
    );

    this._confirmation = null;
    this._form = null;
  }

  open() {
    this._popupElement.innerHTML = "";

    this._confirmation = this._confirmationTemplate.content.cloneNode(true);
    this._popupElement.appendChild(this._confirmation);

    this._form = this._popupElement.querySelector("form");

    this._setEventListeners();
    super.open();
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (typeof this._handleSubmit === "function") {
        this._handleSubmit();
      }

      this.close();
    });

    const closeBtn = this._popupElement.querySelector(".form__close-button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    this._popupElement.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClick);

    this._form = null;
    this._confirmation = null;

    super.close();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") this.close();
  }

  _handleOverlayClick(e) {
    if (e.target === this._popupElement) this.close();
  }
}
