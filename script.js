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

let firstVariable, secondVariable, operator;

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      add();
      break;
    case "-":
      subtract();
    case "*":
      multiply();
      break;
    case "/":
      divide();
      break;
  }
}
