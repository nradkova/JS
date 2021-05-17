function createSortedList() {
    const numberArray = [];
    const listFactory = {
        add,
        remove,
        get,
        size: 0
    };

    function add(number) {
        numberArray.push(number);
        numberArray.sort((a, b) => a - b);
        this.size++;
    };
    function remove(index) {
        if (index >= 0 && index < this.size) {
            numberArray.splice(index, 1)
            this.size--;
        };
    }
    function get(index) {
        if (index >= 0 && index < this.size) { return numberArray[index];};
    };

    return listFactory;
}

let list = createSortedList();
list.add(5);
//console.log(list.size)
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));