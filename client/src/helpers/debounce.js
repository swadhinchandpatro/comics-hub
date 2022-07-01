export function debounceCharacterFilter(fn, timeout = 500) {
    let inst, ids = new Set();
    return (id) => {
        if(inst) {
            clearTimeout(inst)
        }
        ids.add(id);
        inst = setTimeout(() => {
            fn([...ids]);
            ids = new Set()
        }, timeout)
    }
}

export function debounce(fn, timeout = 500) {
    let inst
    return (...args) => {
        if(inst) {
            clearTimeout(inst)
        }
        console.log('called')
        inst = setTimeout(() => {
            console.log('executed')
            fn(...args);
        }, timeout)
    }
}