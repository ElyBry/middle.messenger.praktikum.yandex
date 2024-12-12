const trim = (str: string, chars = ' ') => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (!chars.includes(str[i]) && str[i] !== '\xA0') {
            console.log(str[i])
            result += str[i];
        }
    }
    return result;
}

export default trim;
