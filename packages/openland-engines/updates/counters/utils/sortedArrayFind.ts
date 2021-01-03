export function sortedArrayFind(sortedArray: number[], seekElement: number): number {
    let startIndex = 0;
    let endIndex: number = sortedArray.length - 1;
    while (startIndex <= endIndex) {
        const mid = startIndex + Math.floor((endIndex - startIndex) / 2);
        const guess = sortedArray[mid];
        if (guess === seekElement) {
            return mid;
        } else if (guess > seekElement) {
            endIndex = mid - 1;
        } else {
            startIndex = mid + 1;
        }
    }
    return -1;
}