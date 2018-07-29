var fnNameRegex = /^[A-Za-z_][0-9A-Za-z_]*$/i;

export function checkName(name: string) {
    if (!fnNameRegex.test(name)) {
        throw Error('Wrong name: ' + name);
    }
}