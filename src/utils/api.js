const baseUrl = "http://localhost:3001";

function getClothingItems() {
  return fetch(`${baseUrl}/items`, {})
    .then((res) => {
      if (res.status === 200 || 304) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
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
      if (res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
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
      if (res.status === 200 || 204) {
        return "Success";
      } else {
        Promise.reject(res.status);
      }
    })
    .catch((err) => console.error(`Failure to DELETE: ${err}`));
}

export { getClothingItems, postClothingItems, deleteClothingItems };
