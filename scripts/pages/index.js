import {recipes} from '../../data/recipes.js'
import {recipesFactory} from '../factories/recipesFactory.js'


function displayRecipes(data){
    const arrayOfRecipes = document.querySelector('.recettes-grille')
    data.forEach(recipe => {
        const factorizedRecipe = recipesFactory(recipe)
        const recipesDOM = factorizedRecipe.getRecipesDOM()
        arrayOfRecipes.appendChild(recipesDOM)
    });
}

async function init(){
    const importedRecipes = recipes
    displayRecipes(importedRecipes)
    
}



init()