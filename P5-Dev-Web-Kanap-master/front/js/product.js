let url = new URL(window.location.href);
let id = url.searchParams.get("id");

function displayImage(object) {
  let image = "<img src='" + object.imageUrl + "' alt='" + object.altTxt + "'>";
  let itemImg = document.getElementsByClassName("item__img");
  for (let object of itemImg) {
    object.innerHTML = image;
  }
}

function displayTitle(object) {
  let title = document.getElementById("title");
  title.textContent = object.name;
}

function displayPrice(object) {
  let price = document.getElementById("price");
  price.textContent = object.price;
}

function displayDescription(object) {
  let description = document.getElementById("description");
  description.textContent = object.description;
}

function displayColors(object) {
  let colorSelect = document.getElementById("colors");
  for (let color of object.colors) {
    let colorOption = "<option value='" + color + "'>" + color + "</option>";
    colorSelect.innerHTML += colorOption;
  }
}

function displayProduct(object) {
  displayImage(object);
  displayTitle(object);
  displayPrice(object);
  displayDescription(object);
  displayColors(object);
}

fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (object) {
    displayProduct(object);
    console.log(object);
  })

  .catch(function (err) {
    console.log(err);
  });
