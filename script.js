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
    if (firstVariable === "" && secondVariable === "") {
      return;
    }
    // If currentOperator is not empty and equal was pressed calculate
    console.log(operator.dataset.type);
    if (currentOperator !== "") {
      currentValue = operate(firstVariable, secondVariable, currentOperator);
      displayValue.textContent = currentValue;
      firstVariable = currentValue;
      secondVariable = "";
      currentOperator = "";
      return;
    }
    if (currentOperator === "" && operator.dataset.type !== "=") {
      currentOperator = operator.dataset.type;
    }
  });
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    console.log(number.dataset.value);
    if (firstVariable !== "" && currentOperator !== "") {
      secondVariable += number.dataset.value;
      displayValue.textContent = secondVariable;

      return;
    }
    // Store value in first variable only if current operator is null
    if (currentValue !== 0 && currentOperator === "") {
      firstVariable = "";
      currentValue = 0;
    }
    if (currentOperator === "") {
      firstVariable += number.dataset.value;
      displayValue.textContent = firstVariable;
    } else {
      secondVariable += number.dataset.value;
      displayValue.textContent = secondVariable;
    }
  });
});

specialOperators.forEach((operator) => {
  operator.addEventListener("click", () => {
    console.log(operator.dataset.type);
  });
});
