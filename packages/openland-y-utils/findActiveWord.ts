const stoplist = ['\n', ',', '(', ')'];
const prefixes = ['@', ':'];

function findActiveWordStart (content: string, selection: { start: number, end: number }): number {
    let startIndex = selection.start - 1;
    let spaceIndex = -1;
    while (startIndex >= 0) {
        const char = content.charAt(startIndex);
        if (char === ' ') {
            if (spaceIndex >= 0) {
                return spaceIndex + 1;
            } else {
                spaceIndex = startIndex;
                startIndex--;
            }
        } else if (prefixes.includes(char) && startIndex > 0 && content.charAt(startIndex - 1) === ' ') {
            return startIndex;
        } else if (!stoplist.includes(char)) {
            startIndex--;
        } else {
            return startIndex + 1;
        }
    }
    return (spaceIndex >= 0 ? spaceIndex : startIndex) + 1;
}

export function findActiveWord (content: string, selection: { start: number, end: number }): string | undefined {
    if (selection.start !== selection.end) {
        return undefined;
    }

    let startIndex = findActiveWordStart(content, selection);
    let res = content.substring(startIndex, selection.end);
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}