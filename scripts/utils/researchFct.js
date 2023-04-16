import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'

let arrayOfRecipesToDisplay=[]

export function Research(){
    arrayOfRecipesToDisplay=[]

    let copyOfRecipes = [...new Set(recipes)]
    let copyOfResearch = [...new Set(arrayOfResearch)]
    console.log(copyOfResearch);

    copyOfResearch.forEach(research=>{
        if(research.section==='INGREDIENTS'){
            copyOfRecipes.forEach(recipe=>{
                researchIngredient(research.words,recipe)
            })
        }else if(research.section==='USTENSILS'){
            console.log("Ustensile trouvé");
            copyOfRecipes.forEach(recipe=>{
                researchUstensils(research.words,recipe)
            })
    
        }else if(research.section==='APPAREILS'){
            console.log("Appareil trouvé");
            
            copyOfRecipes.forEach(recipe=>{
                researchAppareils(research.words,recipe)
            })
    
        } else if(research.section==='Principal'){
            console.log("Phrase principale trouvé");
            console.log();
            copyOfRecipes.forEach(recipe=>{
                researchName(research.words,recipe)
                researchDescription(research.words,recipe)
                researchIngredient(research.words,recipe)
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

export function researchName(word,listOfRecipes){
    if(listOfRecipes.name.toLowerCase().includes(word.toLowerCase())){
        arrayOfRecipesToDisplay.push(listOfRecipes)

    }
}

export function researchDescription(word,listOfRecipes){
    if(listOfRecipes.description.toLowerCase().includes(word.toLowerCase())){
        arrayOfRecipesToDisplay.push(listOfRecipes)

    }
}

export function researchIngredient(word,listOfRecipes){
    const testNumber = listOfRecipes.ingredients.map(e=>e.ingredient.toLowerCase().includes(word.toLowerCase())); 
    testNumber.forEach(element =>{
        if(element){
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    })
}

export function researchUstensils(word,listOfRecipes){
    const testNumber = listOfRecipes.ustensils.map(e=>e.toLowerCase().includes(word.toLowerCase())); 
    testNumber.forEach(element =>{
        if(element){
            arrayOfRecipesToDisplay.push(listOfRecipes)
        }
    })
}

export function researchAppareils(word,listOfRecipes){
    if(listOfRecipes.appliance.toLowerCase()===word.toLowerCase()){
        arrayOfRecipesToDisplay.push(listOfRecipes)
    }
}