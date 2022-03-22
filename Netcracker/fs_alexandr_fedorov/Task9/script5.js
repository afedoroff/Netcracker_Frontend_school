export function method5(){
    while (true){
        let word = prompt('Напишите слово...');
        let str = word.split('').reverse().join('');
        if (word === str){
            alert(`${word} палиндром!`)
        } else alert(`${word} не палиндром!`)
    }
}