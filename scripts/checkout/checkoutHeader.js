import { cart } from "../../data/cart.js";

export function checkoutTotal() {
  let cartQuantity  = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity

}

export function renderCheckoutHeader() {
  let checkoutHeader = `Checkout (<a class="return-to-home-link js-checkout-header" href="#">${checkoutTotal()}</a>)`

  document.querySelector('.js-checkout-header-middle-section')
   .innerHTML = checkoutHeader
}