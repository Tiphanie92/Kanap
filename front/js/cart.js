//Récupération du localStorage
let saveProducts = JSON.parse(localStorage.getItem("products"));

// Affichage du contenu du panier
async function displayCart() {
  let productArray = [];

  // Si localstorage vide
  if (saveProducts === null || saveProducts === 0) {
    console.log("Votre panier est vide");
  } else {
    console.log("Des produits sont présents dans le panier");
  }

  // Si localstorage contient des produits
  for (i = 0; i < saveProducts.length; i++) {
    const product = await ProductId(saveProducts[i].id);
    productArray += document.querySelector(
      "#cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${saveProducts[i].id}" data-color="${saveProducts[i].color}">
                  <div class="cart__item__img">
                      <img src="${saveProducts[i].img}" alt="${saveProducts[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${saveProducts[i].name}</h2>
                          <p>${saveProducts[i].color}</p>
                          <p>${product.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p id="quantité">
                              Qté :<input data-id= ${saveProducts[i].id} data-color= ${saveProducts[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${saveProducts[i].quantity}>
                            </p>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p data-id= ${saveProducts[i].id} data-color= ${saveProducts[i].color} class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </article>`;
  }
  // Boucle pour l'affichage du total quantité et du total prix
  let totalQuantity = 0;
  let totalPrice = 0;

  for (i = 0; i < saveProducts.length; i++) {
    const product = await ProductId(saveProducts[i].id);
    totalQuantity += parseInt(saveProducts[i].quantity);
    totalPrice += parseInt(product.price * saveProducts[i].quantity);
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
  }

  modifyQuantity();
  deleteItem();
}

// Récupération des produits de l'API
async function ProductId(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Erreur serveur
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
}
displayCart();

// Modification de la quantité
function modifyQuantity() {
  const modify = document.querySelectorAll(".itemQuantity");
  modify.forEach((modifyProduct) => {
    modifyProduct.addEventListener("change", (event) => {
      event.preventDefault();
      saveProducts = saveProducts.map((product) => {
        if (
          product.id === modifyProduct.dataset.id &&
          product.color === modifyProduct.dataset.color
        ) {
          product.quantity = event.target.value;
        }
        return product;
      });

      // Mise à jour du localStorage
      localStorage.setItem("products", JSON.stringify(saveProducts));
      // Reactualisation de la page
      location.reload();
    });
  });
}

// Suppression d'article
function deleteItem() {
  const suppr = document.querySelectorAll(".deleteItem");
  suppr.forEach((deleteProduct) => {
    deleteProduct.addEventListener("click", (event) => {
      event.preventDefault();
      saveProducts = saveProducts.filter(
        (product) =>
          deleteProduct.dataset.id != product.id ||
          deleteProduct.dataset.color != product.color
      );
      console.log("element supprimées");
      // Mise à jour du localStorage
      localStorage.setItem("products", JSON.stringify(saveProducts));
      // Reactualisation de la page
      location.reload();
    });
  });
}

//Formulaire//
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let firstNameValue, lastNameValue, addressValue, cityValue, emailValue;

//Validation champ prénom
firstName.addEventListener("input", function (event) {
  firstNameValue;
  let firstNameError = document.getElementById("firstNameErrorMsg");
  let firstNameRegExp = /^[a-zA-Z_-]{3,20}$/;
  if (firstName.valueMissing) {
    event.preventDefault();
    firstNameError.textContent = "Veuillez saisir votre prénom.";
  } else if (firstNameRegExp.test(firstName.value) == false) {
    event.preventDefault();
    firstNameError.textContent =
      "format incorrect,ne pas mettre de chiffre ni d'accent.";
  } else {
    event.preventDefault();
    firstNameError.textContent = "format valide";
    firstNameError.style.color = "green";
  }
});
// Validation champ Nom
lastName.addEventListener("input", function (event) {
  lastNameValue;
  let lastNameError = document.getElementById("lastNameErrorMsg");
  let lastNameRegExp = /^[a-zA-Z_-]{3,20}$/;
  if (lastName.valueMissing) {
    event.preventDefault();
    lastNameError.textContent = "Veuillez saisir votre nom.";
  } else if (lastNameRegExp.test(lastName.value) == false) {
    event.preventDefault();
    lastNameError.textContent =
      "format incorrect, ne pas mettre de chiffre ni d'accent.";
  } else {
    event.preventDefault();
    lastNameError.textContent = "format valide";
    lastNameError.style.color = "green";
  }
});
// Validation champ Addresse
address.addEventListener("input", function (event) {
  addressValue;
  let addressError = document.getElementById("addressErrorMsg");
  let addressRegExp = /((^[0-9]*).?)?((\W+))(([a-z]+.))*$/;
  if (address.valueMissing) {
    event.preventDefault();
    addressError.textContent = "Veuillez saisir votre adresse.";
  } else if (addressRegExp.test(address.value) == false) {
    event.preventDefault();
    addressError.textContent = "format incorrect,trop court";
  } else {
    event.preventDefault();
    addressError.textContent = "format valide";
    addressError.style.color = "green";
  }
});
//Validation champ Ville
city.addEventListener("input", function (event) {
  cityValue;
  let cityError = document.getElementById("cityErrorMsg");
  let cityRegExp = /^[a-zA-Z_-]{3,20}$/;
  if (city.valueMissing) {
    event.preventDefault();
    cityError.textContent = "Veuillez saisir le nom de votre ville ";
  } else if (cityRegExp.test(city.value) == false) {
    event.preventDefault();
    cityError.textContent =
      "format incorrect, ne pas mettre de chiffre ni d'accent.";
  } else {
    event.preventDefault();
    cityError.textContent = "format valide";
    cityError.style.color = "green";
  }
});
//Validation champ Email
email.addEventListener("input", function (event) {
  emailValue;
  let emailError = document.getElementById("emailErrorMsg");
  let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/g;
  if (email.valueMissing) {
    event.preventDefault();
    emailError.textContent = "Veuillez saisir une adresse mail valide.";
  } else if (emailRegExp.test(email.value) == false) {
    event.preventDefault();
    emailError.textContent = "format incorrect, n'oubliez pas le @ et le .";
  } else {
    event.preventDefault();
    emailError.textContent = "format valide";
    emailError.style.color = "green";
  }
});
