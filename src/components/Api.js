export default class API {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }

    return res.json().catch(() => ({}));
  }

  _request(endpoint, options = {}) {
    const config = {
      method: options.method || "GET",
      headers: {
        ...this._headers,
        ...(options.headers || {}),
      },
    };

    if (options.body) {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(options.body);
    }

    return fetch(`${this._baseUrl}${endpoint}`, config).then((res) =>
      this._handleResponse(res)
    );
  }


  getUserInfo() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  editUserInfo(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      body: { name, about },
    });
  }

  addCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      body: { name, link },
    });
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  onLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  onDislike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  updateAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: { avatar },
    });
  }
}
