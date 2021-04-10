import './scss/main.scss';
import 'bootstrap';
import * as lodash from 'lodash-es'
import printMe from './print.js'

if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      printMe();
    })
  };

let forward = document.getElementById('slide');
forward.onclick = function () {
    let container = document.getElementById('productCards');
    sideScroll(container,'left',25,300,20);
};

let back = document.getElementById('slideBack');
back.onclick = function () {
    let container = document.getElementById('productCards');
    sideScroll(container,'right',25,300,20);
};

function sideScroll(element,direction,speed,distance,step){
    let scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
};

// Product card component: item keys

let productCard = {
    preTitle: "artikelnummer",
    productTitle: "Product title",
    productDesc: "desc",
    productFav: false
};

let products = [];

function isFav(favoriteBtn) {
    favoriteBtn.classList.add("active");
};
function isNotFav(favoriteBtn) {
    favoriteBtn.classList.remove("active");
};

// bovenliggende element zoeken met een bepaalde class
const findParent = (el, cls) => {
    if (el != null) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) ;
    }
    return el;
};
function toggleFav(event) {
    // event target is hier de favorite button die we klikken
    if (event.target) {
        // zoeken naar product element met de id op
        const productElement = findParent(event.target, 'product-cards__item')
        const {productId} = productElement.dataset;
        products = products.map(product => {
            // product in de array zoeken op id,
            if (product.productId === productId){
                //toggle de fav
                product.productFav = !product.productFav
                // update class op het element
                product.productFav ? isFav(event.target) : isNotFav(event.target)
            }
            return product
        })
        // debug 
        console.table(products)
    }
};
// productElement is hier het element met de productId op
const getProductInfo = (productElement) => {
    if (!productElement) return;
    const {productId} = productElement.dataset;
    const productTitle = productElement.querySelector('.product-cards__item__title').innerText;
    const preTitle = productElement.querySelector('.product-cards__item__pre-title').innerText;
    return {
        ...productCard,
        productTitle,
        preTitle,
        productId
    }
}
// het is wel makkelijker om de html te renderen van data dan omgekeerd
// maar hier haal ik dus van de html die er al is de nodige data
const productElements = document.querySelectorAll('.product-cards__item');
for (let product of productElements) {
    let productInfo = getProductInfo(product)
    products.push(productInfo)
    let favoriteBtn = product.querySelector('.product-cards__item-photo__fav')
    favoriteBtn && favoriteBtn.addEventListener("click", toggleFav);
};

