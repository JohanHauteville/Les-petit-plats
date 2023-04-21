//////// CODE DES FONCTIONS DE RECHERCHE /////////

import { recipes } from '../../data/recipes.js'
import { displayFilterTags } from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'
import { isStringFound } from '../utils/filter.js'
import { recipesFactory } from '../factories/recipesFactory.js'
import { deleteCopiesInArray } from '../pages/index.js'


let arrayOfRecipesToDisplay = []

// FONCTION DE RECHERCHE PRINCIPALE
export function Research() {
    arrayOfRecipesToDisplay = []

    // Copies du tableau de recettes ainsi que du tableau de critère de recherche
    let copyOfRecipes = deleteCopiesInArray(recipes)
    let copyOfResearch = deleteCopiesInArray(arrayOfResearch)


    // POUR CHAQUE CRITERES DE RECHERCHE
    for (let indexPrincipal = 0; indexPrincipal < copyOfResearch.length; indexPrincipal++) {
        if (copyOfResearch[indexPrincipal].section === 'INGREDIENTS') {
            for (let i = 0; i < copyOfRecipes.length; i++) {
                researchIngredient(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
            }
        } else if (copyOfResearch[indexPrincipal].section === 'USTENSILS') {
            for (let i = 0; i < copyOfRecipes.length; i++) {
                researchUstensils(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
            }
        } else if (copyOfResearch[indexPrincipal].section === 'APPAREILS') {
            for (let i = 0; i < copyOfRecipes.length; i++) {
                researchAppareils(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
            }
        } else if (copyOfResearch[indexPrincipal].section === 'Principal') {
            for (let i = 0; i < copyOfRecipes.length; i++) {
                researchName(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
                researchDescription(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
                researchIngredient(copyOfResearch[indexPrincipal].words, copyOfRecipes[i])
            }
        } else {
            console.log('Pas de filtre correspondant');
        }
        // SUPPRIME LES DOUBLONS

        copyOfRecipes = deleteCopiesInArray(arrayOfRecipesToDisplay)
        //ON VIDE LE TABLEAU QUI RECOIT LES RECETTES A AFFICHER
        arrayOfRecipesToDisplay = []
    }

    const presenceOfPError = document.querySelector('.no-result')
    //Test si le NODE existe déjà et le supprime si c'est le cas pour éviter les doublons
    if (presenceOfPError != undefined) {
        presenceOfPError.remove()
    }


    // SI le tableau de recettes est vide et donc qu'aucune recette de correspond aux critères de recherche
    // on affiche alors le message
    if (copyOfRecipes.length <= 0) {
        const grille = document.querySelector('main')
        const info = document.createElement('p')
        info.textContent = ` Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`
        info.setAttribute("class", 'no-result')
        grille.appendChild(info)
    }

    // affiche les recettes correspondantes aux critères de recherche
    displayRecipes(copyOfRecipes)
    // affiche les liste de tags possibles correspondantes aux critères de recherche
    displayFilterTags(copyOfRecipes, '')
}

// FONCTION DE RECHERCHE PAR NOM
function researchName(word, listOfRecipes) {
    if (isStringFound(listOfRecipes.name.toLowerCase(), word.toLowerCase())) {
        // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION DE RECHERCHE PAR DESCRIPTION
function researchDescription(word, listOfRecipes) {
    if (isStringFound(listOfRecipes.description.toLowerCase(), word.toLowerCase())) {
        // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION DE RECHERCHE PAR INGRÉDIENTS
function researchIngredient(word, listOfRecipes) {
    //const testNumber = listOfRecipes.ingredients.map(e => e.ingredient.toLowerCase().includes(word.toLowerCase()));
    let testNumber = []
    for (let i = 0; i < listOfRecipes.ingredients.length; i++) {
        if (isStringFound(listOfRecipes.ingredients[i].ingredient.toLowerCase(), word.toLowerCase())) {
            testNumber.push(true);
        } else {
            testNumber.push(false);
        }
    }
    for (let i = 0; i < testNumber.length; i++) {
        if (testNumber[i]) {
            // Ajoute la recette au tableau de recette à afficher
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    }
}

// FONCTION DE RECHERCHE PAR USTENSILES
function researchUstensils(word, listOfRecipes) {
    let testNumber = []
    for (let i = 0; i < listOfRecipes.ustensils.length; i++) {
        if (isStringFound(listOfRecipes.ustensils[i].toLowerCase(), word.toLowerCase())) {
            testNumber.push(true);
        } else {
            testNumber.push(false);
        }
    }
    for (let i = 0; i < testNumber.length; i++) {
        if (testNumber[i]) {
            // Ajoute la recette au tableau de recette à afficher
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    }
}

// FONCTION DE RECHERCHE PAR APPAREILS
function researchAppareils(word, listOfRecipes) {
    if (listOfRecipes.appliance.toLowerCase() === word.toLowerCase()) {
        // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION D'AFFICHAGE DES RECETTES
function displayRecipes(data) {
    const arrayOfRecipes = document.querySelector('.recettes-grille')
    // vide les recettes déjà présente avant d'ajouter les nouvelles
    arrayOfRecipes.innerHTML = ''
    // Créer la card recette pour chacune des recette présente dans "data"
    for (let index = 0; index < data.length; index++) {
        const factorizedRecipe = recipesFactory(data[index])
        const recipesDOM = factorizedRecipe.getRecipesDOM()
        arrayOfRecipes.appendChild(recipesDOM)
    }
}