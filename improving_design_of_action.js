// ------------ Extracted code ------------------------------
var shoppingCart = [];
var shoppingCartTotal = 0;
const MINIMUM_FREE_SHIPPING_PRICE = 20;

function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart);
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function setCartTotalDom() {
  // ...
  shoppingCartTotal;
  // ...
}

function calcTotal(cart) {
  // 1. Separate business rules from the DOM updates
  // 2. Get rid of global variables
  // 3. Dont depend on global variables
  // 4. Don't assume the answer goes in the DOM
  // 5. Return the answer from the function
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }

  return total;
}

function addItemToCart(name, price) {
  shoppingCart = addItem(shoppingCart, name, price);
  calcCartTotal();
}

function addItem(cart, name, price) {
  const newCart = cart.slice();

  newCart.push({
    name,
    price,
  });

  return newCart;
}

function makeCartItems(name, price) {
  return {
    name: name,
    price: price,
  };
}

function updateTaxDom() {
  const tax = calcTax(shoppingCartTotal, 0.1);
  setTaxDom(tax);
}

function calcTax(amount, taxRate) {
  return amount * taxRate;
}

function validForFreeShipping(price, totalAmount) {
  // Code smell: Duplicate total += item.price;
  return price + totalAmount >= MINIMUM_FREE_SHIPPING_PRICE;
}

function updateShippingIcons() {
  const buyButtons = getBuyButtonsDom();

  for (let i = 0, len = buyButtons.length; i < len; i++) {
    const button = buyButtons[i];
    const item = button.item;
    const newCart = addItem(shoppingCart, item.name, item.price);

    if (validForFreeShipping(newCart)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}

// ---------- Finish extracted code ---------

// ---------- Improving the design of actions ------------------

function validForFreeShipping(cart) {
  // Our function now operates on the cart data structure instead of on a total and a price
  // This makes sense because as an e-commerce company, shopping carts are a primary entity type
  return calcTotal(cart) >= MINIMUM_FREE_SHIPPING_PRICE;
}

function updateShippingIcons(cart) {
  const buttons = getBuyButtonsDom();

  for (let i = 0, len = buyButtons.length; i < len; i++) {
    const button = buttons[i];
    const item = button.item;
    const isFreeShipping = getsFreeShippingWithItem(cart, item);

    setFreeShippingIcon(button, isFreeShipping);
  }
}

function getsFreeShippingWithItem(cart, item) {
  const newCart = addItem(cart, item);
  return getsFreeShipping(newCart);
}

function setFreeShippingIcon(button, isShown) {
  if (isShown) {
    button.showFreeShippingIcon();
  } else {
    button.hideFreeShippingIcon();
  }
}

function updateTaxDom(totalAmount) {
  const tax = calcTax(totalAmount, 0.1);
  setTaxDom(tax);
}

function addItemToCart(name, price) {
  const item = makeCartItem(name, price);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);

  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}

function setCartTotalDom(total) {
  // ...
  total;
  // ...
}

// function addItem(cart, item) {
//   const newCart = cart.slice();
//   newCart.push(item);

//   return newCart;
// }

function addElementLast(array, elem) {
  const newArray = array.slice();
  newArray.push(elem);
  return newArray;
}

function addItem(cart, item) {
  return addElementLast(cart, item);
}

function makeCartItem(name, price) {
  // By pulling this out, the caller of this fun doesn't know about its structure
  return {
    name: name,
    price: price,
  };
}

// ---------- Finish Improving the design of actions ------------------
