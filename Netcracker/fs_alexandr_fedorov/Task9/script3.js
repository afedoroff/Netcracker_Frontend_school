export let array = [];
export let direction;

export function method3(){
    while(true){
        direction = prompt("Выберите направление сортировки(asc/desc)...");
        if(direction !== "asc" && direction !== "desc"){
            alert("Выберите корректное направление сортировки!");
        } else break;
    }
    fillArray();
    alert(`Исходный массив: ${array}`);
    alert(`Отсортированный массив: ${sortArray(array, direction)}` );
    alert(sumOfSquares(array));
}


export function fillArray() {
    const length = 10;
    for(let i = 0; i < length; i++){
        let rand = Math.floor((Math.random() * 100) + 1);
        array.push(rand);
    }
}

export function sortArray(array, direction){
    for (let i = 0 ; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;
        switch (direction){
            case "asc":{
                while (j >= 0 && array[j] > current) {
                    array[j + 1] = array[j];
                    j--;
                }
                break;
            }
            case "desc":{
                while (j >= 0 && array[j] < current) {
                    array[j + 1] = array[j];
                    j--;
                }
                break;
            }
        }
        array[j + 1] = current;
    }
    return array;
}

export function sumOfSquares(array){
    return array.filter(elem => elem % 2 !== 0).reduce((sum, elem) => sum + Math.pow(elem, 2), 0);
}