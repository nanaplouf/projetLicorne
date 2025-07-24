//Définir l'URL du fichier JSON contenant les données
const URL = "/assets/js/data.json";

// Fonction asynchrone pour aller chercher (fetch) les données depuis le fichier JSON
async function listObjet(){
    try {
        // On envoie une requête pour récupérer le fichier JSON
        const REPONSE = await fetch(URL);

        // On convertit la réponse reçue en format JSON (tableau d'objets JavaScript)
        const DATA = await REPONSE.json();

        // On retourne les données récupérées (liste des objets à afficher)
        return DATA;

    }catch(error){
        // Si une erreur se produit (ex : fichier introuvable), on l'affiche dans la console
        console.log("Erreur lors de la requête :", error.message);
    }
}

async function load(){
    try{
        // On appelle listObject() pour récupérer les objets à partir du fichier JSON
        const OBJETS = await listObjet();

        let main = document.getElementById("main");

        OBJETS.forEach(function (objet) {
            //console.log(objet);
            
            // On crée une carte (visuel) pour afficher l'objet sur la page
            card(objet);
            
        });

    }catch(error){
        // Si une erreur se produit (ex : fichier introuvable), on l'affiche dans la console
        console.log("Erreur lors de la requête :", error.message);
    }
}

//Fonction pour créer et afficher une "carte" (card) HTML à partir d'un objet
function card(objet){

    // --------- Création de la carte ----------

    // Création d'un div HTML pour représenter la carte
    let mainDiv = document.createElement("div");
    // on lui donne des classes Bootstrap
    mainDiv.className = "card m-3 ";
    // on lui donne le style Bootstrap
    mainDiv.style = "width: 18rem;";

    // Création de l'image de l'objet
    let img = document.createElement("img");
    img.src = "assets/img/" + objet.img;
    img.alt = "Image de " + objet.nom;
    img.className = "card-img-top";

    // Création d'une div qui contiendra le contenu de la carte (titre, texte, bouton)
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Création du titre de l'objet (le nom)
    let h2 = document.createElement("h2");
    h2.textContent = objet.nom;
    h2.className = "myH2";

    // Création de la description
    let p = document.createElement("p");
    p.textContent = objet.description;
    p.className = "card-text";

    // Création du prix
    let price = document.createElement("p");
    price.className = "card-text";
    let strongPrice = document.createElement("strong");
    strongPrice.className = "myFont"
    //je pars en chiffre à virgule et je lui dit qu'il n'auras que 2 chiffres après la virgule
    strongPrice.textContent = parseFloat(objet.prix).toFixed(2) + " € TTC";
    

    //Création de la div footer
    let footer = document.createElement("div");
    footer.className = "myFooterCard text-center"

    // Création du bouton "Acheter"
    let btn = document.createElement("button");
    btn.className = "myBtnColor";
    btn.textContent = "Acheter";

    // Quand on clique sur le bouton, on ajoute l'objet au panier
    btn.addEventListener("click", function (){
        addToCart(objet);
    })

    // --------- Ajout des éléments entre eux (structure HTML) ----------
    // On ajoute la balise strong avec le prix à la balise p
    price.appendChild(strongPrice);

    // On ajoute le bouton dans le footer de la carte
    footer.appendChild(price);
    footer.appendChild(btn);

    // On ajoute le titre, la description, le prix et le bouton dans le corps de la carte
    cardBody.appendChild(h2);
    cardBody.appendChild(p);
    
    // On ajoute l'image et le corps de la carte et le footer dans la carte elle-même
    mainDiv.appendChild(img);
    mainDiv.appendChild(cardBody);
    mainDiv.appendChild(footer);

    // On ajoute enfin la carte complète dans le conteneur principal de la page
    main.appendChild(mainDiv);
}

//----------------------Panier---------------------------------

// Fonction pour ajouter un nouvel article au panier
function addToCart(objet) {
    // On récupère les articles du panier (ou un tableau vide si aucun panier)
    let cart = getCart() || [];

    // On ajoute le nouvel objet au panier
    cart.push(objet);

    // On enregistre à nouveau le panier (en JSON) dans le localStorage
    localStorage.setItem("panier", JSON.stringify(cart));

    afficherPanier();
    
}

// Fonction utilitaire pour lire le panier depuis le localStorage
function getCart() {
    const cart = localStorage.getItem("panier");

    // Si quelque chose est trouvé, on le parse (convertit en tableau)
    if (cart) {
        return JSON.parse(cart);
    } else {
        // Sinon, on retourne un tableau vide
        return [];
    }
}

// Fonction pour afficher le panier


//Si le panier est vide je note dans le h3 que "mon panier est vide" sinon j'écris "Votre panier contient :" : 

//Boucle forEach pour afficher le panier dans la div
function afficherPanier(){

    // Récupèrer les éléments HTML où on veut afficher les infos
    let titleCart = document.getElementById("titleCart");
    let divCart = document.getElementById("panier");
    let footerCart = document.getElementById("priceTotal");
    
    // On lit le panier depuis le localStorage
    let cart = getCart() || [];

    // On vide le contenu HTML précédent pour éviter de tout afficher deux fois
    panier.innerHTML = "";

    // Si le panier est vide
    if(cart.length === 0){
        titleCart.textContent = "Mon panier est vide";
        footerCart.textContent = "0 € TTC";
    }else{
         // Si le panier contient des articles
        titleCart.textContent = "Votre panier contient :";
        // Variable pour calculer le prix total
        let total = 0;

        // On parcourt chaque article du panier
        cart.forEach(function (objet){
            // On ajoute le prix au total
            total = total + objet.prix;
            
            // Crée un paragraphe pour l'article
            let p = document.createElement("p");
            p.textContent = objet.nom + " : " + objet.prix + " € TTC";

            // Crée un bouton "Supprimer"
            let btnDelete = document.createElement("button");
            btnDelete.className = "myBtnDelete";
            btnDelete.textContent = "Supprimer";

            btnDelete.addEventListener("click", function(){
                console.log(objet);
                supprimerItem(objet);
            })
    
            // On ajoute le bouton au paragraphe
            p.appendChild(btnDelete);
            
            // On ajoute le paragraphe (avec le bouton) dans la div du panier
            divCart.appendChild(p);
        })
        console.log(total);
        footerCart.textContent = total + " € TTC";
    }

}

function supprimerItem(objet){
    // On récupère le panier actuel
    let cart = getCart();

    // On cherche l'index de l'objet à supprimer avec son id
    let i = cart.findIndex((index)=>{
        return index.id === objet.id
    })

    // Si l'article existe, on le retire du tableau    
    if(i !== -1){
        // Supprime 1 élément à l’index i
        cart.splice(i, 1);
    }
    
    // On enregistre le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(cart));

    // On met à jour l'affichage à l’écran
    afficherPanier();
}


// charge les objets
load();

afficherPanier();