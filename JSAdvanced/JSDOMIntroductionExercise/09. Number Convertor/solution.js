function solve() {

    const select = document.querySelector('#selectMenuTo');

    const firstOption=CreateCustomElement('option','selected','value', 'binary','Binary');
    const secondOption = CreateCustomElement('option', 'selected','value', 'hexadecimal','Hexadecimal');
    select.appendChild(firstOption);
    select.appendChild(secondOption);

    const btn=document.querySelector('button');
    btn.addEventListener('click',onClick);

    function onClick(event){
        const input=Number(document.querySelector('#input').value);
        let output=undefined;
        if(document.querySelector('option[value="binary"]').selected){
           output=input.toString(2);
        }else{
            output=input.toString(16).toUpperCase();
        }
        document.querySelector('#result').value=output;
    }

    function CreateCustomElement(type,classSelected,classValue, value,content) {
        const el = document.createElement(type);
        el.classList.add(classSelected,classValue);
        el[classValue]=value;
        el.textContent = content;
        return el;
    }
}