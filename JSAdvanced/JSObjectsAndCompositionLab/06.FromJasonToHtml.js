function solve(input) {

    let data = JSON.parse(input);

    let html = '<table>\n';
    html += `<tr>${Object.keys(data[0])
        .map(key => `<th>${escapeHtml(key.toString())}</th>`)
        .join('')}</tr>\n`;

    data.forEach(student => {
        html += `<tr>${Object.values(student)
            .map(value => {
                let result='';
                if(value!==undefined){
                    result=escapeHtml(value.toString());
                }
                return `<td>${result}</td>`;
            })
            .join('')}</tr>\n`;
    });
    html += '</table>';

    return html;

    function escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
}
console.log(solve('[{"Name": "Stamat","Score": 5.5},{"Name": "Rumen","Score": 6}]'));
console.log(solve('[{"Name":"<Pesho","Score":4," Grade":8},{"Name":"Gosho","Score":5,"Grade":8},{"Name":"Angel","Score":5.50," Grade":10}]'));