const getLineBreaksNumber = (text: string) => text.split(/\r\n|\r|\n/).length;

export function getShortText(text: string, maxCharacters: number, maxLineBreaks: number) {
    if (text.length > maxCharacters) {
        return `${text.substr(0, maxCharacters)}... `;
    } else {
        const shortTextLength = text.split(/\r\n|\r|\n/).slice(0, maxLineBreaks).join('\n').length;
        return `${text.substr(0, shortTextLength)}... `;
    }
}

export function isSmallText (text: string, maxCharacters: number, maxLineBreaks: number) {
    return text.length < maxCharacters && getLineBreaksNumber(text) < maxLineBreaks;
}
