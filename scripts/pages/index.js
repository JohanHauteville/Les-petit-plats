import {recipes} from '../../data/recipes.js'
import {recipesFactory} from '../factories/recipesFactory.js'
import {AddTag} from '../utils/filter.js'


let arrayOfIngredientsTag
let arrayOfUstensilsTag
let arrayOfAppareilsTag



export default function displayRecipes(data){
    const arrayOfRecipes = document.querySelector('.recettes-grille')
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
    if(filter==='INGREGIENTS'){
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
        arrayOfIngredientsTag = displayFilterTags(data,'INGREGIENTS')
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
            console.log('click!');
            console.log(tag);
        })
        listItem.textContent = tag
        listForFilterTags.appendChild(listItem)
    })
    return arrayOfUniqueElement;
}

async function init(){
    // const importedRecipes = recipes
    displayRecipes(recipes)
    displayFilterTags(recipes,'')
}



init()