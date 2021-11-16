function displayCard(array) {
  let section = document.getElementById("items");

  for (let object of array) {
    let title = "<h3 class='productName'>" + object.name + "</h3>";
    let description =
      "<p class='productDescription'>" + object.description + "</p>";
    let image =
      "<img src='" + object.imageUrl + "' alt='" + object.altTxt + "'>";

    section.innerHTML +=
      "<a href='./product.html?id=" +
      object._id +
      "'><article> " +
      image +
      title +
      description +
      "</article></a>";
  }
}

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (array) {
    displayCard(array);
  })

  .catch(function (err) {
    console.log(err);
  });
