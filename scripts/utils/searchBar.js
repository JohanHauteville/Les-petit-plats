import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'


const searchBar = document.getElementById('search')
let valueOfResearch
searchBar.addEventListener('input',startResearch)
export let arrayOfElementsToShow= [...new Set(recipes)]




export function startResearch(e,word,list){
    if(word===undefined){
        valueOfResearch = e.target.value
        if(valueOfResearch.length>=3){
            //Permet d'ajouter la phrase de recherche principale dans un tableau de recherche
            const principalWord = { section: "Principal", words : valueOfResearch}
            arrayOfResearch.forEach((element,index)=>{
            //Vérifie si une phrase est déjà présente
                if(element.section.indexOf('Principal')===0){
                    arrayOfResearch.splice(index,1)
                }
            })
        //Ajoute la phrase principale au tableau de recherche
        arrayOfResearch.push(principalWord)
        }else{
            arrayOfResearch.forEach((element,index)=>{
                //Vérifie si une phrase est déjà présente
                    if(element.section.indexOf('Principal')===0){
                        arrayOfResearch.splice(index,1)
                    }
            })
        }
    }else{
        valueOfResearch = word
    }

    if(valueOfResearch.length>=3){


        const resultLength = filterRecipes(valueOfResearch,list)
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
        displayFilterTags(recipes,'')

    }
}

function filterRecipes(wordOfResearch,listOfRecipes = recipes){
    arrayOfElementsToShow=[]
    listOfRecipes.forEach(recipe=>{
        if(researchName(wordOfResearch,recipe)){
        }else if(researchDescription(wordOfResearch,recipe)){
        }else if(researchIngredient(wordOfResearch,recipe)){
        }
    })
    displayRecipes(arrayOfElementsToShow)
    displayFilterTags(arrayOfElementsToShow,'') 
    if(arrayOfElementsToShow.length<=0){
        return false
    }else{
        return true
    }
}

export function researchName(word,recipe){
    if((recipe.name.toLocaleLowerCase().search(word.toLocaleLowerCase())>=0)){
        arrayOfElementsToShow.push(recipe)
        return true
    }else{
        return false
    }
}

export function researchDescription(word,recipe){
    if((recipe.description.toLocaleLowerCase().search(word.toLocaleLowerCase())>=0)){
        arrayOfElementsToShow.push(recipe)
        return true
    }else{
        return false
    }
}

export function researchIngredient(word,recipe){
    const testNumber = recipe.ingredients.map(e=>e.ingredient.toLocaleLowerCase().search(word.toLocaleLowerCase())); 
    testNumber.forEach(element =>{
        if(element>=0){
            arrayOfElementsToShow.push(recipe)
            return true
        }else{
            return false
        }
    })


}