class Auth {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(this._checkResponse);
    }
  
    login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(this._checkResponse);
    }

    checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  }
  
  const auth = new Auth({
    //baseUrl: "http://localhost:3000",
    baseUrl: "https://api.marinakuschenko.nomoreparties.sbs",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default auth;