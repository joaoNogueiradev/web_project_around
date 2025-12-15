export default class UserInfo {
  constructor({ nameSelector, aboutSelector, picSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._picElement = document.querySelector(picSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      about: this._aboutElement ? this._aboutElement.textContent : "",
    };
  }

  setUserInfo({ name, about, pic }) {
    if (this._nameElement && name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (this._aboutElement && about !== undefined) {
      this._aboutElement.textContent = about;
    }
    if (this._picElement && pic !== undefined) {
      this._picElement.src = pic;
    }
  }
}
