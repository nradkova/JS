function generateReport() {
    const headers = Array.from(document.querySelectorAll('th'))
        .map(x => x.children[0]);
    //console.log(headers)
    const rows = Array.from(document.querySelectorAll('tbody tr'))
    //console.log('-'.repeat(10));
    //console.log(rows)
    let result = [];
    rows.forEach((row) => {
        //console.log(row)
        let current = Array.from(row.children).reduce((obj, prop, index) => {

            console.log(headers[index])
            if (headers[index].checked) {
                let headerName = headers[index].name;
                obj[headerName] = prop.innerText;
            }
            return obj;
        }, {});
        result.push(current);
    })
    //console.log(result);
    document.querySelector('#output').value=JSON.stringify(result);
}