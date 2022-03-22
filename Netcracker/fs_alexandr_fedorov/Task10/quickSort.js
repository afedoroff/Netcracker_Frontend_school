let array = [];

function quickSort(array){
    if(array.length < 2){
        return array;
    }
    else {
        const pivot = array[Math.floor(Math.random() * array.length)];
        const less = array.filter(value => value < pivot);
        const greater = array.filter(value => value > pivot);
        return[...quickSort(less), pivot, ...quickSort(greater)];
    }
}

function fillArray() {
    const length = 10;
    for(let i = 0; i < length; i++){
        let rand = Math.floor((Math.random() * 100) + 1);
        array.push(rand);
    }
}

fillArray();
console.log(array);
console.log(quickSort(array));
