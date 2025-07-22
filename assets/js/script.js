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

        const MAIN = document.getElementById("main");

        OBJETS.forEach(function (objet) {
            console.log(objet);

            // --------- Création de la carte ----------

            // Création d'un div HTML pour représenter la carte
            let mainDiv = document.createElement("div");
            // on lui donne des classes Bootstrap
            mainDiv.className = "card m-3";
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
            h2.className = "card-title";

            // Création de la description
            let p = document.createElement("p");
            p.textContent = objet.description;
            p.className = "card-text";

            // Création du prix
            let price = document.createElement("p");
            price.textContent = objet.prix + " € TTC";
            price.className = "card-text";

            // Création du bouton "Acheter"
            let btn = document.createElement("button");
            btn.className = "btn btn-warning";
            btn.textContent = "Acheter";

            // --------- Ajout des éléments entre eux (structure HTML) ----------

            // On ajoute le titre, la description, le prix et le bouton dans le corps de la carte
            cardBody.appendChild(h2);
            cardBody.appendChild(p);
            cardBody.appendChild(price);
            cardBody.appendChild(btn);

            // On ajoute l'image et le corps de la carte dans la carte elle-même
            mainDiv.appendChild(img);
            mainDiv.appendChild(cardBody);

            // On ajoute enfin la carte complète dans le conteneur principal de la page
            MAIN.appendChild(mainDiv);
        });


    }catch(error){
        // Si une erreur se produit (ex : fichier introuvable), on l'affiche dans la console
        console.log("Erreur lors de la requête :", error.message);
    }
}

// charge les objets
load();