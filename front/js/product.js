//Création new URL avec urlsearchparams
let params = new URLSearchParams(document.location.search);
let productId = params.get("id");

//Récupération des données de l'API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    selectProducts(products);
    registredProducts(products);
  })
  .catch((error) => {
    // Erreur serveur
    console.error(error);
  });

//Selection de la couleur, la quantité et le bouton
const selectColors = document.querySelector("#colors");
const selectQuantity = document.querySelector("#quantity");
const addToCart = document.querySelector("#addToCart");

//Fonction récupération des données
let selectProducts = (products) => {
  // Création de nouveaux éléments HTML
  const item = document.querySelector(".item__img");
  const img = document.createElement("img");
  // Ajout du contenu HTML
  img.src = products.imageUrl;
  img.alt = products.altTxt;
  // Ajout de l'élément à la page
  item.append(img);

  const title = document.querySelector("#title");
  title.textContent = products.name;
  const price = document.querySelector("#price");
  price.textContent = products.price + ` `;
  const description = document.querySelector("#description");
  description.textContent = products.description;

  //Boucle pour récupérer les couleurs
  for (color of products.colors) {
    let i = 0;
    i < products.colors.length;
    i += 1;
    const colors = document.createElement("option");
    colors.value += color;
    colors.textContent += color;
    selectColors.append(colors);
  }
};
// Fonction pour sélection couleur et quantité
let registredProducts = (products) => {
  // Écoute de l'évènement click sur le bouton ajouter
  addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    // Condition pour l'ajout au panier
    if (selectColors.value == false) {
      alert("Veuillez sélectionner une couleur");
      return selectColors;
    } else if (selectQuantity.value == 0 || selectQuantity.value >= 101) {
      alert("Veuillez sélectionner un nombre d'article compris entre 1 et 100");
      return selectQuantity;
    } else {
      alert("Votre article a bien été ajouté au panier");
    }
    // Objet selectProducts pour récupérer les informatons du produits
    let selectProducts = {
      id: products._id,
      name: products.name,
      img: products.imageUrl,
      altTxt: products.altTxt,
      description: products.description,
      color: selectColors.value,
      quantity: parseInt(selectQuantity.value, 10),
    };
    let saveProducts = JSON.parse(localStorage.getItem("products"));
    // Condition pour l'ajout de quantité au panier
    if (saveProducts == null) {
      let saveProducts = [];
      saveProducts.push(selectProducts);
      localStorage.setItem("products", JSON.stringify(saveProducts));
      console.log("Panier vide, ajout du premier produit");
    } else {
      let newProducts = saveProducts.find(
        (newProducts) =>
          newProducts.id == selectProducts.id &&
          newProducts.color == selectProducts.color
      );
      if (newProducts == undefined) {
        saveProducts.push(selectProducts);
        localStorage.setItem("products", JSON.stringify(saveProducts));
        console.log("Nouveau produit ajoutée au panier");
      } else {
        newProducts.quantity += selectProducts.quantity;
        localStorage.setItem("products", JSON.stringify(saveProducts));
        console.log("Quantités modifiés");
      }
    }
  });
};
