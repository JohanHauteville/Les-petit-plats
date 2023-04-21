
import {AddTag} from '../utils/filter.js'
import closeFilter from '../utils/filter.js'
import { Research } from '../utils/researchFct.js'

// Initialisation de la variable qui contiendra la totalité des crières de recherche
export let arrayOfResearch=[]

// FONCTION D'AFFICHAGE DE LA LISTE DE TAG POUR LE/LES FILTRES
export function displayFilterTags(data,filter){
    let array=[]            //initialisation du tableau d'affichage
    let listForFilterTags   //initialisation du selecteur utilisé pour ciblé les filtres

    // Chaque condition ajoutera l'intégralité des tags contenus dans "data" en fonction du filtre spécifié
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
        // Si rien n'est spécifié alors nous allons utiliser la récurrence pour afficher l'intégralité des filtres
        displayFilterTags(data,'INGREDIENTS')
        displayFilterTags(data,'USTENSILS')
        displayFilterTags(data,'APPAREILS')
    }else{
        console.log('Pas de filtre correspondant');
    }
    // permet de supprimer les doublons contenus dans le tableau
    const arrayOfUniqueElement=[...new Set(array)]

    // Dans les filtrages précédents nous avons formater les tags pour n'utiliser que les minuscules
    // Cela permet d'éviter les problèmes d'affichage (des majuscules en trop,..)
    // ICI nous allons faire en sort que seule la première lettre soit en majuscule
    arrayOfUniqueElement.forEach(function (part,index){
        arrayOfUniqueElement[index] = part.charAt(0).toUpperCase() + part.slice(1)
    })
    
    // création pour chaque tag contenu dans le tableau d'un list item
    arrayOfUniqueElement.forEach(tag=>{
        const listItem = document.createElement('li')
        // Lors du click, on ferme le filtre puis on ajoute le tag dans le tableau des critères de recherche
        listItem.addEventListener('click',e=>{
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


// DÉMARRE L'INITIALISATION DE LA PAGE
init()