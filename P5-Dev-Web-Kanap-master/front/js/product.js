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

let url = new URL(window.location.href);
let id = url.searchParams.get("id");
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (object) {
    displayProduct(object);
  })

  .catch(function (err) {
    console.log(err);
  });

function createCartItem() {
  // Get selected color
  let select = document.getElementById("colors");
  let index = select.selectedIndex;
  let selectedColor = select.options[index].value;

  // Get selected quantity
  let input = document.getElementById("quantity");
  let selectedQuantity = parseInt(input.value);

  if (!(selectedColor == "" || selectedQuantity == 0)) {
    // Create object
    let cartItem = {
      id: id,
      color: selectedColor,
      quantity: selectedQuantity,
    };

    var cart = JSON.parse(localStorage.getItem("cart"));
    var isObjectAlreadyInCart = false;

    // init cart if it doesn't already exist in local storage
    if (cart == null) {
      cart = [];
    } else {
      // increase quantity instead of creating new object if product already in cart
      cart.forEach((element) => {
        if (element.id == cartItem.id && element.color == cartItem.color) {
          element.quantity += cartItem.quantity;
          isObjectAlreadyInCart = true;
        }
      });
    }

    // create new object if product not already in cart
    if (isObjectAlreadyInCart == false) {
      cart.push(cartItem);
    }

    // push cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    window.alert("Merci de renseigner tous les champs");
  }
}

let addToCartButton = document.getElementById("addToCart");
addToCartButton.onclick = function () {
  createCartItem();
};
