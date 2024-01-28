function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

let firstVariable = "";
let secondVariable = "";
let currentOperator = "";
let currentValue = 0;

function operate(num1, num2, operator) {
  if (operator === "=") {
    return;
  }
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

const operators = document.querySelectorAll(".operator");
const specialOperators = document.querySelectorAll(".special-operator");
const numbers = document.querySelectorAll(".number");
const displayValue = document.querySelector(".display");

displayValue.textContent = currentValue;

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (
      firstVariable === "" ||
      (secondVariable === "" && operator.dataset.type === "=")
    ) {
      return;
    }
    console.log(operator.dataset.type);
    // If currentOperator is not empty and equal was pressed calculate
    if (
      currentOperator !== "" &&
      firstVariable !== "" &&
      secondVariable !== ""
    ) {
      currentValue = operate(firstVariable, secondVariable, currentOperator);
      updateDisplayValue(currentValue);
      firstVariable = currentValue;
      secondVariable = "";
      currentOperator = operator.dataset.type;
      if (currentValue === Infinity || isNaN(currentValue)) {
        updateDisplayValue("lmao");
      }
      return;
      // } else if (
      //   currentOperator !== "" &&
      //   firstVariable !== "" &&
      //   secondVariable === ""
      // ) {
      //   currentValue = operate(firstVariable, firstVariable, currentOperator);
      //   displayValue.textContent = currentValue;
      //   firstVariable = currentValue;
      //   currentOperator = operator.dataset.type;
      //   if (currentValue === Infinity || isNaN(currentValue)) {
      //     displayValue.textContent = "lmao";
      //   }
      //   return;
    }
    currentOperator = operator.dataset.type;
  });
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    console.log(number.dataset.value);
    if (currentOperator === "=") {
      clear();
      firstVariable += number.dataset.value;
      updateDisplayValue(firstVariable);
      return;
    }
    if (firstVariable !== "" && currentOperator !== "") {
      secondVariable += number.dataset.value;
      updateDisplayValue(secondVariable);

      return;
    }
    if (displayValue.textContent === "0" && number.dataset.value === "0") {
      return;
    }
    // Store value in first variable only if current operator is null
    if (currentValue !== 0 && currentOperator === "") {
      firstVariable = "";
      currentValue = 0;
    }
    if (currentOperator === "") {
      firstVariable += number.dataset.value;
      updateDisplayValue(firstVariable);
    } else {
      secondVariable += number.dataset.value;
      updateDisplayValue(secondVariable);
    }
  });
});

specialOperators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operator.dataset.type === "AC") {
      clear();
    } else if (operator.dataset.type === "+/-") {
      changeSign();
    } else if (operator.dataset.type === ".") {
      if (!displayValue.textContent.includes(".")) {
        if (firstVariable === "") {
          firstVariable = "0.5";
          updateDisplayValue(firstVariable);
        } else if (firstVariable !== "" && currentOperator !== "") {
          secondVariable += ".";
          updateDisplayValue(secondVariable);
        } else if (firstVariable !== "") {
          firstVariable += ".";
          updateDisplayValue(firstVariable);
        }
      }
    } else {
      convertToPercentage();
    }
  });
});

function clear() {
  firstVariable = "";
  secondVariable = "";
  currentOperator = "";
  currentValue = 0;
  updateDisplayValue(0);
}

function changeSign() {
  // First check if second variable is empty or not.
  // change signs if not empty
  if (secondVariable !== "") {
    secondVariable *= -1;
    updateDisplayValue(String(secondVariable));
  } else {
    firstVariable *= -1;
    updateDisplayValue(String(firstVariable));
  }
}

function convertToPercentage() {
  if (secondVariable !== "") {
    secondVariable /= 100;
    updateDisplayValue(secondVariable);
  } else {
    firstVariable /= 100;
    updateDisplayValue(firstVariable);
  }
}

function updateDisplayValue(value) {
  displayValue.textContent = value;
}
