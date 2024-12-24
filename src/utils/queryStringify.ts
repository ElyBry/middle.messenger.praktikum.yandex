type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed, prevKey = ''): string | never {
    if (data === null || typeof data !== "object") {
        throw new Error('input must be an object');
    }
    let str = '';
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = data[key];

        const fullKey = prevKey ? `${prevKey}[${key}]` : key;

        if (val !== null && typeof val === 'object') {
            if (Array.isArray(val)) {
                for (let j = 0; j < val.length; j++) {
                    if (typeof val[j] === 'object') {
                        str += queryStringify(val[j], `${fullKey}[${j}]`);
                    } else {
                        str += `${fullKey}[${j}]=${val[j]}&`;
                    }
                }
            } else {
                str += queryStringify(val, fullKey);
            }
        } else {
            str += `${fullKey}=${val}&`;
        }
    }
    if (prevKey == '') {
        str = str.slice(0, -1);
    }

    return str;
}

export default queryStringify;
