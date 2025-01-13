import {products} from '../data/products.js';
import {addToCart, updateCartQuantity, addedToCartMessage} from '../data/cart.js';
import {formatCurrency} from '../utils/money.js';


let ProductsHTML = '';

products.forEach((product) => {
  ProductsHTML += `
  <div class="products-container">
        <div class="products-image-container">
          <img class="product-image" src="media/images/${product.image}" alt="">
        </div>

        <div class="products-descriptions">
          ${product.name}
        </div>

        <div class="products-rating">
          <div class="products-rating-star">
            <img class="products-rating-star-image" src="media/images/rating-${product.rating.star * 10}.png" alt="">
          </div>
          <div class="products-rating-count">${product.rating.count}</div>
        </div>

        <div class="products-price">$${formatCurrency(product.priceCents)}</div>

        <div class="products-quantity-container">
          <select class="quantity-selecto js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="added-text js-added-text-${product.id}">
          <img class="checked-image" src="media/images/checked.png" alt=""> 
          Added
        </div>

        <div class="add-to-cart-button-container">
          <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
 `;
});

document.querySelector('.js-products-grid').innerHTML = ProductsHTML;

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const selectQuant = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectQuant.value);
   
    addedToCartMessage(productId);
    addToCart(productId, quantity);
    updateCartQuantity();
  })
 
})









