//Création new URL avec urlsearchparams
const urlParams = new URLSearchParams(document.location.search);
const urlAPI = "http://localhost:3000/api/products/" + urlParams.get("id");

//Récupération des données de l'API
fetch(urlAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    selectProducts(products);
  });
//Selection de la couleur
const selectColors = document.querySelector("#colors");
const quantity = document.querySelector("#itemQuantity");
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

function saveSelection(selection) {
  let selections = JSON.parse(localStorage.getItem("selections")) || [];
  selections = [...selections, selection];
  localStorage.setItem("selections", JSON.stringify(selections));
}
