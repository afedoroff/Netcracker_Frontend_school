let array = [];

function fillArray() {
    const length = 10;
    for(let i = 0; i < length; i++){
        let rand = Math.floor((Math.random() * 100) + 1);
        array.push(rand);
    }
}

function radixSort(array, digit = 1) {
    let digitValueArray;
    let max = Math.max(...array);
    while(max - digit >= 0){
        digitValueArray = Array(10).fill(0).map(() => []);
        array.forEach( value => {
            let digitValue = Math.floor(value / digit) % 10;
            digitValueArray[digitValue].push(value);
        })
        array = digitValueArray.flat();
        digit *= 10;
    }
    return array;
}

fillArray();
console.log(array);
console.log(radixSort(array));

