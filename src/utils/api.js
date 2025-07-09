const baseUrl = "http://localhost:3001";

function getClothingItems() {
  return fetch(`${baseUrl}/items`, {})
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

// Ill be calling this when i submit a new item, i think it was AddItemModal
function postClothingItem(itemName, imageLink, weatherTemp, itemId) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: itemId,
      name: itemName,
      weather: weatherTemp,
      imageUrl: imageLink,
    }),
  });
}

// STILL NEED TO CALL IT SOMEWHERE

export { getClothingItems };
