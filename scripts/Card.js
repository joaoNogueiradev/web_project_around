export default class Card {
  _name;
  _link;
  _templateSelector;
  _handleDeleteCallback;
  _element;

  constructor({ name, link }, templateSelector, handleDeleteCallback) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleDeleteCallback = handleDeleteCallback;
  }

  getElement() {
    if (!this._element) {
      this._element = this._getView();
      this._setEventListeners();
    }

    return this._element;
  }

  _getView() {
    const fragment = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    const cardEl = fragment.querySelector(".card");

    const img = cardEl.querySelector(".card__image");
    img.src = this._link;
    img.alt = this._name;

    cardEl.querySelector(".card__text-paragraph").textContent = this._name;

    return cardEl;
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector(".card__like");
    const deleteBtn = this._element.querySelector(".card__delete-button");

    likeBtn.addEventListener("click", () => this._onLike());
    deleteBtn.addEventListener("click", () => this._onDelete());
  }

  _onLike() {
    const likeBtn = this._element.querySelector(".card__like");
    likeBtn.classList.toggle("card__like-button-heart_active");
  }

  _onDelete() {
    if (typeof this._handleDeleteCallback === "function") {
      this._handleDeleteCallback(this._name);
    }
    this._element.remove();
  }
}
