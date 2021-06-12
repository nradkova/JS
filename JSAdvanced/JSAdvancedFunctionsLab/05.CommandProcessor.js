function solution(){
    let str='';
    return{
        append: (input)=>str+=input,
        removeStart:(count)=> str=str.slice(count),
        removeEnd:(count)=> str=str.slice(0,-count),
        print:()=> console.log(str)
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();