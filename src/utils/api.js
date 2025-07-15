const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
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

function deleteClothingItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => console.error(`Failure to DELETE: ${err}`));
}

export {
  getClothingItems,
  postClothingItems,
  deleteClothingItems,
  checkResponse,
};
