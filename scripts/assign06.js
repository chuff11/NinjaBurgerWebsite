//Phonenumber Mess
var phoneValid = false;
document.OrderForm.phone.onchange = validatePhone;
function validatePhone() {
  let number = document.OrderForm.phone.value;
  let spot = number.search(/\d{3}-\d{3}-\d{4}/);
  console.log(spot);
  if (spot > -1) {
    console.log("valid");
    document.getElementById("phoneError").innerHTML = "";
    document.OrderForm.phone.style.borderColor = "lightgray";
    document.OrderForm.phone.style.borderWidth = "1px";
    phoneValid = true;
  }
  else {
    console.log("error");       
    document.getElementById("phoneError").innerHTML = "*Format must be XXX-XXX-XXXX*";
    document.OrderForm.phone.style.borderColor = "red";
    phoneValid = false;
  }
}

//Credit Card Mess
var cardValid = false;
document.OrderForm.cardNumber.onchange = validateCardNumber;
function validateCardNumber() {
  let number = document.OrderForm.cardNumber.value;
  let spot = number.search(/\d{16}/);
  if (spot > -1) {
    //console.log("valid");
    document.getElementById("cardError").innerHTML = "";
    document.OrderForm.cardNumber.style.borderColor = "lightgray";
    document.OrderForm.cardNumber.style.borderWidth = "1px";
    cardValid = true;
  }
  else {
    //console.log("error");       
    document.getElementById("cardError").innerHTML = "*Please enter 16 digits*";
    document.OrderForm.cardNumber.style.borderColor = "red";
    cardValid = false;
  }
}

//Expiration Date Mess
var expValid = false;
document.OrderForm.exp_date.onchange = validateDate;
function validateDate() {
  let number = document.OrderForm.exp_date.value;
  let first = Number.parseInt(number.substr(0,2));
  console.log(first);
  let second = Number.parseInt(number.substr(number.length - 2, 2));
  console.log(second);
  var okay = false;
  var date = new Date();
  console.log(date.getFullYear() - 2000);
  if (second === (date.getFullYear() - 2000) && first > date.getMonth()) {
    okay = true;
  }
  else if (second > date.getFullYear() - 2000) {
    okay = true;
  }
  if (okay) {
    console.log("valid");
    document.getElementById("expError").innerHTML = "";
    document.OrderForm.exp_date.style.borderColor = "lightgray";
    document.OrderForm.exp_date.style.borderWidth = "1px";
    expValid = true;
  }
  else {
    console.log("error");       
    document.getElementById("expError").innerHTML = "*Please enter a valid date*";
    document.OrderForm.exp_date.style.borderColor = "red";
    expValid = false;
  }
}

//Submission Mess
document.OrderForm.Submit.onclick = validate;
function validate() {
  if (document.OrderForm.first_name.value === "") {
    document.OrderForm.first_name.focus();
    return false;
  }
  if (document.OrderForm.last_name.value === "") {
    document.OrderForm.last_name.focus();
    return false;
  }
  if (!phoneValid) {
    document.OrderForm.phone.focus();
    return false;
  }
  if (document.OrderForm.address.value === "") {
    document.OrderForm.address.focus();
    return false;
  }
  if (!cardValid) {
    document.OrderForm.cardNumber.focus();
    return false;
  }
  if (!expValid) {
    document.OrderForm.exp_date.focus();
    return false;
  }
  if (Number.parseInt(total) <= 20) {
    document.OrderForm.Total.focus();
    document.getElementById("orderError").innerHTML = "*Please order something to be delivered*"
    return false;
  }
  return true;
}

//Reset Errors
document.OrderForm.Reset.onclick = reset;
function reset() {
  document.getElementById("phoneError").innerHTML = "";
  document.OrderForm.phone.style.borderColor = "lightgray";
  document.OrderForm.phone.style.borderWidth = "1px";
  document.getElementById("cardError").innerHTML = "";
  document.OrderForm.cardNumber.style.borderColor = "lightgray";
  document.OrderForm.cardNumber.style.borderWidth = "1px";
  document.getElementById("expError").innerHTML = "";
  document.OrderForm.exp_date.style.borderColor = "lightgray";
  document.OrderForm.exp_date.style.borderWidth = "1px";
  document.getElementById("orderError").innerHTML = "";
}

//Money Mess
var total = 20;
function add(price) {
  total += price;
  document.OrderForm.Total.value = "$" + Number.parseFloat(total).toFixed(2);
}
function sub(price) {
  total -= price;
  document.OrderForm.Total.value = "$" + Number.parseFloat(total).toFixed(2);
}
document.OrderForm.Total.onchange = clearOrderError;
function clearOrderError() {
  document.getElementById("orderError").innerHTML = "";
}

//Burger Submenu
document.getElementsByName("item_0")[0].addEventListener("change", burgerClicked);
function burgerClicked() {
  console.log("Clicked!");
  let list = document.getElementsByName("burger");
  console.log(list.length);
  if (this.checked === true) {
    list.forEach(item => {
    item.disabled = false;
  });
    add(7.5);
  }
  else {
    list.forEach(item => {
      item.disabled = true;
    });
      sub(7.5);
  }
}

//Fry Submenu
document.getElementsByName("item_1")[0].addEventListener("change", fryClicked);
function fryClicked() {
  console.log("Clicked!");
  let list = document.getElementsByName("fries");
  console.log(list.length);
  if (this.checked === true) {
    list.forEach(item => {
      item.disabled = false;
    });
      add(2.5);
  }
  else {
    list.forEach(item => {
      item.disabled = true;
    });
      sub(2.5);
  }
}

//Drink Submenu
for (i = 0; i < 3; i++) {
  document.getElementsByName("soda")[i].addEventListener("change", changeSoda);
}
var drink = "drink_0"
function changeSoda() {
  if (document.querySelector('input[name="soda"]:checked').value === "drink_2") {
    add(1);
  }
  else if (drink === "drink_2") {
    sub(1);
  }
  drink = document.querySelector('input[name="soda"]:checked').value;
}

document.getElementsByName("item_2")[0].addEventListener("change", sodaClicked);
function sodaClicked() {
  console.log("Clicked!");
  let list = document.getElementsByName("soda");
  console.log(list.length);
  if (this.checked === true) {
    list.forEach(item => {
      item.disabled = false;
    });
    if (drink === "drink_2") {
      add(2.5);
    }
    else {
      add(1.5);
    }
  }
  else {
    list.forEach(item => {
      item.disabled = true;
    });
    if (drink === "drink_2") {
      sub(2.5);
    }
    else {
      sub(1.5);
    }
  }
}

//Sauce Submenu
for (i = 3; i < 8; i++) {
  document.getElementsByName("item_" + i)[0].addEventListener("change", sauceClicked);
}
function sauceClicked() {
  if (this.checked === true) {
    add(0.5);
  }
  else {
    sub(0.5);
  }
}