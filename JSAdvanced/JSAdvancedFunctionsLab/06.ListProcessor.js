function solution(input) {
    let list = [];
    const processor = {
        add: (input) => list.push(input),
        remove: (input) => list = list.filter(x => x !== input),
        print: () => console.log(list.join())
    };

    input.forEach(el => {
        let [command, value] = el.split(' ');
        value
            ? processor[command](value)
            : processor[command]()
    });

    return list;
}
solution([
    'add hello',
    'add again',
    'remove hello',
    'add again',
    'print'])