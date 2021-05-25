function attachEventsListeners() {
    document.querySelector('#convert').addEventListener('click', onClick);
   
    function onClick(event) {
        document.querySelector('#outputDistance').disabled = false;
        const meterBase = {
            km: 1000,
            m: 1,
            cm: 0.01,
            mm: 0.001,
            mi: 1609.34,
            yrd: 0.9144,
            ft: 0.3048,
            in: 0.0254
        };
        const inputType = document.querySelectorAll('select')[0].value;
        const inputValue = Number(document.querySelector('#inputDistance').value);
        const outputType = document.querySelectorAll('select')[1].value;

       const outputValue=inputValue* meterBase[inputType]*meterBase.m/meterBase[outputType];
       
       document.querySelector('#outputDistance').value = outputValue;
    }
}