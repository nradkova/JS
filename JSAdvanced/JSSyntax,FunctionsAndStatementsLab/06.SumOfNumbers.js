function solve(...input){
    let[num1,num2]=input;
    num1=Number(num1);
    num2=Number(num2);
    
    let sum=0;
    for (let num = num1; num <=num2; num++) {
        sum+=num;
    }
    return sum;
}
console.log(solve('-8', '20'));