function solve(input) {

    let count=input.length/2;
    input=input.sort((a,b)=>a-b);

    for (let step = 1; step <=count+2; step+=2) {
       input.splice(step,0,input.pop());
        
    }
    return input;
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));