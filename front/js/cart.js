// Récupération des données stockées dans le localStorage
let saveProducts = JSON.parse(localStorage.getItem("products"));
let products = [];
//Variable qui récupére la réponse du serveur lors de la requête Post
let orderId = "";

// Affichage du contenu du panier
async function cart() {
  // Si localstorage vide, affichage des informations
  if (saveProducts === null || saveProducts === 0) {
    console.log("panier vide");
    const message = document.querySelector("h1");
    const h1 = document.createElement("h1");
    h1.textContent = "Votre panier est vide";
    message.replaceWith(h1);
    const quant = document.getElementById("totalQuantity");
    quant.textContent = 0;
    const price = document.getElementById("totalPrice");
    price.textContent = 0;
    return 0;
  } else {
    console.log("produits dans le panier");
  }

  const cart = document.getElementById("cart__items");

  // Si localstorage contient des produits
  for (i = 0; i < saveProducts.length; i++) {
    const product = await productId(saveProducts[i].id);
    // Création de nouveaux éléments HTML
    let article = document.createElement("article");
    let divImg = document.createElement("div");
    let img = document.createElement("img");
    let content = document.createElement("div");
    let description = document.createElement("div");
    let name = document.createElement("h2");
    let color = document.createElement("p");
    let price = document.createElement("p");
    let divSettings = document.createElement("div");
    let divQuantity = document.createElement("div");
    let quant = document.createElement("p");
    let number = document.createElement("input");
    let divDelete = document.createElement("div");
    let buttonDelete = document.createElement("p");
    // Ajout du contenu HTML
    article.classList.add("cart__item");
    article.dataset.id = saveProducts[i].id;
    article.dataset.color = saveProducts[i].color;
    divImg.classList.add("cart__item__img");
    img.src = saveProducts[i].img;
    img.alt = saveProducts[i].altTxt;
    content.classList.add("cart__item__content");
    description.classList.add("cart__item__content__description");
    name.textContent = saveProducts[i].name;
    color.textContent = saveProducts[i].color;
    price.textContent = product.price + " " + "€";
    divSettings.classList.add("cart__item__content__settings");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    quant.textContent = "Qté :";
    number.type = "number";
    number.classList.add("itemQuantity");
    number.name = "itemQuantity";
    number.min = 1;
    number.max = 100;
    number.dataset.id = saveProducts[i].id;
    number.dataset.color = saveProducts[i].color;
    number.value = saveProducts[i].quantity;
    divDelete.classList.add("cart__item__content__settings__delete");
    buttonDelete.classList.add("deleteItem");
    buttonDelete.textContent = "Supprimer";
    buttonDelete.dataset.id = saveProducts[i].id;
    buttonDelete.dataset.color = saveProducts[i].color;
    // Ajout de l'élément à la page
    cart.append(article);
    article.append(divImg);
    divImg.append(img);
    article.append(content);
    content.append(description);
    description.append(name);
    description.append(color);
    description.append(price);
    content.append(divSettings);
    divSettings.append(divQuantity);
    divQuantity.append(quant);
    divQuantity.append(number);
    divSettings.append(divDelete);
    divDelete.append(buttonDelete);
  }

  // Boucle pour l'affichage du total quantité et du total prix
  let totalQuantity = 0;
  let totalPrice = 0;

  for (i = 0; i < saveProducts.length; i++) {
    const product = await productId(saveProducts[i].id);
    totalQuantity += parseInt(saveProducts[i].quantity);
    totalPrice += parseInt(product.price * saveProducts[i].quantity);
    const quant = document.getElementById("totalQuantity");
    quant.textContent = totalQuantity;
    const price = document.getElementById("totalPrice");
    price.textContent = totalPrice;
  }
  // Appel des fonctions de modification et de supression de produits
  modifyQuantity();
  deleteItem();
}

// Récupération des produits de l'API
async function productId(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      // Erreur serveur
      console.error(error);
    });
}
cart();

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
          product.quantity = modifyProduct.value;
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

  // Regex pour validation des champs Prénom, Nom et Ville
  const NoNumberRegex = /^[a-zA-Z_-]{3,20}$/;
  // Regex pour validation du champ Adresse
  const adressRegEx = /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/;
  // Regex pour validation du champ Email
  const emailRegEx = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/;

  // Contrôle du champ Prénom:
  function firstName() {
    const firstName = contact.firstName;
    let firstNameError = document.getElementById("firstNameErrorMsg");
    if (firstName.match(NoNumberRegex)) {
      firstNameError.textContent = "Saisie valide";
      firstNameError.style.color = "#ADFF2F";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      firstNameError.textContent = "Saisie incorrect,ex: Tiphanie";
      firstNameError.style.color = "#f3a797";
      return false;
    }
  }

  // Contrôle du champ Nom:
  function lastName() {
    const lastName = contact.lastName;
    let lastNameError = document.getElementById("lastNameErrorMsg");
    if (lastName.match(NoNumberRegex)) {
      lastNameError.textContent = "Saisie valide";
      lastNameError.style.color = "#ADFF2F";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      lastNameError.textContent = "Saisie incorrect, ex: Leblanc";
      lastNameError.style.color = "#f3a797";
      return false;
    }
  }

  // Contrôle du champ Adresse:
  function address() {
    const adress = contact.address;
    let addressError = document.getElementById("addressErrorMsg");
    if (adress.match(adressRegEx)) {
      addressError.textContent = "Saisie valide";
      addressError.style.color = "#ADFF2F";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      addressError.textContent = "Saisie incorrect, ex: 9 rue de la liberté";
      addressError.style.color = "#f3a797";
      return false;
    }
  }

  // Contrôle du champ Ville:
  function city() {
    const city = contact.city;
    let cityError = document.getElementById("cityErrorMsg");
    if (city.match(NoNumberRegex)) {
      cityError.textContent = "Saisie valide";
      cityError.style.color = "#ADFF2F";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      cityError.textContent = "Saisie incorrect, ex: Nice";
      cityError.style.color = "#f3a797";
      return false;
    }
  }

  // Contrôle du champ Email:
  function mail() {
    const email = contact.email;
    let emailError = document.getElementById("emailErrorMsg");
    if (email.match(emailRegEx)) {
      emailError.textContent = "Saisie valide";
      emailError.style.color = "#ADFF2F";
      return true;
    } else {
      // Message d'erreur si saisie incorrect
      emailError.textContent = "Saisie incorrect, ex: kanap@contact.com";
      emailError.style.color = "#f3a797";
      return false;
    }
  }

  // Contrôle du remplissage de tous les champs du formulaire avant de l'envoyer dans le local storage.
  if (firstName() && lastName() && address() && city() && mail()) {
    // Enregistrement dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    //Condition pour passer commande
    if (contact != null && saveProducts != null) {
      if (confirm("Confirmez-vous votre commande ?")) {
        send();
      }
    } else {
      alert(
        "Aucun produit n'est disponible dans le panier, commande impossible à passer"
      );
      localStorage.clear();
    }
  } else {
    // Message d'alerte si le formulaire n'est pas rempli correctement
    alert("Veiller à bien remplir le formulaire");
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
      })
      .catch((error) => {
        // Erreur serveur
        console.error(error);
      });
  }
});
