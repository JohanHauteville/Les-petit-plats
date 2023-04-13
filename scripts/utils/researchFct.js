import {recipes} from '../../data/recipes.js'
import displayRecipes from '../pages/index.js'
import {displayFilterTags} from '../pages/index.js'
import { arrayOfResearch } from '../pages/index.js'

let arrayOfRecipesToDisplay=[]

export function Research(){
    let copyOfRecipes = [...new Set(recipes)]
    let copyOfResearch = [...new Set(arrayOfResearch)]
    copyOfResearch.forEach(research=>{
        if(research.section==='INGREDIENTS'){
            console.log("Ingredient trouvé");
        }else if(research.section==='USTENSILS'){
            console.log("Ustensile trouvé");

    
        }else if(research.section==='APPAREILS'){
            console.log("Appareil trouvé");

    
        } else if(research.section==='Principal'){
            console.log("Phrase principale trouvé");

            // arrayOfIngredientsTag = displayFilterTags(data,'INGREDIENTS')
            // arrayOfUstensilsTag = displayFilterTags(data,'USTENSILS')
            // arrayOfAppareilsTag = displayFilterTags(data,'APPAREILS')
        }else{
            console.log('Pas de filtre correspondant');
        }
    })
}

