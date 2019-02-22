import { isEmoji } from './isEmoji';

export function extractPlaceholder(src: string) {
    let s = src.trim();
    if (s.length === 0) {
        return '?';
    }
    let s2 = s.split(' ');

    if (s2.length === 1) {
        let substringIndex = isEmoji(s2[0]) ? 2 : 1;
        return s2[0]
            .trim()
            .substring(0, substringIndex)
            .toUpperCase();
    }

    let substringIndex1 = isEmoji(s2[0]) ? 2 : 1;
    let substringIndex2 = isEmoji(s2[1]) ? 2 : 1;
    return (
        s2[0]
            .trim()
            .substring(0, substringIndex1)
            .toUpperCase() +
        s2[1]
            .trim()
            .substring(0, substringIndex2)
            .toUpperCase()
    );
}
