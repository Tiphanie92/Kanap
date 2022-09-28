// Création d'une nouvelle URL
let params = new URLSearchParams(document.location.search);
let orderId = params.get("id");

// Récupération des données stockés dans le local storage
const products = JSON.parse(localStorage.getItem("contact, products"));

//Affichage du numéro de commande dans le DOM
const order = document.querySelector("#orderId");
order.textContent = orderId;

//Effacement des données stockés dans le localstorage
localStorage.clear();
