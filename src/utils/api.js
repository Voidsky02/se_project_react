const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`checkResponse Failure -> Error: ${res.status}`);
};

function getClothingItems() {
  return fetch(`${baseUrl}/items`, {})
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(`Failure to GET: ${err}`));
}

// Protect with token
function postClothingItems(itemName, imageLink, weatherTemp) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: itemName,
      weather: weatherTemp,
      imageUrl: imageLink,
    }),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.error(`Failure to POST; ${err}`));
}

// Protect with token
function deleteClothingItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => console.error(`Failure to DELETE: ${err}`));
}

// Protect this with token
const updateUserData = ({ name, imageUrl }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.error(`Error ${err}: Failure to update user data`));
};

export {
  getClothingItems,
  postClothingItems,
  deleteClothingItems,
  updateUserData,
  checkResponse,
  baseUrl,
};
