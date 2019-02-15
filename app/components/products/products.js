import "promise-polyfill/src/polyfill";
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import {filter, clickOnFilter, setFilter} from '../filter/filter';
export default (function products () {
    filter();
    const content = document.querySelector('.content');
    const footer = document.querySelector('.footer');
    const contentTitle = document.querySelector('.content__title');
    const productsList = document.querySelector('.products__list');
    const getNextProductsButton = document.querySelector('.products__button');
    let numberOfProducts = 0; // С какого индекса продуктов начинаем счет
    let nextProductsCount = 20; // Кол-во показываемых продуктов по нажатию на кнопку
    getNextProductsButton.innerText = `Показать еще ${nextProductsCount}`;
    function getNextProducts(minIndex, maxIndex) {
        fetchPolyfill(`${document.location.href}/data/data.json`)
            .then(function(response) {
                return response.json();
            })
            .then(function(products) {
                content.style.opacity = "1";
                footer.style.opacity = "1";
                contentTitle.innerText = `Найдено ${products.length} квартир`;
                products.map((item, index) => {
                    if(index >= minIndex && index <= maxIndex) {
                    const product = document.createElement('div');
                    let discountPercent = "";
                    let discountText = "";
                    let checkboxFavorite = `<input class="checkbox__input checkbox__input_theme_product" type="checkbox" id="checkbox__input-product${index+1}" name="favoriteProduct"/><label class="checkbox__label checkbox__label_theme_product" for="checkbox__input-product${index+1}"></label>`;
                    product.className = "product";
                    if(item.attributes.discount.percent) {
                        discountPercent = `<div class="product__discount-percent">${item.attributes.discount.percent}</div>`;
                        if(item.attributes.discount.text) {
                            discountText = `<div class="product__discount-text">${item.attributes.discount.text}</div>`;
                        }
                    }
                    if(item.attributes.favorite) {
                        checkboxFavorite = `<input class="checkbox__input checkbox__input_theme_product" type="checkbox" id="checkbox__input-product${index+1}" name="favoriteProduct" checked/><label class="checkbox__label checkbox__label_theme_product" for="checkbox__input-product${index+1}"></label>`;
                    }
                    product.innerHTML = `<div class="product__header" data-product-price="${+item.price.replace(/[^-0-9]/gim,'')}" data-product-rooms="${+item.rooms}">
                                            <div class="product__header-block">
                                                <div class="product__discount">
                                                    ${discountPercent}
                                                    ${discountText}
                                                </div>
                                                <div class="checkbox checkbox_theme_product" title="Добавить в избранное">
                                                    ${checkboxFavorite}
                                                </div>
                                                <img src="./products/${item.img}" class="product__img" />
                                            </div>
                                        </div>
                                        <div class="product__desc">
                                            <h3 class="product__title">${item.title}</h3>
                                            <div class="product__desc-block">
                                                <div class="product__desc-block product__desc-block_color_blue">
                                                    <p>${item.description.facing}</p>
                                                </div>
                                                <div class="product__desc-block">
                                                    <p>${item.description.square}<br><span style="font-size: 13px;">площадь</span></p>
                                                </div>
                                                <div class="product__desc-block">
                                                    <p>${item.description.floor}<br><span style="font-size: 13px;">этаж</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product__price">
                                            <p class="product__price-text">${item.price} руб.</p>
                                        </div>
                                        <div class="product__status product__status_theme_${item.statusTheme}">
                                            <p>${item.status}</p>
                                        </div>`;
                        productsList.appendChild(product);   
                    }
                })
                if(clickOnFilter === "price" || clickOnFilter === "room") { setFilter(clickOnFilter)}
                numberOfProducts = maxIndex+1;
                if(products.length - numberOfProducts > 0 && products.length - numberOfProducts < nextProductsCount) {
                    getNextProductsButton.innerText = `Показать еще ${products.length - numberOfProducts}`; // Меняем кол-во продуктов на кнопке, если оставшееся их кол-во меньше 20-ти
                }
                else if(products.length <= numberOfProducts) {
                    return getNextProductsButton.style.display = "none";
                }
            })
            .catch( console.log );
    };
    getNextProducts(numberOfProducts, 11)
    getNextProductsButton.addEventListener('click', function() {
        getNextProducts(numberOfProducts, numberOfProducts + nextProductsCount); // +20 -- кол-во продуктов, которые нужно показать  
    })
})();