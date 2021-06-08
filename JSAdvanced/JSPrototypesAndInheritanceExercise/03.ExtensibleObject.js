function result() {
    const obj = {};
    obj.extend = (template) => {
        Object.entries(template).forEach(([k, v]) => {
            if (typeof v === 'function') {
                Object.getPrototypeOf(obj)[k] = v;
            } else {
                obj[k] = v;
            }
        })
    }
    return obj;
}

var template = {
    extensionMethod: function () {
        console.log("From extension method")
    },
    extensionProperty: 'someString'
};

var testObject = result();
testObject.extend(template);
console.log(Object.getPrototypeOf(testObject).hasOwnProperty('extensionMethod'));