export var clickOnFilter = "";
export function filter() {
    const priceFilterButton = document.querySelector('.checkbox__label-filter-price');
    const roomFilterButton = document.querySelector('.checkbox__label-filter-room');
    priceFilterButton.addEventListener('click', function(e) { 
        e.preventDefault()
        e.target.parentNode.firstElementChild.checked = !e.target.parentNode.firstElementChild.checked;
        setFilter("price");
        clickOnFilter = "price";

    })
    roomFilterButton.addEventListener('click', function(e) {  
        e.preventDefault()
        e.target.parentNode.firstElementChild.checked = !e.target.parentNode.firstElementChild.checked;
        setFilter("room");
        clickOnFilter = "room";

    })   
}
export function setFilter(filter) {
    const priceFilterButton = document.getElementsByClassName('checkbox_theme_filter')[0];
    const roomFilterButton = document.getElementsByClassName('checkbox_theme_filter')[1];
    const productsList = document.querySelector('.products__list');
    let productsArr = [];
    let products = document.getElementsByClassName('product');
    if(filter === "price") {
        for(let i = 0; i < products.length; i++) {
            productsArr.push(products[i]);
        }  
        productsArr.sort(function(a, b) {
            return +a.querySelector('.product__header').getAttribute('data-product-price') - +b.querySelector('.product__header').getAttribute('data-product-price');       
        });
        if(priceFilterButton.firstElementChild.checked) { // Если фильтр выбран на возрастание
            productsArr.reverse()
        }
        productsArr.forEach(function(product) {
            productsList.appendChild(product);
        })
    }
    if(filter === "room") {     
        for(let i = 0; i < products.length; i++) {
            productsArr.push(products[i]);
        }
        productsArr.sort(function(a, b) {
            return +a.querySelector('.product__header').getAttribute('data-product-room') - +b.querySelector('.product__header').getAttribute('data-product-room');
        });  
        if(roomFilterButton.firstElementChild.checked) { // Если фильтр выбран на возрастание
            productsArr.reverse()
        }
        productsArr.forEach(function(product) {
            productsList.appendChild(product);
        })
    }
    
}