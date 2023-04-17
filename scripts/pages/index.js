import {recipes} from '../../data/recipes.js'
import {recipesFactory} from '../factories/recipesFactory.js'
import {AddTag} from '../utils/filter.js'
import closeFilter from '../utils/filter.js'
import { Research } from '../utils/researchFct.js'


export let arrayOfResearch=[]
let arrayOfIngredientsTag
let arrayOfUstensilsTag
let arrayOfAppareilsTag

// FONCTION D'AFFICHAGE DES RECETTES
export default function displayRecipes(data){
    const arrayOfRecipes = document.querySelector('.recettes-grille')
    // vide les recettes déjà présente avant d'ajouter les nouvelles
    arrayOfRecipes.innerHTML=''
    
    data.forEach(recipe => {
        const factorizedRecipe = recipesFactory(recipe)
        const recipesDOM = factorizedRecipe.getRecipesDOM()
        arrayOfRecipes.appendChild(recipesDOM)
    });
    
}

export function displayFilterTags(data,filter){
    let array=[]
    let listForFilterTags
    if(filter==='INGREDIENTS'){
        data.map(ingr => ingr.ingredients.map(element =>array.push(element.ingredient.toLowerCase())))
        listForFilterTags = document.querySelector('.filter.filter__list.filter--ingredients')
        listForFilterTags.innerHTML=""
    }else if(filter==='USTENSILS'){
        data.map(ust => ust.ustensils.map(  element =>array.push(element.toLowerCase())))
         listForFilterTags = document.querySelector('.filter.filter__list.filter--ustensiles')
        listForFilterTags.innerHTML=""

    }else if(filter==='APPAREILS'){
        data.map(element =>array.push(element.appliance.toLowerCase()))
         listForFilterTags = document.querySelector('.filter.filter__list.filter--appareils')
        listForFilterTags.innerHTML=""

    } else if(filter===''){
        arrayOfIngredientsTag = displayFilterTags(data,'INGREDIENTS')
        arrayOfUstensilsTag = displayFilterTags(data,'USTENSILS')
        arrayOfAppareilsTag = displayFilterTags(data,'APPAREILS')
    }else{
        console.log('Pas de filtre correspondant');
    }
    
    const arrayOfUniqueElement=[...new Set(array)]
    arrayOfUniqueElement.forEach(function (part,index){
        arrayOfUniqueElement[index] = part.charAt(0).toUpperCase() + part.slice(1)
    })
    
    arrayOfUniqueElement.forEach(tag=>{
        const listItem = document.createElement('li')
        listItem.addEventListener('click',e=>{
            console.log("click sur liste");
            closeFilter(listForFilterTags)
            AddTag(filter,tag)
        })
        listItem.textContent = tag
        listForFilterTags.appendChild(listItem)
    })
    return arrayOfUniqueElement;
}

// FONCTION D'INITIALISATION DE LA PAGE
function init(){
    // initialise une première recherche sans critères
    // et donc retourne l'intégralité des recettes et des filtres
    Research()
}



init()