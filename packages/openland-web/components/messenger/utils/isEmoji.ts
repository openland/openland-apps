import emojiData from './data/emoji-data';

const asciiToUnicodeCache = new Map();

function isUnicodeEmoji(src: string) {
    for (const [
        regExp,
        unicode,
    ] of emojiData.asciiToUnicode.entries()) {
        if (src.replace(regExp, unicode) === unicode) {
            asciiToUnicodeCache.set(src, unicode);
            return true;
        }
    }
    return false;
}

function isTextEmoji(src: string) {
    return emojiData.shortToUnicode.has(src);
}

export function isEmoji(src: string) {
    if (isTextEmoji(src)) {
        return true;
    }

    if (isUnicodeEmoji(src)) {
        return true;
    }
    return false;
}