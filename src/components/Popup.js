export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    if (!this._popupElement) return;
    this._popupElement.classList.add("overlay_active");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._handleOverlayClick);
  }

  close() {
    if (!this._popupElement) return;
    this._popupElement.classList.remove("overlay_active");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClick);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(e) {
    if (e.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners(closeButtonSelector) {
    const closeBtn = this._popupElement.querySelector(closeButtonSelector);
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
  }
}
