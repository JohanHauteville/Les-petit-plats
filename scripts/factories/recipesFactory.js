export function recipesFactory(data){

    const {id,name,servings,ingredients,time,description,appliance,ustensils} = data
    // console.log('recipesFactory: ');
    // console.log(data);

    function getRecipesDOM(){
        const article = document.createElement('article')
        const image = document.createElement('img')
        const informations = document.createElement('div')
        informations.setAttribute("class","recipe__informations")

        const infoHeader = document.createElement('div')
        infoHeader.setAttribute("class","recipe__info-header")
        const infoTitle = document.createElement('h2')
        infoTitle.textContent = name
        const infoTimeLogo = "<i class=\"fa-regular fa-clock\"></i>"
        const infoTime = document.createElement('p')
        infoTime.innerHTML =  `${infoTimeLogo}  ${time} min`

        const infoMain = document.createElement('div')
        infoMain.setAttribute("class","recipe__info-main")

        const infoIngredients = document.createElement('ul')
        ingredients.forEach(ingredient => {
            const ingredientsElement = document.createElement('li')
            ingredientsElement.innerHTML = `<span class="recipe__ingredients-title">${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit?ingredient.unit:""} `
            infoIngredients.appendChild(ingredientsElement)
        });
        const infoDescription = document.createElement('p')
        const maxDescriptionCaracteres = 172
        const splitDescription = description.slice(0,maxDescriptionCaracteres)
        infoDescription.textContent = `${splitDescription}${splitDescription[maxDescriptionCaracteres-1]===undefined?".":"..."}`



        infoHeader.appendChild(infoTitle)
        infoHeader.appendChild(infoTime)

        infoMain.appendChild(infoIngredients)
        infoMain.appendChild(infoDescription)

        informations.appendChild(infoHeader)
        informations.appendChild(infoMain)

        article.appendChild(image)
        article.appendChild(informations)
        article.setAttribute("class","recipe")
        return article
    }
    return {id,name,servings,ingredients,time,description,appliance,ustensils,getRecipesDOM}
    
}