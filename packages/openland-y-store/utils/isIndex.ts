var isIndexTest = /^[0-9][0-9]*$/i;

export function isIndex(name: string) {
    return isIndexTest.test(name);
}