import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, templateSelector) {
    super(selector);
    this._templateSelector = templateSelector;
    this._imageElement = null;
    this._captionElement = null;
  }

  open({ name, link }) {
    this._popupElement.innerHTML = "";

    const template = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    const container = template.querySelector(".fullscreen__container");

    this._imageElement = container.querySelector(".fullscreen__image");
    this._captionElement = container.querySelector(".fullscreen__name");

    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;

    this._popupElement.appendChild(container);

    super.open();
    this._setEventListeners();
  }

  _setEventListeners() {
    const closeBtn = this._popupElement.querySelector(
      ".fullscreen__delete-button"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    this._popupElement.addEventListener("click", (e) => {
      if (e.target === this._popupElement) this.close();
    });

    this._handleEscClose = (e) => {
      if (e.key === "Escape") this.close();
    };
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.innerHTML = "";
    super.close();
  }
}
