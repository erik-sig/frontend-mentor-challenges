//ELEMENTOS
const inputs = document.querySelectorAll("input");
console.log(inputs);
const confirmBtn = document.querySelector("button");
console.log(confirmBtn);
const spanErrors = document.querySelectorAll(".span-required");
console.log(spanErrors);
const frontCardName = document.querySelector("#dinamic-name");
const form = document.querySelector("#form");
const continueBtn = document.querySelector("#continue-btn");
regexCardNumber = /[^0-9 ]/;
regexCardName = /[^a-zA-Z ]/;

//FUNÇÕES

function setError(index) {
  spanErrors[index].style.display = "block";
  spanErrors[index].classList.add("error");
}

function removeError(index) {
  spanErrors[index].style.display = "none";
  spanErrors[index].classList.remove("error");
}

function cardNumberValidate(e) {
  let cardNumber = e.value;
  cardNumber = cardNumber
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();

  e.value = cardNumber;

  if (regexCardNumber.test(cardNumber)) {
    setError(0);
  } else {
    removeError(0);
  }
  frontCardNumberDisplay();
}
function monthValidate(e) {
  const month = e.value;
  if (month.length >= 2) {
    e.value = month.substr(0, 2);
  }
}

function yearValidate(e) {
  const year = e.value;

  if (year.length > 2) {
    e.value = year.substr(0, 4);
  }
}
function cvcValidate(e) {
  cvc = e.value;
  if (!cvc) {
    setError(2);
  } else {
    removeError(2);
  }
  if (cvc.length > 2) {
    e.value = cvc.substr(0, 3);
  }
  backCardCvcDisplay(e);
}

function expDateValidate(e) {
  const month = inputs[2].value;
  const year = inputs[3].value;

  if (e.id == "month") {
    monthValidate(e);
  } else yearValidate(e);

  if (!month || !year) setError(1);
  else removeError(1);
  frontCardExpDateDisplay();
}

function frontCardNameDisplay(e) {
  const cardName = e.value.toUpperCase();
  e.value = cardName;
  const frontCardName = document.querySelector("#dinamic-name");

  if (!regexCardName.test(cardName)) {
    frontCardName.textContent = cardName;
  } else {
    e.value = "";
  }
}

function frontCardExpDateDisplay() {
  const month = inputs[2].value;
  const year = inputs[3].value;
  const frontCardDate = document.querySelector("#dinamic-date");

  frontCardDate.textContent = month + "/" + year;
}

function backCardCvcDisplay() {
  const cvc = inputs[4].value;
  const backCardCvc = document.querySelector("#dinamic-cvc");

  backCardCvc.textContent = cvc;
}

function frontCardNumberDisplay() {
  const cardNumber = inputs[1].value;
  const frontCardNumber = document.querySelector("#dinamic-card-number");

  frontCardNumber.textContent = cardNumber;
}

function validateForm() {
  let aux = 0;
  spanErrors.forEach((span) => {
    console.log("verificando");
    if (span.classList.contains("error")) {
      aux++;
    }
  });
  return aux;
}

function validateInputs() {
  let aux = 0;
  inputs.forEach((input) => {
    if (input.value == "") aux++;
  });
  return aux;
}

//EVENTOS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formContainer = document.querySelector(".form-container");
  const continueBtn = document.querySelector("#confirm-btn");
  const thanksContainer = document.querySelector(".thanks");

  let aux = validateForm();

  let aux2 = validateInputs();

  if (aux == 0 && aux2 == 0) {
    formContainer.classList.add("hide");
    continueBtn.classList.add("hide");
    thanksContainer.classList.remove("hide");
  } else return;
});

continueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload(true);
});
