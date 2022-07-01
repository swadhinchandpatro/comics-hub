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