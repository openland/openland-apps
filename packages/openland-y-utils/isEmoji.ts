import emojiData from './data/emoji-data';

const asciiToUnicodeCache = new Map<string, string>();

function isUnicodeEmoji(src: string) {
    if (asciiToUnicodeCache.has(src)) {
        return true;
    }
    for (const [regExp, unicode] of emojiData.asciiToUnicode.entries()) {
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
    // What the heck?
    if (emojiData.unicodeToShort.has(src)) {
        return true;
    }
    if (isTextEmoji(src)) {
        return true;
    }
    return !!isUnicodeEmoji(src);
}
