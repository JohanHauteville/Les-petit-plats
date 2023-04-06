const arrayOfFilter = document.querySelectorAll("input.filter ")


arrayOfFilter.forEach(filter =>{
    
    filter.addEventListener("focus",function(){
        const originalValue = filter.getAttribute("placeholder")
        filter.setAttribute("data-filter-open","")
        filter.parentNode.removeAttribute("class")
        filter.parentNode.setAttribute("class","chevron-down")
        filter.nextElementSibling.style.display = "block"
        filter.setAttribute("placeholder",`Rechercher un ${originalValue}`)
        console.log(filter.nextElementSibling);
        filter.addEventListener("blur",function(){
            console.log(filter.parentNode);
            filter.parentNode.removeAttribute("class")
            filter.parentNode.setAttribute("class","chevron-up")
            filter.nextElementSibling.style.display = "none"
            filter.setAttribute("placeholder",`${originalValue}`)
            filter.removeAttribute("data-filter-open")
        })
    })
})