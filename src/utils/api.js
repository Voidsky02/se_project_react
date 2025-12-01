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

function postClothingItems(itemName, imageLink, weatherTemp) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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
      return data;
    })
    .catch((err) => console.error(`Failure to POST: ${err}`));
}

function deleteClothingItems(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => console.error(`Failure to DELETE: ${err}`));
}

const updateUserData = ({ name, imageUrl }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: imageUrl,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) =>
      console.error(`Error ${err}: Failure to send update user request`)
    );
};

// first argument is cards id
const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }) //add current users id to the clothingItems likes array
    .then((res) => {
      return checkResponse(res);
    })
};

// first argument is cards id
const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }) //remove current users id from the clothingItems likes array
    .then((res) => checkResponse(res))
};

export {
  getClothingItems,
  postClothingItems,
  deleteClothingItems,
  updateUserData,
  checkResponse,
  baseUrl,
  addCardLike,
  removeCardLike,
};
