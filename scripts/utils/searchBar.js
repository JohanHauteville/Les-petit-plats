import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'


const searchBar = document.getElementById('search')
let valueOfResearch
searchBar.addEventListener('input',startResearch)


function startResearch(e){
    valueOfResearch = e.target.value
    if(valueOfResearch.length>=3){
        const resultLength = filterRecipes(valueOfResearch)
        console.log(resultLength);
        if(!resultLength){
            const grille = document.querySelector('.recettes-grille')
            const info = document.createElement('p')
            info.innerText=` Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc.`
            info.setAttribute("class",'no-result')
            grille.appendChild(info)
        }

    } else {
        displayRecipes(recipes)

    }
}

function filterRecipes(wordOfResearch){
    let arrayOfElementsToShow=[]
    recipes.forEach(recipe=>{
        if((recipe.name.toLocaleLowerCase().search(wordOfResearch.toLocaleLowerCase())>=0)){
            arrayOfElementsToShow.push(recipe)
        }else if((recipe.description.toLocaleLowerCase().search(wordOfResearch.toLocaleLowerCase())>=0)){
            arrayOfElementsToShow.push(recipe)
        }
        // }else if((recipe.ingredients.toLocaleLowerCase().search(wordOfResearch.toLocaleLowerCase())>=0)){
        //     arrayOfElementsToShow.push(recipe)
        // }
    })
    displayRecipes(arrayOfElementsToShow)
    displayFilterTags(arrayOfElementsToShow,'') 
    if(arrayOfElementsToShow.length<=0){
        return false
    }else{
        return true
    }
}