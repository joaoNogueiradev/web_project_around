export default class Card {
  constructor(
    { _id, name, link, isLiked },
    templateSelector,
    handleDeleteCallback,
    handleImageClick,
    handleLike
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleDeleteCallback = handleDeleteCallback;
    this._handleImageClick = handleImageClick;
    this._handleLike = handleLike;

    this._element = null;
    this._imageElement = null;
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

    this._imageElement = cardEl.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    cardEl.querySelector(".card__text-paragraph").textContent = this._name;

    if (this._isLiked) {
      likeBtn.classList.add("card__like-button-heart_active");
    }

    return cardEl;
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector(".card__like");
    const deleteBtn = this._element.querySelector(".card__delete-button");

    this._imageElement.addEventListener("click", () => {
      if (typeof this._handleImageClick === "function") {
        this._handleImageClick({ name: this._name, link: this._link });
      }
    });

    likeBtn.addEventListener("click", () => this._toggleLike());

    deleteBtn.addEventListener("click", () => this._deleteCard());
  }

  _toggleLike() {
    const likeBtn = this._element.querySelector(".card__like");
    likeBtn.classList.toggle("card__like-button-heart_active");
    this._isLiked = !this._isLiked;
    console.log(this._isLiked);
  }

  _deleteCard() {
    if (typeof this._handleDeleteCallback === "function") {
      this._handleDeleteCallback(this);
    }
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
