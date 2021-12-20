// Code smell: Implicit argument in function name

const validItemFields = ["price", "quantity", "shipping", "tax", "number"];

const translations = { quantity: "number" };

function setPriceByName(cart, name, price) {
  const item = cart[name];
  const newItem = objectSet(item, "price", price);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setQuantityByName(cart, name, quant) {
  const item = cart[name];
  const newItem = objectSet(item, "quantity", quant);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setShippingByName(cart, name, ship) {
  const item = cart[name];
  const newItem = objectSet(item, "shipping", ship);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setTaxByName(cart, name, tax) {
  const item = cart[name];
  const newItem = objectSet(item, "tax", tax);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function objectSet(object, key, value) {
  const copy = { ...object };
  copy[key] = value;
  return copy;
}

// The main difference between them—the strings that determine the field—is also in the name of the function.
// It’s as if the function name, or part of it, is an argument. That’s why we call this implicit argument in function name.
// Instead of explicitly passing a value, it’s “passed in” as part of the name.

function setFieldByName(cart, name, field, value) {
  const item = cart[name];
  const newItem = objectSet(item, field, value);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

let cart = { shoe: 12 };
cart = setFieldByName(cart, "shoe", "price", 13);
cart = setFieldByName(cart, "shoe", "quantity", 8);
cart = setFieldByName(cart, "shoe", "shipping", 1.5);
cart = setFieldByName(cart, "shoe", "tax", 2.2);

// What we’ve done is make the field name a first-class value
// “Now, it is a value (a string in this case) that can be passed as an argument but also stored in a variable or in an array.
// That’s what we mean by first-class.
// We can use the whole language to work with it.”
// You might think that using strings like this is unsafe.
// We’ll discuss that in a few pages. For now, please just go with it!

// Examples of things you can do with a first-class value:
// 1. Assign it to a variable
// 2. Pass it as an argument to a function
// 3. Return it from a function
// 4. Store it in an array or object

// Will field names as strings lead to more bugs?:
// That’s a valid concern, but one that we’ve got covered. There are really two options: compile-time checks and run-time checks:
// 1. Compile-time checks usually involve a static type system. JavaScript doesn’t have a static type system, but we can add one with something like TypeScript
// 2. Run-time checks don’t run at compile-time. They run every time your function runs. They can also check that the strings we pass in are valid

// Run-time check:
function setFieldByName(cart, name, field, value) {
  validateFields(field);

  const item = cart[name];
  const newItem = objectSet(item, field, value);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function validateFields(field) {
  if (!validItemFields.includes(field)) {
    throw "Not a valid item field:" + "" + field + ".";
  }
}

// By asking people above the abstraction barrier to pass in field names, aren’t we breaking the abstraction barrier? Are we not exposing the internals? By putting field names in the API spec, we’re essentially guaranteeing them forever.
// It’s true that we are guaranteeing them forever.
// But we are not exposing our implementation.
// If we change the names in the internal implementation, we can still support the names we guarantee.
// We can just swap them out

function setFieldByName(cart, name, field, value) {
  validateFields(field);
  field = swapFields(field);

  var item = cart[name];
  var newItem = objectSet(item, field, value);
  var newCart = objectSet(cart, name, newItem);
  return newCart;
}

function swapFields(field) {
  if (translations.hasOwnProperty(field)) {
    field = translations[field];
  }

  return field;
}

// My turn
function multiplyByFour(x) {
  return x * 4;
}

function multiplyBySix(x) {
  return x * 6;
}

function multiplyBy12(x) {
  return x * 12;
}

function multiplyByPi(x) {
  return x * 3.14159;
}

function multiply(number, x) {
  return number * x;
}

console.log(multiply(12, 5));
console.log(multiply(6, 5));
console.log(multiply(3.14159, 5));

function incrementQuantityByName(cart, name) {
  const item = cart[name];
  const quantity = item["quantity"];
  const newQuantity = quantity + 1;
  const newItem = objectSet(item, "quantity", newQuantity);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function incrementSizebyName(cart, name) {
  const item = cart[name];
  const size = item["size"];
  const newSize = size + 1;
  const newItem = objectSet(item, "size", newSize);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

// After refactor
// I have made the function general by passing the field as an explicit argument
function incrementFieldByName(cart, name, field) {
  const item = cart[name];
  const fieldVal = item[field];
  const newFieldVal = fieldVal + 1;
  const newItem = objectSet(item, field, newFieldVal);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}
