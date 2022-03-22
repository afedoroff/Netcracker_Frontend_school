export function guessTheNumber(){
    let count = 0;
    let num;
    let randNum = Math.floor((Math.random() * 1000) + 1);
    while (true){
        num = parseInt(prompt("Введите число"));
        count++;
        while (isNaN(num)){
            num = parseInt(prompt("Введите число!"));
        }
        if(num === randNum){
            if(confirm(`Вы угадали! Количество попыток: ${count}`)){
                guessTheNumber();
            } else return;
        } else if (num > randNum){
            alert("Искомое число меньше!");
        } else {
            alert("Искомое число больше!");
        }
    }
}