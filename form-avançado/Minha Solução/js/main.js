// ELEMENTOS
stepContainers = document.querySelectorAll(".containers");
personalInputs = document.querySelectorAll(".personal-input");
nextStepBtn = document.querySelectorAll(".next-step");
spans = document.querySelectorAll(".span-error");
plans = document.querySelectorAll(".option");
switcher = document.querySelector(".switcher");
year = document.querySelector(".year");
month = document.querySelector(".month");
optionPrices = document.querySelectorAll(".option-price");
addOnsOptions = document.querySelectorAll(".option2");
addonsPrice = document.querySelectorAll(".addon-price");
addonCheckbox = document.querySelectorAll(".addon-checkbox");
stepNumbers = document.querySelectorAll(".step-number");
addonSummary = document.querySelector(".chosen-infos");
chosenPlanContainer = document.querySelector(".chosen-plan-container");
totalPrice = document.querySelector("#total-price");
goBackBtn = document.querySelectorAll(".go-back-btn");
confirmBtn = document.querySelector(".confirm-btn");

let valid = 0;

let infos = {
  plan: [],
  addons: [],
  addonsPrice: [],
  date: "mo",
};
// FUNÇÕES

function resetAddons() {
  infos["addons"] = [];
  infos["addonsPrice"] = [];
  addonSummaryNode = document.querySelectorAll(".chosen-infos");
  let indexAddon = 0;
  if (addonSummaryNode.length > 0) {
    for (const addonObj of addonSummaryNode) {
      if (indexAddon > 0) {
        addonObj.remove();
      }
      indexAddon++;
    }
  }
}

function containerChangeBack(index) {
  stepContainers[index].classList.add("hide");
  stepContainers[index - 1].classList.remove("hide");
}

function stepNumberChangingBack(index) {
  stepNumbers[index].classList.remove("current-step");
  stepNumbers[index - 1].classList.add("current-step");
}

function totalConstructor() {
  let addonsSum = 0;
  const planPrice = +infos["plan"][1];
  infos["addonsPrice"].forEach((addonPrice) => {
    addonsSum += +addonPrice;
  });
  const totalSum = planPrice + addonsSum;
  console.log(addonsSum, planPrice);

  totalPrice.textContent = "$" + totalSum + "/" + infos["date"];
}

function addonConstructor() {
  let index = 0;
  infos["addons"].forEach((addonText) => {
    const newAddon = addonSummary.cloneNode(true);
    newAddon.querySelector("p").textContent = addonText;
    newAddon.querySelector("h4").textContent =
      "+$" + infos["addonsPrice"][index] + "/" + infos["date"];
    newAddon.classList.remove("hide");
    chosenPlanContainer.appendChild(newAddon);

    index++;
  });
}

function mainPlanConstructor() {
  const planNameDiv = document.querySelector("#chosen-plan");
  const planPrice = document.querySelector("#chosen-plan-price");

  if (infos["date"] == "mo") {
    planNameDiv.textContent = infos["plan"][0] + "(Monthly)";
    planPrice.textContent = "$" + infos["plan"][1] + "/mo";
  } else {
    planNameDiv.textContent = infos["plan"][0] + "(Yearly)";
    planPrice.textContent = "$" + infos["plan"][1] + "/yr";
  }
}

function summaryConstructor() {
  mainPlanConstructor();
  addonConstructor();
  totalConstructor();
}

function registerDate(date) {
  infos["date"] = date;
}

function registerPlan(plan) {
  const planName = plan.querySelector("h3").textContent;
  let planPrice = plan.querySelector("p").textContent;
  planPrice = planPrice.replaceAll(/[$/moyr]/g, "");
  infos["plan"][0] = planName;
  infos["plan"][1] = planPrice;
}

function registerAddons(addon, index) {
  const addonName = addon.querySelector("h3").textContent;
  let addonPrice = addon.querySelector(".addon-price").textContent;
  addonPrice = addonPrice.replaceAll(/[+$/moyr]/g, "");
  infos["addons"][index] = addonName;
  infos["addonsPrice"][index] = addonPrice;
  console.log(infos);
}

function stepNumberChanging(index) {
  stepNumbers[index].classList.remove("current-step");
  stepNumbers[index + 1].classList.add("current-step");
}

function toggleAddonsStyle(index) {
  addOnsOptions[index].classList.toggle("selected-addon");
  addonCheckbox[index].toggleAttribute("checked");
}

function pricesTextChange() {
  if (optionPrices[0].textContent == "$9/mo") {
    registerDate("yr");
    optionPrices[0].textContent = "$90/yr";
    optionPrices[1].textContent = "$120/yr";
    optionPrices[2].textContent = "$150/yr";
    addonsPrice[0].textContent = "+$10/yr";
    addonsPrice[1].textContent = "+$20/yr";
    addonsPrice[2].textContent = "+$20/yr";
  } else {
    registerDate("mo");
    optionPrices[0].textContent = "$9/mo";
    optionPrices[1].textContent = "$12/mo";
    optionPrices[2].textContent = "$15/mo";
    addonsPrice[0].textContent = "+$1/mo";
    addonsPrice[1].textContent = "+$2/mo";
    addonsPrice[2].textContent = "+$2/mo";
  }
}

function toggleDateStyles() {
  month.classList.toggle("date-selected");
  year.classList.toggle("date-selected");

  pricesTextChange();
}

function selectedPlan(index) {
  let planIndex = 0;
  plans.forEach(() => {
    if (planIndex == index) {
      plans[planIndex].classList.add("selected-plan");
    } else {
      plans[planIndex].classList.remove("selected-plan");
    }
    planIndex++;
  });
}

function setError(index) {
  spans[index].classList.remove("hide");
}

function removeError(index) {
  spans[index].classList.add("hide");
}

function containerChange(index) {
  if (valid == 0) {
    stepContainers[index].classList.add("hide");
    stepContainers[index + 1].classList.remove("hide");
  }
}

function nameValidate() {
  const name = personalInputs[0].value;
  if (name == "") {
    setError(0);
  } else {
    removeError(0);
  }
}

function emailValidate() {
  const email = personalInputs[1].value;
  if (email == "") {
    setError(1);
  } else {
    removeError(1);
  }

  if (!email.includes("@")) {
    console.log("EMAIL SEM @");
  }
}

function phoneValidate() {
  const phone = personalInputs[2].value;
  if (phone == "") {
    setError(2);
  } else {
    removeError(2);
  }
}
// EVENTOS

// EVENTOS DA PRIMEIRA ETAPA

personalInputs[0].addEventListener("input", () => {
  nameValidate();
});

personalInputs[1].addEventListener("input", () => {
  emailValidate();
});

personalInputs[2].addEventListener("input", () => {
  phoneValidate();
});

nextStepBtn[0].addEventListener("click", (e) => {
  e.preventDefault();
  console.log(goBackBtn);
  valid = 0;
  nameValidate();
  emailValidate();
  phoneValidate();

  spans.forEach((span) => {
    if (!span.classList.contains("hide")) {
      valid++;
    }
  });
  containerChange(0);
  if (valid == 0) stepNumberChanging(0);
});

// EVENTOS DA SEGUNDA ETAPA

plans[0].addEventListener("click", () => {
  selectedPlan(0);
});

plans[1].addEventListener("click", () => {
  selectedPlan(1);
});

plans[2].addEventListener("click", () => {
  selectedPlan(2);
});

switcher.addEventListener("click", () => {
  toggleDateStyles();
});

nextStepBtn[1].addEventListener("click", (e) => {
  e.preventDefault();
  valid = 1;

  plans.forEach((plan) => {
    if (plan.classList.contains("selected-plan")) {
      valid--;
      registerPlan(plan);
    }
  });
  console.log(valid);
  containerChange(1);
  stepNumberChanging(1);
});

goBackBtn[0].addEventListener("click", (e) => {
  e.preventDefault();
  containerChangeBack(1);
  stepNumberChangingBack(1);
});

// EVENTOS DA TERCEIRA ETAPA

addOnsOptions[0].addEventListener("click", (e) => {
  toggleAddonsStyle(0);
});
addOnsOptions[1].addEventListener("click", (e) => {
  toggleAddonsStyle(1);
});
addOnsOptions[2].addEventListener("click", (e) => {
  toggleAddonsStyle(2);
});

nextStepBtn[2].addEventListener("click", (e) => {
  e.preventDefault();
  let addonIndex = 0;
  addOnsOptions.forEach((addon) => {
    if (addon.classList.contains("selected-addon")) {
      registerAddons(addon, addonIndex);
      addonIndex++;
    }
  });

  summaryConstructor();
  containerChange(2);
  stepNumberChanging(2);
});

goBackBtn[1].addEventListener("click", (e) => {
  e.preventDefault();
  containerChangeBack(2);
  stepNumberChangingBack(2);
});

goBackBtn[2].addEventListener("click", (e) => {
  e.preventDefault();
  containerChangeBack(3);
  stepNumberChangingBack(3);
  resetAddons();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  containerChange(3);
});

var sound = "grunt";

var bear = { sound: "roar" };

function roar() {
  console.log(this.sound);
}
roar();
