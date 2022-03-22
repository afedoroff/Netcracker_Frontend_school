export let a = 5;
export let b = 4;
export let c;

export function method(){
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log("--------");

    c = b;
    b = a;
    a = c;

    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log("--------");

    a += b;
    b = a - b;
    a = a - b;

    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
}
