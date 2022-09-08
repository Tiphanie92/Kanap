//Récupération du localStorage
let saveProducts = JSON.parse(localStorage.getItem("products"));
let productArray = [];
// Si le localstorage est vide
if (saveProducts === null || saveProducts === 0) {
  console.log("panier vide");
} else {
  console.log("produits présents dans le panier");
}
console.log(saveProducts);
for (i = 0; i < saveProducts.length; i++) {
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
               <p>${saveProducts[i].price} €</p>
           </div>
           <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                   <p>Qté : </p>
                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value="${saveProducts[i].quantity}">
               </div>
               <div class="cart__item__content__settings__delete">
                   <p class="deleteItem" >Supprimer</p>
               </div>
           </div>
       </div>
</article>`;
}
