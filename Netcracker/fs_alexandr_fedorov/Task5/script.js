let result = 0;
let memoryNewNumber = false;
let display = document.getElementsByName("display");
let previousOperation = () => result += parseFloat(display[0].value);
class Operations {
    static prepareOperation () {
        let memoryCurrent = parseFloat(display[0].value);
        if(isNaN(memoryCurrent)) return;
        memoryNewNumber = true;
        previousOperation();
        display[0].value = result;
        display[1].value += memoryCurrent;
    }
    static simpleOperation (symbol){
        this.prepareOperation();
        switch (symbol){
            case "+":
                display[1].value += symbol;
                previousOperation = () => result += parseFloat(display[0].value);
                break;
            case "-":
                display[1].value += symbol;
                previousOperation = () => result -= parseFloat(display[0].value);
                break;
            case "*":
                display[1].value = "(" + display[1].value + ")" + symbol;
                previousOperation = () => result *= parseFloat(display[0].value);
                break;
            case "/":
                display[1].value = "(" + display[1].value + ")" + symbol;
                previousOperation = () => result /= parseFloat(display[0].value);
                break;
        }
    }
    static degreeOperation (symbol){
        let memoryCurrent = parseFloat(display[0].value);
        if(isNaN(memoryCurrent)) return;
        memoryNewNumber = true;
        switch (symbol){
            case "sqr":
                memoryCurrent = Math.pow(memoryCurrent, 2);
                break;
            case "sqrt":
                memoryCurrent = Math.sqrt(memoryCurrent);
                break;
        }
        display[0].value = memoryCurrent;
    }
}

function writeNum(num){
    if(memoryNewNumber) display[0].value = "";
    memoryNewNumber = false;
    display[0].value += num;
}

function clearAll(){
    display[0].value = "";
    display[1].value = "";
    previousOperation = () => result += parseFloat(display[0].value);
    result = 0;
}

function clearInput(){
    display[1].value
        .replace(display[0], "");
    display[0].value = "";
}

function equal(){
    previousOperation();
    display[1].value = "";
    display[0].value = result;
    result = "";
    previousOperation = () => result += parseFloat(display[0].value);
    memoryNewNumber = true;
}
