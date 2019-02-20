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
        productsArr.sort(function(a, b) { // Вначале сортируем по кв. метрам (Зачем, написал в комменте ниже)
            return +a.querySelector('.product__header').getAttribute('data-product-square') - +b.querySelector('.product__header').getAttribute('data-product-square');
        });
        productsArr.sort(function(a, b) { // Затем по цене. В итоге, если будет одинаковая цена между квартирами, дополнительная сортировка на кв. метры поможет отсортировать точней
            return +a.querySelector('.product__header').getAttribute('data-product-price') - +b.querySelector('.product__header').getAttribute('data-product-price');       
        });
        if(!priceFilterButton.firstElementChild.checked) {
            productsArr.reverse()
        }
        productsArr.forEach(function(product) {
            productsList.appendChild(product);
        })
    }
    else if(filter === "room") {     
        for(let i = 0; i < products.length; i++) {
            productsArr.push(products[i]);
        }
        productsArr.sort(function(a, b) { // Вначале сортируем по кв. метрам (Зачем, написал в комменте ниже)
            return +a.querySelector('.product__header').getAttribute('data-product-square') - +b.querySelector('.product__header').getAttribute('data-product-square');
        });
        productsArr.sort(function(a, b) { // Затем по комнатам. В итоге между одинаковым кол-вом комнат, дополнительная сортировка на кв. метры поможет отсортировать точней
            return +a.querySelector('.product__header').getAttribute('data-product-rooms') - +b.querySelector('.product__header').getAttribute('data-product-rooms');
        });  
        if(!roomFilterButton.firstElementChild.checked) {
            productsArr.reverse()
        }
        productsArr.forEach(function(product) {
            productsList.appendChild(product);
        })
    }
    
}
