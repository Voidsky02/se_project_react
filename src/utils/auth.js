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
    .then((res) => checkResponse(res))
    .then((data) => {
      // i think i sign them in and then take the token and put it into
      // local storage
      return data;
    })
    .catch((error) => {
      console.error(`Sign-up failed: ${error}`);
      return Promise.reject(`AUTH.JS ERROR: ${error}`);
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
    })
    .then((data) => {
      // return server response data, save token to storage in
      // FUNCTION INSIDE APP
      return data;
    })
    .catch((error) => console.error(`Sign-in failed: ${error}`));
}

export { signIn, signUp };
