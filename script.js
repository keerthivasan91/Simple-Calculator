// Get all the elements we need
const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="calculate"]');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// Update the display
function updateDisplay() {
    currentOperandDisplay.textContent = currentInput;
    if (operation) {
        previousOperandDisplay.textContent = `${previousInput} ${operation}`;
    } else {
        previousOperandDisplay.textContent = '';
    }
}

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        
        updateDisplay();
    });
});

// Handle operator button clicks
operationButtons.forEach(button => {
    const action = button.dataset.action;
    if (action === 'add' || action === 'subtract' || 
        action === 'multiply' || action === 'divide') {
        button.addEventListener('click', () => {
            const operator = button.textContent;
            
            if (operation !== null) calculate();
            previousInput = currentInput;
            operation = operator;
            resetScreen = true;
            updateDisplay();
        });
    }
});

// Handle equals button click
equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

// Handle clear button click
clearButton.addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
});

// Handle delete button click
deleteButton.addEventListener('click', () => {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
});

// Perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    resetScreen = true;
}

// Initialize the display
updateDisplay();