export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
    };
  }

  setUserInfo({ name, job }) {
    if (this._nameElement && name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (this._jobElement && job !== undefined) {
      this._jobElement.textContent = job;
    }
  }
}
