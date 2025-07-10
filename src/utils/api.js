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
    .catch((err) => console.error(err));
}

// Ill be calling this when i submit a new item, i think it was AddItemModal
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
  }).catch((err) => console.error(err));
}

// STILL NEED TO CALL IT SOMEWHERE

export { getClothingItems, postClothingItems };
