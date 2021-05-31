function solve(obj) {
    if (obj.method !== 'GET' && obj.method !== 'POST'
        && obj.method !== 'DELETE' && obj.method !== 'CONNECT') {
        throw new Error(`Invalid request header: Invalid Method`)
    }
    if ((!(/^([a-zA-Z0-9\.]+|\*)$/g).test(obj.uri))||obj.uri===''||!obj.uri) {
        throw new Error(`Invalid request header: Invalid URI`)
    }
    if (obj.version !== 'HTTP/0.9' && obj.version !== 'HTTP/1.0'
        && obj.version !== 'HTTP/1.1' && obj.version !== 'HTTP/2.0') {
        throw new Error(`Invalid request header: Invalid Version`)
    }
    if ((/[><\\&''""]/g).test(obj.message)||!obj.message) {
         if(obj.message!==''){
            throw new Error(`Invalid request header: Invalid Message`)
        }
    }
    return obj;
};

console.log(solve({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));
