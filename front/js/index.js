let url = "http://localhost:3000/api/products";

//Récupération des données de l'API avec fetch
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //Boucle qui permet de répéter des actions
    for (let products of data) {
      let i = 0;
      i < products.length;
      i += 1;

      //Intégration des produits dans la page
      document.getElementById(
        "items"
      ).innerHTML += `<a href ="./product.html?id=${products._id}">
       <article>
       <img src="${products.imageUrl}" alt="${products.altTxt}"></img>
       <h3 class="productName">${products.name}</h3>
       <p class="productDescription">${products.description}</p>
       </article>
       </a>
       `;
    }
  });
