export function sortedArrayAdd<T>(src: T[], value: T, comparator: (a: T, b: T) => number): T[] {
    // Handle empty
    if (src.length === 0) {
        return [value];
    }

    // Find middle point
    let min = 0;
    let max = src.length;
    let mid = (max + min) >> 1 /* /2 */;
    while (min < max) {
        var c = comparator(src[mid], value); // src[mid] < value
        if (c < 0) {
            min = mid + 1;
        } else if (c > 0) { // src[mid] > key
            max = mid;
        } else {
            break;
        }
        mid = (max + min) >> 1 /* /2 */;
    }

    // Insert new element
    return [...src.slice(0, mid), value, ...src.slice(mid)];
}