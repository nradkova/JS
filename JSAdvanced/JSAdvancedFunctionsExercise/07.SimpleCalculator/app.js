function calculator() {
    let firstTag = undefined;
    let secondTag =  undefined;
    let resultTag =  undefined;

    return {
        init: (selector1, selector2, resultSelector) => {
            firstTag = document.querySelector(selector1);
            secondTag = document.querySelector(selector2);
            resultTag = document.querySelector(resultSelector);
        },
        add:()=>resultTag.value=Number(firstTag.value)+Number(secondTag.value),
        subtract:()=>resultTag.value=Number(firstTag.value)-Number(secondTag.value)
    }
}

const calculate = calculator (); 
calculate.init ('#num1', '#num2', '#result');
// calculate.add();
// calculate.subtract(); 


