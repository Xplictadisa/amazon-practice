import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  renderCheckoutHeader();
  let cartSummarytHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummarytHTML += `<div class="cart-item-container js-cart-item-${matchingProduct.id}"}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="media/images/${matchingProduct.image}" alt="">

        <div class="cart-items-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>Quantity:
              <span class="product-count js-product-count-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>

            <input type="text" class="update-quantity-input js-update-input-${matchingProduct.id}"> 
            <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">save</span>
            
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
            <p class="update-input-error js-update-input-error-${matchingProduct.id}"></p>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Chose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>` ;
  })

  document.querySelector('.js-order-summary').innerHTML = cartSummarytHTML;

  document.querySelectorAll('.js-delete-link').forEach((link, index) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(index);
      renderCheckoutHeader();
      const container = document.querySelector(`.js-cart-item-${productId}`);
      container.remove();

      renderPaymentSummary();
    })
  });

  document.querySelectorAll('.js-update-quantity-link')
      .forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
          const productId = updateLink.dataset.productId
          console.log(productId);
          updateQuantityLink(productId);

        })
  })

  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;
      saveUpdateQuantity(productId);
    })
  })


  function saveUpdateQuantity(productId) {
    document.querySelector(`.js-cart-item-${productId}`).classList.remove('is-editing-quantity');
    const quantity = document.querySelector(`.js-update-input-${productId}`).value;
    if (quantity >= 0 && quantity < 1000) {  
      const newQuantity = Number(quantity);
      updateQuantity(productId, newQuantity);
      document.querySelector(`.js-product-count-${productId}`).innerHTML = newQuantity;
      renderCheckoutHeader();
      document.querySelector(`.js-update-input-error-${productId}`).innerHTML = 'hmm';
    }
    else {
      document.querySelector(`.js-update-input-error-${productId}`).innerHTML = 'input is not a valid number';
    }
  }

  function updateQuantityLink(productId) {

    document.querySelectorAll('.cart-item-container').forEach(() => {
      document.querySelector(`.js-cart-item-${productId}`).classList.add('is-editing-quantity');
    })
  }

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =(deliveryOption.priceCents === 0) 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += `<div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping.
          </div>
        </div>
      </div>`
    })

    return html;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        // const productId = element.dataset.productId;
        // const deliveryOptionId = element.dataset.deliveryOptionId;
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
  })
}

