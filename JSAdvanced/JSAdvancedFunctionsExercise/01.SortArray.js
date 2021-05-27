function solve(arr,criteria){
    const sort={
        'asc':(a,b)=>a-b,
        'desc':(a,b)=>b-a
    };
    
    return arr.sort(sort[criteria]);
}
console.log(solve([14, 7, 17, 6, 8], 'asc'))