# projetLicorne
1-Trouvé l'idée
2-Base du projet:
	->logo
    ->nom
    ->couleurs
3-Recherche de 10 ressources:
	->nom
    ->image
    ->prix
    ->description
4-Créer un projet sur votre machine :
	->avec index.html / assets: css: style.css / img: vos img / js: script.js
5-Créer un repo sur github
6-Créer un document data.json dans le dossier js
7-Dans le document JSON mêttre les datas sous cette forme : 
	[
    	{
        	"id" : 1,
            "nom" : "...",
            "prix" : 12,
            "description" : "...",
            "img": "nom du fichier.jpg"
        },
        {
        	"id" : 2,
            "nom" : "...",
            "prix" : 45,
            "description" : "...",
            "img": "nom du fichier.jpg"
        },
        {
        	"id" : 3,
            "nom" : "...",
            "prix" : 2,
            "description" : "...",
            "img": "nom du fichier.jpg"
        }, ...
    ]
8-Ajouter bootstrap à votre projet (si vous avez le besoin)
9-Créer votre nav avec :
	->le titre du site
    ->le logo
    ->un bouton panier
10-Créer votre footer

11 – Créer une fonction JS pour récupérer les données du JSON

	->Créer une fonction listObject() avec fetch() pour lire le fichier data.json.
	->Gérer les erreurs avec un bloc try...catch.
	->Afficher les données dans la console avec console.log() pour vérifier.
    ->créer une fonction load pour récupérer les objets à partir du fichier JSON

12 – Afficher dynamiquement les cartes produits
	Créer une fonction card(objet) qui :
        ->crée une carte Bootstrap avec l’image, le nom, la description et le prix.
        ->ajoute un bouton "Acheter".
        ->ajoute à la fonction load() une boucle pour afficher chaque carte avec les objets.
