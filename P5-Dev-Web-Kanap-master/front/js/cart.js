let cart = JSON.parse(localStorage.getItem("cart"));
let section = document.getElementById("cart__items");
let totalQuantity = 0;

for (let item of cart) {
  fetch("http://localhost:3000/api/products/" + item.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (cartItem) {
      console.log(cartItem);

      let image =
        '<div class="cart__item__img"><img src="' +
        cartItem.imageUrl +
        '" alt="' +
        cartItem.altTxt +
        '"></div>';

      let titlePrice =
        '<div class="cart__item__content__titlePrice"><h2>' +
        cartItem.name +
        "</h2><p>" +
        cartItem.price +
        " €</p></div>";

      let quantity =
        '<div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
        item.quantity +
        '"></div>';

      let button =
        '<div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div>';

      section.innerHTML +=
        '<article class="cart__item" data-id="{product-ID}">' +
        image +
        '<div class="cart__item__content">' +
        titlePrice +
        '<div class="cart__item__content__settings">' +
        quantity +
        button +
        "</div></div></article>";

      let itemQuantity = parseInt(item.quantity, 10);
      totalQuantity += itemQuantity;
      console.log(totalQuantity);
    })

    .catch(function (err) {
      console.log(err);
    });
}

let cartQuantity = document.getElementById("totalQuantity");
cartQuantity.textContent = totalQuantity;
