const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");

const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const percentageButtons = document.querySelector(".percentage");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let operator = "";
let firstNumber = "";
let waitingForSecondNumber = false;
let hasError = false;

function calculate(firstNumber, secondNumber, operator) {

    if (operator === "+") {
        return firstNumber + secondNumber;
    }

    if (operator === "−") {
        return firstNumber - secondNumber;
    }

    if (operator === "×") {
        return firstNumber * secondNumber;
    }

    if (operator === "÷") {

        if (secondNumber === 0) {
            return "Error";
        }

        return firstNumber / secondNumber;
    }
}

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (hasError) {
            return;
        }

        if (waitingForSecondNumber) {
            currentDisplay.textContent = button.textContent;
            waitingForSecondNumber = false;

        } else if (currentDisplay.textContent === "0") {
            currentDisplay.textContent = button.textContent;

        } else {
            currentDisplay.textContent += button.textContent;
        }
    });
});

decimalButton.addEventListener("click", function() {

    if (hasError) {
        return;
    }

    if (waitingForSecondNumber) {
        currentDisplay.textContent = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!currentDisplay.textContent.includes(".")) {
        currentDisplay.textContent += ".";
    }
});

percentageButtons.addEventListener("click", function () {
    if (hasError) {
        return;
    }

    const number = Number(currentDisplay.textContent);

    currentDisplay.textContent = number / 100;
});

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (hasError) {
            return;
        }

        const newOperator = button.textContent;

        if (operator !== "" && waitingForSecondNumber) {
            hasError = true;
            currentDisplay.textContent = "Error";
            previousDisplay.textContent = "";
            return;
        }
        
        if (operator !== "" && !waitingForSecondNumber) {

            const secondNumber = currentDisplay.textContent;

            const result = calculate(
                Number(firstNumber),
                Number(secondNumber),
                operator
            );

            if (result === "Error") {
                hasError = true;
                currentDisplay.textContent = "Error";
                previousDisplay.textContent = "";
                return;
            }

            currentDisplay.textContent = result;
            firstNumber = result;

        } else {
            firstNumber = currentDisplay.textContent;
        }

        operator = newOperator;

        previousDisplay.textContent =
            firstNumber + " " + operator;

        waitingForSecondNumber = true;
    });
});

equalsButton.addEventListener("click", function() {

    if (hasError || operator === "" || waitingForSecondNumber) {
        return;
    }

    const secondNumber = currentDisplay.textContent;

    const result = calculate(
        Number(firstNumber),
        Number(secondNumber),
        operator
    );

    if (result === "Error") {
        hasError = true;
        currentDisplay.textContent = "Error";
        previousDisplay.textContent = "";
        return;
    }

    previousDisplay.textContent =
        firstNumber + " " + operator + " " + secondNumber + " =";

    currentDisplay.textContent = result;

    firstNumber = result;
    operator = "";
    waitingForSecondNumber = true;
});


clearButton.addEventListener("click", function() {

    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";

    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
    hasError = false;
});