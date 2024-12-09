type Indexed<T = unknown> = {
    [key in string]: T;
};


function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    const keys = path.split('.');
    const lastKey = keys.pop();
    let currentLevel: Indexed = object as Indexed;

    for (const key of keys) {
        if (!(key in currentLevel)) {
            currentLevel[key] = {};
        }
        currentLevel = currentLevel[key] as Indexed;
    }

    if (lastKey) {
        currentLevel[lastKey] = value;
    }

    return object;
}

export default set;

console.log(set({ foo: 5 }, 'bar.baz', 10)); // { foo: 5, bar: { baz: 10 } }
console.log(set(3, 'foo.bar', 'baz')); // 3
