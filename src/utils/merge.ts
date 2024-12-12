type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const result = { ...lhs };

    for (const key in rhs) {
        if (key in result && typeof rhs[key] === 'object' && rhs[key] !== null) {
            result[key] = merge(result[key] as Indexed, rhs[key] as Indexed);
        } else {
            result[key] = rhs[key];
        }
    }

    return result;
}

export default merge;
