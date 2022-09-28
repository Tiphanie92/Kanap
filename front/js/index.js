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

      // Création de nouveaux éléments HTML
      const items = document.getElementById("items");
      const id = document.createElement("a");
      // Ajout du contenu HTML
      id.setAttribute("href", `./product.html?id=${products._id}`);
      items.append(id);
      const article = document.createElement("article");
      const img = document.createElement("img");
      img.src = products.imageUrl;
      img.alt = products.altTxt;
      const h3 = document.createElement("h3");
      h3.classList.add("productName");
      h3.textContent = products.name;
      const p = document.createElement("p");
      p.classList.add("productDescription");
      p.textContent = products.description;
      // Ajout de l'élément à la page
      article.append(img);
      article.append(h3);
      article.append(p);
      id.append(article);
    }
  })
  .catch((error) => {
    // Erreur serveur
    console.error(error);
  });
