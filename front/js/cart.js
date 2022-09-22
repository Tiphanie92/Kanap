// Récupération des données stockées dans le localStorage
let saveProducts = JSON.parse(localStorage.getItem("products"));
let products = [];

//Variable qui récupére la réponse du serveur lors de la requête Post
let orderId = "";

// Affichage du contenu du panier
async function displayCart() {
  let productArray = [];

  // Si localstorage vide
  if (saveProducts === null || saveProducts === 0) {
    console.log("Aucun produit n'a été ajouté au panier.");
    return 0;
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
  // Appel des fonctions de modification et de supression de produits
  modifyQuantity();
  deleteItem();
}

// Récupération des produits de l'API
async function ProductId(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((erreur) => {
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
      console.log(saveProducts.quantity);
      // Mise à jour du localStorage
      localStorage.setItem("products", JSON.stringify(saveProducts));
      // Raffraichissement de la page
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
      // Raffraichissement de la page
      location.reload();
    });
  });
}
/* LE FORMULAIRE */
// sélection du bouton Valider
const order = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
order.addEventListener("click", (event) => {
  event.preventDefault();

  //Objet contact pour récupérer les données du formulaire
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  // Regex pour validation des champs Prénom, Nom et Ville
  const regExNoNumber = (value) => {
    return /^[a-zA-Z_-]{3,20}$/.test(value);
  };

  // Regex pour validation du champ Adresse
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex pour validation du champ Email
  const regExEmail = (value) => {
    return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/.test(value);
  };

  // Contrôle du champ Prénom:
  function firstNameControl() {
    const firstName = contact.firstName;
    let firstNameError = document.getElementById("firstNameErrorMsg");
    if (regExNoNumber(firstName)) {
      firstNameError.textContent = "Saisie valide";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      firstNameError.textContent = "Saisie incorrect,ex: Tiphanie";
      return false;
    }
  }

  // Contrôle du champ Nom:
  function lastNameControl() {
    const lastName = contact.lastName;
    let lastNameError = document.getElementById("lastNameErrorMsg");
    if (regExNoNumber(lastName)) {
      lastNameError.textContent = "Saisie valide";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      lastNameError.textContent = "Saisie incorrect, ex: Leblanc";
      return false;
    }
  }

  // Contrôle du champ Adresse:
  function addressControl() {
    const adress = contact.address;
    let addressError = document.getElementById("addressErrorMsg");
    if (regExAdresse(adress)) {
      addressError.textContent = "Saisie valide";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      addressError.textContent = "Saisie incorrect, ex: 9 rue de la liberté";
      return false;
    }
  }

  // Contrôle du champ Ville:
  function cityControl() {
    const city = contact.city;
    let cityError = document.getElementById("cityErrorMsg");
    if (regExNoNumber(city)) {
      cityError.textContent = "Saisie valide";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      cityError.textContent = "Saisie incorrect, ex: Nice";
      return false;
    }
  }

  // Contrôle du champ Email:
  function mailControl() {
    const email = contact.email;
    let emailError = document.getElementById("emailErrorMsg");
    if (regExEmail(email)) {
      emailError.textContent = "Saisie valide";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      emailError.textContent = "Saisie incorrect, ex: kanap@contact.com";
      return false;
    }
  }

  // Contrôle du remplissage de tous les champs du formulaire avant de l'envoyer dans le local storage.
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrement dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    //Condition pour passer commande
    if (contact != null && saveProducts != null) {
      send();
    } else {
      alert(
        "Aucun produit n'est disponible dans le panier, commande impossible"
      );
    }
  } else {
    // Message d'alerte si le formulaire n'est pas rempli correctement
    alert("Veuillez bien remplir le formulaire");
  }

  // Requête du serveur et Post des données
  function send() {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        // Stockage de la réponse de l'API
        orderId = server.orderId;
        console.log(orderId);
        // Renvoie vers la page de confirmation de commande
        location.href = "confirmation.html?id=" + orderId;
      });
  }
});
