//////// CODE DES FILTRES /////////

import { arrayOfResearch } from '../pages/index.js'
import { Research } from './researchFct.js'

const arrayOfFilter = document.querySelectorAll("input.filter ")
// const arrayOfUL = document.querySelectorAll('.filter__list')

// initialisation de la variable qui contiendra la totalité des tags affichés à l'utilisateur
let arrayOfFilterTag = []

// POUR CHACUN DES FILTRES PRÉSENTS...
arrayOfFilter.forEach(filter => {

    // EVENTLISTENER placé sur le FOCUS de l'INPUT
    filter.addEventListener("focus", function () {
        const id = filter.parentNode.getAttribute("id")
        filter.setAttribute("data-filter-open", "")

        // On écrase la classe pour mettre "chevron-down" qui représente l'icone du chevron vers le bas
        filter.parentNode.removeAttribute("class")
        filter.parentNode.setAttribute("class", "chevron-down")

        // L'élément suivant de même niveau est affiché en grid (il représente la liste des tags à sélectionner)
        filter.nextElementSibling.style.display = "grid"

        // Affiche le "placeholder" adéquat lors du blur et onblur
        handlePlaceholder(id, filter)
    })

    // EVENTLISTENER placé sur la VALEUR de l'INPUT
    filter.addEventListener("input", e => {

        // on récupère un tableau de tous les <li> (tags) qu'il contient
        const arraytotest = filter.nextElementSibling.querySelectorAll("li")
        // Si l'utilisateur à tapé 3 caractères ou plus ...
        if (e.target.value.length >= 3) {

            arraytotest.forEach(element => {
                // vérifie si la chaine tapé est présente dans un des <li> (tags)
                if (element.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                    element.style.display = "inline"
                } else {
                    element.style.display = "none"
                }
            })
        } else {
            // ... Sinon on affiche l'intégralité des <li>
            arraytotest.forEach(element => element.style.display = "inline")
        }

    })

    // EVENTLISTENER placé sur le BLUR de l'INPUT
    filter.addEventListener("blur", function () {
        // On affiche de nouveau le chevron vers le haut
        const id = filter.parentNode.getAttribute("id")
        filter.parentNode.removeAttribute("class")
        filter.parentNode.setAttribute("class", "chevron-up")

        // Ce setTimout permet de laisser la possibilité de cliquer sur un des éléments de la liste
        // avant que celle-ci ne se referme
        setTimeout(e => {
            filter.nextElementSibling.style.display = "none"
            filter.removeAttribute("data-filter-open")
        }, 150)
        handlePlaceholder(id, filter)
    })
})

// FONCTION DE FERMETURE DE LA LISTE DE TAGS
export default function closeFilter(filter) {
    const id = filter.parentNode.getAttribute("id")
    filter.parentNode.removeAttribute("class")
    filter.parentNode.setAttribute("class", "chevron-up")
    filter.style.display = "none"
    //handlePlaceholder(id,filter.previousElementSibling)
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
    arrayOfFilterTag.map(e => {
        if (e.tag === tag) {
            testDoublon++
        }
    })
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
    arrayOfFilterTag.forEach(element => {
        // On récupère le bon filtre (pour respecter l'affichage colorimétrique du filtre)
        const selectorToDisplay = `.filter-tags.filter-tags--${element.filter.toLowerCase()}`
        const tagSection = document.querySelector(selectorToDisplay)
        const newTag = document.createElement('div')
        const newTagName = document.createElement('p')
        const newTagCloseIcon = document.createElement('i')
        // On ajoutele bouton de suppression du tag
        newTagCloseIcon.setAttribute('class', "fa-regular fa-circle-xmark")

        // EVENT LISTENER SUR L'ICONE DE FERMETURE DU TAG
        newTagCloseIcon.addEventListener('click', e => {
            // Récupère l'index du tag à supprimer dans le tableau d'affichage des tags
            const indexToRemove = arrayOfFilterTag.map(e => e.tag).indexOf(element.tag)
            // Supprime le tag du tableau de tag à afficher
            arrayOfFilterTag.splice(indexToRemove, 1)
            // Récupère l'index du tag à supprimer dans le tableau des critères de recherche
            const indexOfResearchToRemove = arrayOfResearch.map(e => e.words).indexOf(element.tag)
            // Supprime le tag du tableau des critères de recherche
            arrayOfResearch.splice(indexOfResearchToRemove, 1)
            // Récurrence de la fonction pour afficher les tags mis à jour 
            showTag()
        })
        newTag.setAttribute("class", `btn-tag btn-tag--${element.filter.toLowerCase()}`)
        newTagName.innerText = element.tag
        newTag.appendChild(newTagName)
        newTag.appendChild(newTagCloseIcon)
        tagSection.appendChild(newTag)
    })
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
