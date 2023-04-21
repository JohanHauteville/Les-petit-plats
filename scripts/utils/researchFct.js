//////// CODE DES FONCTIONS DE RECHERCHE /////////

import { recipes } from '../../data/recipes.js'
import {recipesFactory} from '../factories/recipesFactory.js'
import { displayFilterTags } from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'

let arrayOfRecipesToDisplay = []

// FONCTION DE RECHERCHE PRINCIPALE
export function Research() {
    arrayOfRecipesToDisplay = []

    // Copies du tableau de recettes ainsi que du tableau de critère de recherche
    let copyOfRecipes = [...new Set(recipes)]
    let copyOfResearch = [...new Set(arrayOfResearch)]

    // POUR CHAQUE CRITERES DE RECHERCHE
    copyOfResearch.forEach(research => {
        if (research.section === 'INGREDIENTS') {
            copyOfRecipes.forEach(recipe => {
                researchIngredient(research.words, recipe)
            })
        } else if (research.section === 'USTENSILS') {
            copyOfRecipes.forEach(recipe => {
                researchUstensils(research.words, recipe)
            })
        } else if (research.section === 'APPAREILS') {
            copyOfRecipes.forEach(recipe => {
                researchAppareils(research.words, recipe)
            })

        } else if (research.section === 'Principal') {
            copyOfRecipes.forEach(recipe => {
                researchName(research.words, recipe)
                researchDescription(research.words, recipe)
                researchIngredient(research.words, recipe)
            })
        } else {
            console.log('Pas de filtre correspondant');
        }
        // SUPPRIME LES DOUBLONS
        copyOfRecipes = [...new Set(arrayOfRecipesToDisplay)]
        //ON VIDE LE TABLEAU QUI RECOIT LES RECETTES A AFFICHER
        arrayOfRecipesToDisplay = []
    })

    const presenceOfPError = document.querySelector('.no-result')
    //Test si le NODE existe déjà et le supprime si c'est le cas pour eviter les doublons
    presenceOfPError ? presenceOfPError.remove() : null

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
    if (listOfRecipes.name.toLowerCase().includes(word.toLowerCase())) {
        // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION DE RECHERCHE PAR DESCRIPTION
function researchDescription(word, listOfRecipes) {
    if (listOfRecipes.description.toLowerCase().includes(word.toLowerCase())) {
       // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION DE RECHERCHE PAR INGRÉDIENTS
function researchIngredient(word, listOfRecipes) {
    const testNumber = listOfRecipes.ingredients.map(e => e.ingredient.toLowerCase().includes(word.toLowerCase()));
    testNumber.forEach(element => {
        if (element) {
            // Ajoute la recette au tableau de recette à afficher
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    })
}

// FONCTION DE RECHERCHE PAR USTENSILES
function researchUstensils(word, listOfRecipes) {
    const testNumber = listOfRecipes.ustensils.map(e => e.toLowerCase().includes(word.toLowerCase()));
    testNumber.forEach(element => {
        if (element) {
            // Ajoute la recette au tableau de recette à afficher
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    })
}

// FONCTION DE RECHERCHE PAR APPAREILS
function researchAppareils(word, listOfRecipes) {
    if (listOfRecipes.appliance.toLowerCase() === word.toLowerCase()) {
        // Ajoute la recette au tableau de recette à afficher
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}

// FONCTION D'AFFICHAGE DES RECETTES
function displayRecipes(data){
    const arrayOfRecipes = document.querySelector('.recettes-grille')
    // vide les recettes déjà présente avant d'ajouter les nouvelles
    arrayOfRecipes.innerHTML=''
    // Créer la card recette pour chacune des recette présente dans "data"
    data.forEach(recipe => {
        const factorizedRecipe = recipesFactory(recipe)
        const recipesDOM = factorizedRecipe.getRecipesDOM()
        arrayOfRecipes.appendChild(recipesDOM)
    });
    
}