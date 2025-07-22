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

            /*
            Exemple :

            let h2 = document.createElement("h2");
            h2.textContent = objet.nom;
            h2.className = "test";
            h2.style = "color : pink";

            let img = document.createElement("img");
            img.src = "assets/img/" + objet.img;
            img.alt = "Image de " + objet.nom;

            MAIN.appendChild(h2);
            MAIN.appendChild(img);
            */

            
        });


    }catch(error){
        // Si une erreur se produit (ex : fichier introuvable), on l'affiche dans la console
        console.log("Erreur lors de la requête :", error.message);
    }
}

// charge les objets
load();