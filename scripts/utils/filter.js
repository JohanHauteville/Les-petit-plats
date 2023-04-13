import {startResearch} from './searchBar.js'
import {recipes} from '../../data/recipes.js'
import { arrayOfResearch } from '../pages/index.js'
import {arrayOfElementsToShow} from './searchBar.js'

const arrayOfFilter = document.querySelectorAll("input.filter ")
const arrayOfUL = document.querySelectorAll('.filter__list')
let arrayOfFilterTag=[]

arrayOfFilter.forEach(filter =>{   
    filter.addEventListener("focus",function(){
        const id = filter.parentNode.getAttribute("id")
        filter.setAttribute("data-filter-open","")
        filter.parentNode.removeAttribute("class")
        filter.parentNode.setAttribute("class","chevron-down")
        filter.nextElementSibling.style.display = "grid"

        handlePlaceholder(id,filter)
    })
    // filter.addEventListener("focusout",function(){
    //     const id = filter.parentNode.getAttribute("id")
    //     filter.parentNode.removeAttribute("class")
    //     filter.parentNode.setAttribute("class","chevron-up")
    //     filter.nextElementSibling.style.display = "none"
    //     handlePlaceholder(id,filter)
    //     filter.removeAttribute("data-filter-open")
    // })
})

export default function closeFilter(filter){
    const id = filter.parentNode.getAttribute("id")
    filter.parentNode.removeAttribute("class")
    filter.parentNode.setAttribute("class","chevron-up")
    filter.style.display = "none"
    handlePlaceholder(id,filter.previousElementSibling)
    filter.previousElementSibling.removeAttribute("data-filter-open")
}


function handlePlaceholder(id,filter){
    const placeholder = filter.getAttribute("placeholder")
    switch (id) {
        case "filter-1":
            if(placeholder==="Ingrédients"){
                filter.setAttribute("placeholder",`Rechercher un ingrédient`)
            }else{
                filter.setAttribute("placeholder",`Ingrédients`)
            }
            break;
        case "filter-2":
            if(placeholder==="Appareils"){
            filter.setAttribute("placeholder",`Rechercher un appareil`)
            }else{
                filter.setAttribute("placeholder",`Appareils`)
            }
        break;
        case "filter-3":
            if(placeholder==="Ustensiles"){
                filter.setAttribute("placeholder",`Rechercher un ustensile`)
                }else{
                    filter.setAttribute("placeholder",`Ustensiles`)
                }
        break;
    
        default:
            break;
    }
}

export function AddTag(filter,tag){
    let testDoublon = 0
    arrayOfFilterTag.map(e=>{
        if(e.tag===tag){
            testDoublon++
        }
    })
    if(testDoublon===0){
        let newObject = {
            filter : filter,
            tag : tag
        }
        arrayOfResearch.push({section : filter, words : tag})
        arrayOfFilterTag.push(newObject)
        showTag()
    }
    console.log(arrayOfResearch);
}

function showTag(){
    const sectionOfIngredientsTag = document.querySelector('.filter-tags.filter-tags--ingredients')
    sectionOfIngredientsTag.innerHTML=''
    const sectionOfAppareilsTag = document.querySelector('.filter-tags.filter-tags--appareils')
    sectionOfAppareilsTag.innerHTML=''
    const sectionOfUstensilsTag = document.querySelector('.filter-tags.filter-tags--ustensils')
    sectionOfUstensilsTag.innerHTML=''

    arrayOfFilterTag.forEach(element =>{
        const selectorToDisplay = `.filter-tags.filter-tags--${element.filter.toLowerCase()}`
        const tagSection = document.querySelector(selectorToDisplay)
        const newTag = document.createElement('div')
        const newTagName = document.createElement('p')
        const newTagCloseIcon = document.createElement('i')
        newTagCloseIcon.setAttribute('class',"fa-regular fa-circle-xmark")
        
        ///// CLOSE TAG////
        newTagCloseIcon.addEventListener('click',e=>{
            const indexToRemove = searchTag(element.tag)
            arrayOfFilterTag.splice(indexToRemove,1)
            const indexOfResearchToRemove = arrayOfResearch.map(e=>e.words).indexOf(element.tag)
            arrayOfResearch.splice( indexOfResearchToRemove,1)
            console.log(arrayOfResearch);
            showTag()
        })
        newTag.setAttribute("class",`btn-tag btn-tag--${element.filter.toLowerCase()}`)
        newTagName.innerText=element.tag
        newTag.appendChild(newTagName)
        newTag.appendChild(newTagCloseIcon)
        tagSection.appendChild(newTag)
    })

    // AJOUTER ICI LA FONCTION DE MISE A JOUR DU TABLEAU
}

function searchTag(occurence){
    return (arrayOfFilterTag.map(e=>e.tag).indexOf(occurence))
}

const changeOnArrayOfFilterTag = document.querySelector('.filter-tags--ingredients')
changeOnArrayOfFilterTag.addEventListener('DOMNodeInserted',e=>{
    const arrayToFilter = [...new Set(arrayOfElementsToShow)]
    console.log(`AJOUT DETECTÉ`);
    if(arrayOfFilterTag.length>0){
        arrayOfFilterTag.forEach(element => {
            // console.log(`nom a rechercher :${element.tag}`);
            // console.log(`tableau avant :`);
            // console.log(arrayToFilter);

            startResearch(e,element.tag,arrayToFilter)
            // console.log(`tableau après :`);
            // console.log(arrayToFilter);
            // console.log(`tableau genetal après :`);
            // console.log(arrayOfElementsToShow);
        }); 
    } else {
        console.log('tableau vide');
        startResearch(e,'no')
        // arrayOfElementsToShow= [...new Set(recipes)]

    }
})
changeOnArrayOfFilterTag.addEventListener('DOMNodeRemoved',e=>{
    const arrayToFilter = [...new Set(recipes)]
    console.log(`SUPPRESSION DETECTÉE`);
    if(arrayOfFilterTag.length>0){
        arrayOfFilterTag.forEach(element => {
            // console.log(`nom a rechercher :${element.tag}`);
            // console.log(`tableau avant :`);
            // console.log(arrayToFilter);

            startResearch(e,element.tag,arrayToFilter)
            // console.log(`tableau après :`);
            // console.log(arrayToFilter);
            // console.log(`tableau genetal après :`);
            // console.log(arrayOfElementsToShow);
        }); 
    } else {
        console.log('tableau vide');
        startResearch(e,'no')
        // arrayOfElementsToShow= [...new Set(recipes)]

    }
})


//   // Selectionne le noeud dont les mutations seront observées
// //var targetNode = document.getElementById('some-id');

// // Options de l'observateur (quelles sont les mutations à observer)
// var config = { attributes: true, childList: true };

// // Fonction callback à éxécuter quand une mutation est observée
// var callback = function(mutationsList) {
//     for(var mutation of mutationsList) {
//         if (mutation.type == 'childList') {
//             console.log('Un noeud enfant a été ajouté ou supprimé.');
//         }
//         else if (mutation.type == 'attributes') {
//             console.log("L'attribut '" + mutation.attributeName + "' a été modifié.");
//         }
//     }
// };

// // Créé une instance de l'observateur lié à la fonction de callback
// var observer = new MutationObserver(callback);

// // Commence à observer le noeud cible pour les mutations précédemment configurées
// observer.observe(changeOnArrayOfFilterTag, config);