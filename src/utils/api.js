const baseUrl = "http://localhost:3001";

function getClothingItems() {
  return fetch(`${baseUrl}/items`, {})
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export { getClothingItems };
