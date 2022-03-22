export function method4(){
    for(let i = 1; i <= 100; i++){
        setTimeout(() => {
            let fizzBuzz = "";
            if(i % 3 === 0){
                fizzBuzz += "Fizz"
            }
            if(i % 5 === 0){
                fizzBuzz += "Buzz"
            }
            if(fizzBuzz){
                document.write(` ${fizzBuzz}`)
            } else document.write(` ${i}`);
        }, i * 300)
    }
}
