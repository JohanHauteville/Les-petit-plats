
import { AddTag } from '../utils/filter.js'
import closeFilter from '../utils/filter.js'
import { Research } from '../utils/researchFct.js'

// Initialisation de la variable qui contiendra la totalité des crières de recherche
export let arrayOfResearch = []



// FONCTION D'AFFICHAGE DE LA LISTE DE TAG POUR LE/LES FILTRES
export function displayFilterTags(data, filter) {
    let array = []              //initialisation du tableau d'affichage
    let listForFilterTags       //initialisation du selecteur utilisé pour ciblé les filtres

    // Chaque condition ajoutera l'intégralité des tags contenus dans "data" en fonction du filtre spécifié
    if (filter === 'INGREDIENTS') {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            for (let j = 0; j < data[index].ingredients.length; j++) {
                const element = data[index][j];
                array.push(data[index].ingredients[j].ingredient.toLowerCase())
            }
        }
        listForFilterTags = document.querySelector('.filter.filter__list.filter--ingredients')
        listForFilterTags.innerHTML = ""
    } else if (filter === 'USTENSILS') {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let j = 0; j < data[i].ustensils.length; j++) {
                const element = array[j];
                array.push(data[i].ustensils[j].toLowerCase())
            }
        }
        listForFilterTags = document.querySelector('.filter.filter__list.filter--ustensiles')
        listForFilterTags.innerHTML = ""
    } else if (filter === 'APPAREILS') {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            array.push(data[i].appliance.toLowerCase())
        }
        listForFilterTags = document.querySelector('.filter.filter__list.filter--appareils')
        listForFilterTags.innerHTML = ""
    } else if (filter === '') {
        // Si rien n'est spécifié alors nous allons utiliser la récurrence pour afficher l'intégralité des filtres
        displayFilterTags(data, 'INGREDIENTS')
        displayFilterTags(data, 'USTENSILS')
        displayFilterTags(data, 'APPAREILS')
    } else {
        console.log('Pas de filtre correspondant');
    }
    // permet de supprimer les doublons contenus dans le tableau
    const arrayOfUniqueElement = deleteCopiesInArray(array)


    // Dans les filtrages précédents nous avons formater les tags pour n'utiliser que les minuscules
    // Cela permet d'éviter les problèmes d'affichage (des majuscules en trop,..)
    // ICI nous allons faire en sort que seule la première lettre soit en majuscule

    for (let i = 0; i < arrayOfUniqueElement.length; i++) {
        arrayOfUniqueElement[i] = arrayOfUniqueElement[i][0].toUpperCase() + arrayOfUniqueElement[i].slice(1)
    }

    // création pour chaque tag contenu dans le tableau d'un list item
    for (let i = 0; i < arrayOfUniqueElement.length; i++) {
        const listItem = document.createElement('li')
        // Lors du click, on ferme le filtre puis on ajoute le tag dans le tableau des critères de recherche
        listItem.addEventListener('click', e => {
            closeFilter(listForFilterTags)
            AddTag(filter, arrayOfUniqueElement[i])
        })
        listItem.textContent = arrayOfUniqueElement[i]
        listForFilterTags.appendChild(listItem)
    }



    return arrayOfUniqueElement;
}

// FONCTION D'INITIALISATION DE LA PAGE
function init() {
    // initialise une première recherche sans critères
    // et donc retourne l'intégralité des recettes et des filtres
    Research()
}


// DÉMARRE L'INITIALISATION DE LA PAGE
init()


// FONCTION DE SUPPRESSION DES DOUBLONS DANS UN TABLEAU
function deleteCopiesInArray(arrayToCompare) {
    let arrayToReturn = []
    // pour chacunes des itérations ..
    for (let i = 0; i < arrayToCompare.length; i++) {
        // si le tableau à retourner est videe ...
        if (arrayToReturn.length === 0) {
            // on ajoute la première itérations de notre tableau à comparer
            arrayToReturn.push(arrayToCompare[i])
        }
        //on récupère la taille du tableau à retourner pour pouvoir comparer la nouvell itération à chaque élement présent dans notre tableau à retourner
        let length = arrayToReturn.length

        for (let j = 0; j < length+1; j++) {

            // si la valeur de notre tableau à comparer est déjà présente dans notre tableau à retourner, alors on passe à l'itération suivante
            if (arrayToCompare[i] === arrayToReturn[j]) {
                break;
            }
            // Si on arrive à la dernière valeur à comparer sans avoir été break alors on ajoute la valeur à notre tableau à retourner
            if (j >= length) {
                arrayToReturn.push(arrayToCompare[i])
            }
        }
    }
    return arrayToReturn
}

