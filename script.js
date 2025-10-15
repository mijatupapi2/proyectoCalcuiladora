let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {

        let expression = display.value.replace(/×/g, '*');
        

        if (!isValidExpression(expression)) {
            throw new Error('Expresión inválida');
        }
        
        let result = eval(expression);
        

        result = Math.round(result * 10000000000) / 10000000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function isValidExpression(expr) {
    if (/[+\-*/.]$/.test(expr)) return false;
    
    if (/[+\-*/]{2,}/.test(expr)) return false;
    
    if (/\d*\.\d*\./.test(expr)) return false;
    
    return true;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});