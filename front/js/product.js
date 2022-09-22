//Création new URL avec urlsearchparams
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

//Récupération des données de l'API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    selectProducts(products);
    registredProducts(products);
  });

//Selection de la couleur, la quantité et le bouton
const selectColors = document.querySelector("#colors");
const selectQuantity = document.querySelector("#quantity");
const addToCart = document.querySelector("#addToCart");
//Fonction récupération des données
let selectProducts = (products) => {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${products.imageUrl}" alt ="${products.altTxt}">`;
  document.querySelector("#title").innerHTML = `${products.name}`;
  document.querySelector("#price").innerHTML = `${products.price}` + ` `;
  document.querySelector("#description").innerHTML = `${products.description}`;
  //Boucle pour récupérer les couleurs
  for (color of products.colors) {
    let i = 0;
    i < products.colors.length;
    i += 1;
    selectColors.innerHTML += `<option value="${color}">${color}</option>`;
  }
};

let registredProducts = (products) => {
  // Écoute de l'évènement click sur le bouton ajouter
  addToCart.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectColors.value == false) {
      alert("Veuillez sélectionner une couleur");
      return selectColors;
    } else if (selectQuantity.value == 0) {
      alert("Veuillez sélectionner le nombre d'articles souhaités");
      return selectQuantity;
    } else {
      alert("Votre article a bien été ajouté au panier");
    }

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
