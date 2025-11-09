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
      return console.error(`Sign-up failed: ${error}`);
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
      // i think i take the token and put it into local storage
      return checkResponse(res);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(`Sign-in failed: ${error}`));
}
