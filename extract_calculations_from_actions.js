// ------------- Original Code -----------

var shoppingCart = [];
var shoppingCartTotal = 0;

function addItemToCart(name, price) {
  shoppingCart.push({
    name: name,
    price: price,
  });

  calcCartTotal();
}

function calcCartTotal() {
  shoppingCartTotal = 0;

  for (var i = 0; i < shoppingCart.length; i++) {
    var item = shoppingCart[i];
    shoppingCartTotal += item.price;
  }

  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function updateShippingIcons() {
  var buyButtons = getBuyButtonsDom();

  for (let i = 0, len = buyButtons.length; i < len; i++) {
    var button = buyButtons[i];
    var item = button.item;

    if (item.price + shoppingCartTotal >= 20) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}

function updateTaxDom() {
  setTaxDom(shoppingCartTotal * 0.1);
}

// ------------ End of original code ------------------------------

// ------------ Extracted code ------------------------------
const MINIMUM_FREE_SHIPPING_PRICE = 20;

function calcCartTotal() {
  calcTotal();
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function calcTotal(cart) {
  // 1. Separate business rules from the DOM updates
  // 2. Get rid of global variables
  // 3. Dont depend on global variables
  // 4. Don't assume the answer goes in the DOM
  // 5. Return the answer from the function
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price;
  }

  return total;
}

function addItemToCart(name, price) {
  shoppingCart = addItem(shoppingCart, name, price);
  calcCartTotal();
}

function addItem(cart, name, price) {
  var newCart = cart.slice();

  newCart.push({
    name: name,
    price: price,
  });

  return newCart;
}

function updateTaxDom() {
  const tax = calcTax(shoppingCartTotal, 0.1);
  setTaxDom(tax);
}

function calcTax(amount, taxRate) {
  return amount * taxRate;
}

function validForFreeShipping(price, totalAmount) {
  return price + totalAmount >= MINIMUM_FREE_SHIPPING_PRICE;
}

function updateShippingIcons() {
  const buyButtons = getBuyButtonsDom();

  for (let i = 0, len = buyButtons.length; i < len; i++) {
    const button = buyButtons[i];
    const item = button.item;

    if (validForFreeShipping(item.price, shoppingCartTotal)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}
