export function createInterpolator(src: number[], dst: number[]) {
    if (src.length !== dst.length) {
        throw Error('Arrays are not the same');
    }
    for (let i = 1; i < src.length; i++) {
        if (src[i - 1] >= src[i]) {
            throw Error('Input interval is not monononic');
        }
    }
    return (v: number) => {

        // Clamping
        if (v <= src[0]) {
            return dst[0];
        }
        if (v >= src[src.length - 1]) {
            return dst[dst.length - 1];
        }

        let index = src.length - 2;
        for (let i = 0; i < src.length - 1; i++) {
            if (v >= src[i] && v <= src[i + 1]) {
                index = i;
                break;
            }
        }

        let ratio = (v - src[index]) / (src[index + 1] - src[index]);

        return (ratio) * dst[index] + (1 - ratio) * dst[index + 1];
    };
}