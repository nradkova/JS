function solve(...input) {

    let[flavors,first,last]=input;
    let firstIndex=flavors.indexOf(first);
    let lastIndex=flavors.indexOf(last);
    
    return flavors.slice(firstIndex,lastIndex+1);
}

console.log(solve(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'));