//////// CODE DE LA FACTORY POUR LES RECETTES /////////

export function recipesFactory(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data

    // CRÉATION DE L'ARTICLE REPRÉSENTANT LA CARTE DE LA RECETTE
    function getRecipesDOM() {
        const article = document.createElement('article')
        const image = document.createElement('img')
        const informations = document.createElement('div')
        informations.setAttribute("class", "recipe__informations")

        // TITRE + ICON + TEMPS //
        const infoHeader = document.createElement('div')
        infoHeader.setAttribute("class", "recipe__info-header")
        const infoTitle = document.createElement('h2')
        infoTitle.textContent = name
        const infoTimeLogo = "<i class=\"fa-regular fa-clock\"></i>"
        const infoTime = document.createElement('p')
        infoTime.innerHTML = `${infoTimeLogo}  ${time} min`

        const infoMain = document.createElement('div')
        infoMain.setAttribute("class", "recipe__info-main")

        // LISTE DES INGRÉDIENTS //
        const infoIngredients = document.createElement('ul')
        // AJOUTE DES INGRÉDIENTS DANS LES INGREDIENTS

        for (let index = 0; index < ingredients.length; index++) {
            //const element = array[index];
            const ingredientsElement = document.createElement('li')
            ingredientsElement.innerHTML = `<span class="recipe__ingredients-title">${ingredients[index].ingredient}:</span> ${ingredients[index].quantity} ${ingredients[index].unit ? ingredients[index].unit : ""} `
            infoIngredients.appendChild(ingredientsElement)
            
        }

        // ES6 
        // ingredients.forEach(ingredient => {
        //     const ingredientsElement = document.createElement('li')
        //     ingredientsElement.innerHTML = `<span class="recipe__ingredients-title">${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""} `
        //     infoIngredients.appendChild(ingredientsElement)
        // });

        // DESCRIPTION //
        const infoDescription = document.createElement('p')
        // DÉFINIT UNE LONGUEUR MAXIMUM POUR LE PARAGRAPHE DE DESCRIPTION
        const maxDescriptionCaracteres = 172
        const splitDescription = description.slice(0, maxDescriptionCaracteres)
        infoDescription.textContent = `${splitDescription}${splitDescription[maxDescriptionCaracteres - 1] === undefined ? "." : "..."}`

        infoHeader.appendChild(infoTitle)
        infoHeader.appendChild(infoTime)

        infoMain.appendChild(infoIngredients)
        infoMain.appendChild(infoDescription)

        informations.appendChild(infoHeader)
        informations.appendChild(infoMain)

        article.appendChild(image)
        article.appendChild(informations)
        article.setAttribute("class", "recipe")
        article.setAttribute("data-index-number", id)
        return article
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipesDOM }
}