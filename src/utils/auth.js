import { baseUrl, checkResponse } from "./api";

// sign in user and close modal
function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => checkResponse(res)) //checkResponse throws error if data is not correct, this could be end of chain in auth.js and have the rest taken away by the functions in app.jsx
    .then((data) => {
      console.log(`SignUp response = ${JSON.stringify(data)}`);
      return data;
    })
    .catch((error) => {
      return Promise.reject(`Error ${error}: Could not register user`);
    });
}

//

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkResponse(res);
      // server sends token back
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject(`Sign-in failed: ${error}`);
    });
}

// validate token saved in localStorage with database token (/users/me) endpoint
function validateToken(token) {
  // protect with token
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) =>
      Promise.reject(`Error ${error}: Could not validate token`)
    );
}

export { signIn, signUp, validateToken };
