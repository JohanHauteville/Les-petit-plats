import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'

let arrayOfRecipesToDisplay=[]

export function Research(){
    arrayOfRecipesToDisplay=[]

    let copyOfRecipes = [...new Set(recipes)]
    let copyOfResearch = [...new Set(arrayOfResearch)]

    copyOfResearch.forEach(research=>{
        if(research.section==='INGREDIENTS'){
            console.log("Ingredient trouvé");

            copyOfRecipes.forEach(recipe=>{
                researchIngredient(research.words,recipe)
            })
            
            
        }else if(research.section==='USTENSILS'){
            console.log("Ustensile trouvé");

    
        }else if(research.section==='APPAREILS'){
            console.log("Appareil trouvé");

    
        } else if(research.section==='Principal'){
            console.log("Phrase principale trouvé");
            copyOfRecipes.forEach(recipe=>{
                if(researchName(research.words,recipe)){
                }else if(researchDescription(research.words,recipe)){
                }else if(researchIngredient(research.words,recipe)){
                }
            })
        }else{
            console.log('Pas de filtre correspondant');
        }
        // SUPPRIME LES DOUBLONS
        copyOfRecipes= [...new Set(arrayOfRecipesToDisplay)]
        //ON VIDE LE TABLEAU QUI RECOIT LES RECETTES A AFFICHER
        arrayOfRecipesToDisplay=[]
    })

    const presenceOfPError = document.querySelector('.no-result')
    //Test si le NODE existe déjà et le supprime si c'est le cas pour eviter les doublons
    presenceOfPError?presenceOfPError.remove():null
    if(copyOfRecipes.length<=0){
        const grille = document.querySelector('main')
        const info = document.createElement('p')
        info.textContent=` Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`
        info.setAttribute("class",'no-result')
        grille.appendChild(info)
    }
    console.log('tableau de Research:');
    console.log(copyOfRecipes);
    displayRecipes(copyOfRecipes)
    displayFilterTags(copyOfRecipes,'')
}

export function researchName(word,recipe){
    if((recipe.name.toLocaleLowerCase().search(word.toLocaleLowerCase())>=0)){
        arrayOfRecipesToDisplay.push(recipe)
        return true
    }else{
        return false
    }
}

export function researchDescription(word,recipe){
    if((recipe.description.toLocaleLowerCase().search(word.toLocaleLowerCase())>=0)){
        arrayOfRecipesToDisplay.push(recipe)
        return true
    }else{
        return false
    }
}

export function researchIngredient(word,recipe){
    const testNumber = recipe.ingredients.map(e=>e.ingredient.toLocaleLowerCase().search(word.toLocaleLowerCase())); 
    testNumber.forEach(element =>{
        if(element>=0){
            //arrayOfRecipesToDisplay.some(recipe=>recipe.)
            arrayOfRecipesToDisplay.push(recipe)
            return true
        }else{
            return false
        }
    })
}
