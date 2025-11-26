// ALREADY FINISHED BACKEND LOGIC, JUST HAVE TO ENABLE FRONT END TO
// COMMUNICATE WITH IT VIA API CALLS

import { baseUrl, checkResponse } from "./api";

// /signup
// method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
// body: JSON.stringify({ name, avatar, email, password })
//
// destructure object..
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
      // i think i sign them in and then take the token and put it into
      // local storage
      return data;
    })
    .catch((error) => {
      return Promise.reject(`Error ${err}: Could not register user`);
    });
}

//

// /signin
// method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
// body: JSON.stringify({ email, password })
//
// destructure object..
function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      // make sure respone is good?
      return checkResponse(res);
      // SERVER SENDS ONLY THE TOKEN BACK, NOTHING MORE!!!!!!!!!
    })
    .then((data) => {
      console.log(`SignIn (auth.js) = ${JSON.stringify(data)}`);
      // return server response data, save token to storage in
      // FUNCTION INSIDE APP
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
