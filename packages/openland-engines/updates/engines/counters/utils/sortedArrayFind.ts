export function sortedArrayFind<T>(sortedArray: T[], seekElement: T, comparator: (a: T, b: T) => number): number {
    let startIndex = 0;
    let endIndex: number = sortedArray.length - 1;
    while (startIndex <= endIndex) {
        const mid = startIndex + Math.floor((endIndex - startIndex) / 2);
        const guess = sortedArray[mid];
        const c = comparator(guess, seekElement);
        if (c === 0) {
            return mid;
        } else if (c > 0) {
            endIndex = mid - 1;
        } else {
            startIndex = mid + 1;
        }
    }
    return -1;
}