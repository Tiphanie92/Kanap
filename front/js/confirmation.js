// Création d'une nouvelle URL
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

// Récupération des données stockés dans le local storage
const products = JSON.parse(localStorage.getItem("contact"));

//Affichage du numéro de commande dans le DOM
document.querySelector("#orderId").innerHTML = `
    ${orderId}
    `;

//Effacement des données stockés dans le localstorage
localStorage.clear();
