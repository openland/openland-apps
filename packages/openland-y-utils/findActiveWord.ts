function findActiveWordStart (content: string, selection: { start: number, end: number }): number {
    let startIndex = selection.start - 1;
    while (startIndex >= 0) {
        let whitelist = [' ', '\n', ',', '.', ')'];

        if (!(whitelist.includes(content.charAt(startIndex)))) {
            startIndex--;
        } else {
            break;
        }
    }
    return startIndex + 1;
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