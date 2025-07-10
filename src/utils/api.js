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

// I need this to return its item info, so i can use the unique ID generated
// by the server to be able to use in other things, such as a DELETE request,
// or filtering out the item client side after deletion
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

/* I must make it return a promise, so i can only filter the clothingItems
in App.jsx if the request was successfull, right now its not returning a promise,
i tried to comment out the .then() here then write it in App but its not working,
will stop here for now */
function deleteClothingItems(id) {
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    // .then((res) => {
    //   if (res.status === 200 || 204) {
    //     console.log("success");
    //     return "Success";
    //   } else {
    //     Promise.reject(res.status);
    //   }
    // })
    .catch((err) => console.error(`Failure to DELETE: ${err}`));
}

export { getClothingItems, postClothingItems, deleteClothingItems };
