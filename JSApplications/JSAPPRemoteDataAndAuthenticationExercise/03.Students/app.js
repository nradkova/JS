async function start() {
    await getAllStudents();
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
        getAllStudents();
    });
}
start();

async function onSubmit(student) {
    try {
        Object.values(student).forEach(e=>{
            if(e==''){
                throw new Error('All fields are required');
            }
        })
        const body = JSON.stringify({
            firstName: student.firstName,
            lastName: student.lastName,
            facultyNumber: student.facultyNumber,
            grade: student.grade
        });
        const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        document.querySelector('form').reset();
    } catch (error) {
        alert(error.message)
    }
}

async function getAllStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url);
    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
    }
    const data = await response.json();
    const table=document.querySelector('table>tbody')
    table.innerHTML='';
    Object.values(data).forEach(e => table.appendChild(fillTableRow(e)));
}

function fillTableRow(student) {
    return row = create('tr',
        create('td', student.firstName),
        create('td', student.lastName),
        create('td', student.facultyNumber),
        create('td', student.grade));
}

function create(type, ...content) {
    const result = document.createElement(type);
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            result.appendChild(document.createTextNode(e));
        } else { result.appendChild(e); }
    });
    return result;
}