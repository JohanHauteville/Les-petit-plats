import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'
import { Research } from '../utils/researchFct.js'

const searchBar = document.getElementById('search')
let valueOfResearch
searchBar.addEventListener('input',startResearch)
export let arrayOfElementsToShow= [...new Set(recipes)]



// export function startResearch(e,word){
export function startResearch(e,word){

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
        
        //Lancement de la recherche
        Research()

        }else{
            arrayOfResearch.forEach((element,index)=>{
                //Vérifie si une phrase est déjà présente
                    if(element.section.indexOf('Principal')===0){
                        arrayOfResearch.splice(index,1)
                    }
            })
            displayRecipes(recipes)
            displayFilterTags(recipes,'')
        }

}

