//////// CODE DE LA BARRE DE RECHERCHE PRINCIPALE /////////

import { recipes } from '../../data/recipes.js'
import { arrayOfResearch } from '../pages/index.js'
import { Research } from '../utils/researchFct.js'

const searchBar = document.getElementById('search')
let valueOfResearch
export let arrayOfElementsToShow = [...new Set(recipes)]

// EVENT LISTENER SUR LA VALEUR DE L'INPUT DE RECHERCHE PRINCIPAL
searchBar.addEventListener('input', startResearch)

// FONCTION DE LANCEMENT DE LA RECHERCHE PRINCIPALE
function startResearch(e) {
    valueOfResearch = e.target.value
    if (valueOfResearch.length >= 3) {
        //Permet d'ajouter la phrase de recherche principale dans un tableau de critère recherche
        const principalWord = { section: "Principal", words: valueOfResearch }

        // for (let i = 0; i < arrayOfResearch.length; i++) {
        //     if(arrayOfResearch[i]==='Principal'){

        //     }
            
        // }

        arrayOfResearch.forEach((element, index) => {
            //Vérifie si une phrase est déjà présente
            if (element.section.indexOf('Principal') === 0) {
                // Supprime la phrase existante
                arrayOfResearch.splice(index, 1)
            }
        })
        //Ajoute la phrase principale au tableau de critères recherche
        arrayOfResearch.push(principalWord)

        //Lancement de la recherche
        Research()

    } else {
        arrayOfResearch.forEach((element, index) => {
            //Vérifie si une phrase est déjà présente
            if (element.section.indexOf('Principal') === 0) {
                // Supprime la phrase existante
                arrayOfResearch.splice(index, 1)
            }
        })

        //Lancement de la recherche
        Research()
    }

}

