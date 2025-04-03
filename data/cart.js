
let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'a2020',
    quantity: 2,
    deliveryOptionsId: '1'
  }, {
    productId: 'b2021',
    quantity: 1,
    deliveryOptionsId: '2'
  }];
}

function  savetoStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

function addToCart(productId, quantity) {
  let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionsId: '1'
      });
    }
    savetoStorage();
}

function removeFromCart(index) {
  /*
  const newCart = [];
    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    });

    cart = newCart;
    */

    cart.splice(index, 1);
    console.log(cart);
    savetoStorage();
}

function addedToCartMessage(productId) {
  let timeoutId;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  document.querySelector(`.js-added-text-${productId}`).classList.add('added-text-visible');

    timeoutId = setTimeout(() => {
      document.querySelector(`.js-added-text-${productId}`).classList.remove('added-text-visible'); 
    }, 2000) 
}

function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionsId = deliveryOptionId;

  savetoStorage();
}

function updateCartQuantity() {
  let cartQuantity  = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  console.log(cart);
}

function updateQuantity(productId, newQuantity) {

  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem
    }
    if (matchingProduct) {
      matchingProduct.quantity = newQuantity;
    }
  });

  savetoStorage();
  console.log(cart);
}

export {cart, savetoStorage, addToCart, removeFromCart, addedToCartMessage,
  updateDeliveryOption, updateCartQuantity, updateQuantity
}