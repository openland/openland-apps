const getLineBreaksNumber = (text: string) => text.split(/\r\n|\r|\n/).length;

export function isSmallText (text: string, maxCharacters: number, maxLineBreaks: number) {
    return text.length < maxCharacters && getLineBreaksNumber(text) < maxLineBreaks;
}
