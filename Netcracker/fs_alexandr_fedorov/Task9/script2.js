export let name;
export let age;
export function method2(){
    name = prompt("Введите своё имя...");
    while (true){
        if(!name){
            name = prompt("Введите своё имя...");
        } else break;
    }
    while (true){
        age = prompt("Введите свой возраст...");
        if(age <= 0 || isNaN(age)){
            alert("Введите корректный возраст!");
        } else break;
    }
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    alert(`Привет, ${name}! Тебе уже ${age} год/года/лет!`)
}
