const arrayOfFilter = document.querySelectorAll("input.filter ")
const arrayOfUL = document.querySelectorAll('.filter__list')

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

function closeFilter(filter){
    const id = filter.parentNode.getAttribute("id")
    filter.parentNode.removeAttribute("class")
    filter.parentNode.setAttribute("class","chevron-up")
    filter.nextElementSibling.style.display = "none"
    handlePlaceholder(id,filter)
    filter.removeAttribute("data-filter-open")
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

export function AddTag(tag){
    const tagSection = document.querySelector('.filter-tags')
    const newTag = document.createElement('div')
    newTag.setAttribute("class",'btn-tag')
    newTag.innerText=tag
}