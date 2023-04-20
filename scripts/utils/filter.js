//////// CODE DES FILTRES /////////


import { arrayOfResearch } from '../pages/index.js'
import { Research } from './researchFct.js'

const arrayOfFilter = document.querySelectorAll("input.filter ")

// initialisation de la variable qui contiendra la totalité des tags affichés à l'utilisateur
let arrayOfFilterTag = []

// POUR CHACUN DES FILTRES PRÉSENTS...
for (let indexOfArray = 0; indexOfArray < arrayOfFilter.length; indexOfArray++) {


    // EVENTLISTENER placé sur le FOCUS de l'INPUT
    arrayOfFilter[indexOfArray].addEventListener("focus", function () {
        const id = arrayOfFilter[indexOfArray].parentNode.getAttribute("id")
        arrayOfFilter[indexOfArray].setAttribute("data-filter-open", "")

        // On écrase la classe pour mettre "chevron-down" qui représente l'icone du chevron vers le bas
        arrayOfFilter[indexOfArray].parentNode.removeAttribute("class")
        arrayOfFilter[indexOfArray].parentNode.setAttribute("class", "chevron-down")

        // L'élément suivant de même niveau est affiché en grid (il représente la liste des tags à sélectionner)
        arrayOfFilter[indexOfArray].nextElementSibling.style.display = "grid"

        // Affiche le "placeholder" adéquat lors du blur et onblur
        handlePlaceholder(id, arrayOfFilter[indexOfArray])
    })

    // EVENTLISTENER placé sur la VALEUR de l'INPUT
    arrayOfFilter[indexOfArray].addEventListener("input", e => {

        // on récupère un tableau de tous les <li> (tags) qu'il contient
        const arraytotest = arrayOfFilter[indexOfArray].nextElementSibling.querySelectorAll("li")
        // Si l'utilisateur à tapé 3 caractères ou plus ...
        if (e.target.value.length >= 3) {
            for (let i = 0; i < arraytotest.length; i++) {
                if (isStringFound(arraytotest[i].innerText.toLowerCase() ,e.target.value.toLowerCase())) {
                    arraytotest[i].style.display = "inline"
                } else {
                    arraytotest[i].style.display = "none"
                }
            }
        } else {
            // ... Sinon on affiche l'intégralité des <li>
            for (let i = 0; i < arraytotest.length; i++) {
                arraytotest[i].style.display = "inline"
            }
        }

    })

    // EVENTLISTENER placé sur le BLUR de l'INPUT
    arrayOfFilter[indexOfArray].addEventListener("blur", function () {
        // On affiche de nouveau le chevron vers le haut
        const id = arrayOfFilter[indexOfArray].parentNode.getAttribute("id")
        arrayOfFilter[indexOfArray].parentNode.removeAttribute("class")
        arrayOfFilter[indexOfArray].parentNode.setAttribute("class", "chevron-up")

        // Ce setTimout permet de laisser la possibilité de cliquer sur un des éléments de la liste
        // avant que celle-ci ne se referme
        setTimeout(e => {
            arrayOfFilter[indexOfArray].nextElementSibling.style.display = "none"
            arrayOfFilter[indexOfArray].removeAttribute("data-filter-open")
        }, 150)
        handlePlaceholder(id, arrayOfFilter[indexOfArray])
    })
}

// FONCTION DE FERMETURE DE LA LISTE DE TAGS
export default function closeFilter(filter) {
    const id = filter.parentNode.getAttribute("id")
    filter.parentNode.removeAttribute("class")
    filter.parentNode.setAttribute("class", "chevron-up")
    filter.style.display = "none"
    filter.previousElementSibling.removeAttribute("data-filter-open")
}

// FONCTION DE GESTION DU PLACEHOLDER DES FILTRES
function handlePlaceholder(id, filter) {
    const placeholder = filter.getAttribute("placeholder")
    switch (id) {
        case "filter-1":
            if (placeholder === "Ingrédients") {
                filter.setAttribute("placeholder", `Rechercher un ingrédient`)
            } else {
                filter.setAttribute("placeholder", `Ingrédients`)
            }
            break;
        case "filter-2":
            if (placeholder === "Appareils") {
                filter.setAttribute("placeholder", `Rechercher un appareil`)
            } else {
                filter.setAttribute("placeholder", `Appareils`)
            }
            break;
        case "filter-3":
            if (placeholder === "Ustensiles") {
                filter.setAttribute("placeholder", `Rechercher un ustensile`)
            } else {
                filter.setAttribute("placeholder", `Ustensiles`)
            }
            break;

        default:
            break;
    }
}

// FONCTION D'AJOUT D'UN TAG À LA LISTE DES TAG AFFICHÉ AINSI QU'AU TABLEAU DES CRITÈRES
export function AddTag(filter, tag) {
    let testDoublon = 0
    for (let i = 0; i < arrayOfFilterTag.length; i++) {
        if (arrayOfFilterTag[i].tag === tag) {
            testDoublon++
        }
    }
    if (testDoublon === 0) {
        let newObject = {
            filter: filter,
            tag: tag
        }
        arrayOfResearch.push({ section: filter, words: tag })
        arrayOfFilterTag.push(newObject)
        showTag()
    }
}

// FONCTION D'AFFICHAGE DE LA LISTE DE TAGS
function showTag() {

    // On récupère les tags affichés et on vide la liste.
    const sectionOfIngredientsTag = document.querySelector('.filter-tags.filter-tags--ingredients')
    sectionOfIngredientsTag.innerHTML = ''
    const sectionOfAppareilsTag = document.querySelector('.filter-tags.filter-tags--appareils')
    sectionOfAppareilsTag.innerHTML = ''
    const sectionOfUstensilsTag = document.querySelector('.filter-tags.filter-tags--ustensils')
    sectionOfUstensilsTag.innerHTML = ''

    // Pour chaque élément de notre tableau de tag à afficher :
    for (let j = 0; j < arrayOfFilterTag.length; j++) {
       // On récupère le bon filtre (pour respecter l'affichage colorimétrique du filtre)
       const selectorToDisplay = `.filter-tags.filter-tags--${arrayOfFilterTag[j].filter.toLowerCase()}`
       const tagSection = document.querySelector(selectorToDisplay)
       const newTag = document.createElement('div')
       const newTagName = document.createElement('p')
       const newTagCloseIcon = document.createElement('i')
       // On ajoutele bouton de suppression du tag
       newTagCloseIcon.setAttribute('class', "fa-regular fa-circle-xmark")

       // EVENT LISTENER SUR L'ICONE DE FERMETURE DU TAG
       newTagCloseIcon.addEventListener('click', e => {

           // Récupère l'index du tag à supprimer dans le tableau d'affichage des tags
           let indexToRemove = undefined
           for (let i = 0; i < arrayOfFilterTag.length; i++) {
               if(arrayOfFilterTag[i].tag === arrayOfFilterTag[j].tag){
                   indexToRemove = i
               }
           }

           // Récupère l'index du tag à supprimer dans le tableau des critères de recherche
           let indexOfResearchToRemove = undefined 
           for (let i = 0; i < arrayOfResearch.length; i++) {
               if(arrayOfResearch[i].words === arrayOfFilterTag[j].tag){
                   indexOfResearchToRemove = i
               }
           }

            // Supprime le tag du tableau de tag à afficher
            arrayOfFilterTag.splice(indexToRemove, 1)
            // Supprime le tag du tableau des critères de recherche
            arrayOfResearch.splice(indexOfResearchToRemove, 1)

            // Récurrence de la fonction pour afficher les tags mis à jour 
            showTag()
       })
       newTag.setAttribute("class", `btn-tag btn-tag--${arrayOfFilterTag[j].filter.toLowerCase()}`)
       newTagName.innerText = arrayOfFilterTag[j].tag
       newTag.appendChild(newTagName)
       newTag.appendChild(newTagCloseIcon)
       tagSection.appendChild(newTag)
        
    }
}

// Sélectionne les noeuds dont les mutations seront observées
const changeOnIngredientsFilter = document.querySelector('.filter-tags--ingredients')
const changeOnAppareilsFilter = document.querySelector('.filter-tags--appareils')
const changeOnUstensilsFilter = document.querySelector('.filter-tags--ustensils')

// Options de l'observateur (quelles sont les mutations à observer)
let config = { childList: true };

// Créé une instance de l'observateur 
let observer = new MutationObserver(e => {
    Research()
});

// Commence à observer les noeuds cibles pour les mutations précédemment configurées
observer.observe(changeOnIngredientsFilter, config);
observer.observe(changeOnAppareilsFilter, config)
observer.observe(changeOnUstensilsFilter, config)




// FONCTION DE RECHERCHE DE CHAINE DANS UNE CHAINE
function isStringFound( s1,  s2){
    const n1 = s1.length;
    const n2 = s2.length;

    if(n2 === 0)     // Vérification d'absence de chaine à comparer
        return false;

    if(n2 > n1)    // Vérification si la chaine à comparer est plus grande que la chaine source
        return false;

    for(let i = 0; i < s1.length; i++){
        // Si le premier caractère correspond ...
        if(s1.charAt(i) === s2.charAt(0)){ 
            // On vérifie alors si le reste de la chaine correspond
            if(isRestOfTheStringMatch(i+1, s1, s2)) {  
                // si c'est le cas on retourne TRUE...
                return true;
            }     
        }        
    }
    //... Sinon FALSE
    return false;
}

// FONCTION DE RECHERCHE DU RESTE DE LA CHAINE DANS UNE AUTRE CHAINE
function isRestOfTheStringMatch(start, s1, s2){
    const n = s2.length;
    for(let i = start, x = 1; x < n; i++, x++){
        // Si un des caractère suivant de correspond pas ...
        if(s1.charAt(i) != s2.charAt(x)){
            //... on retourne FALSE
            return false           
        }
    }
    // Sinon, si tout se déroule sans incidents, on retourne TRUE pour indiquer que cela correspond
    return true;
}