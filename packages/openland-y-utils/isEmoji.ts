import { asciiToUnicode, shortToUnicode, unicodeToShort } from './data/emoji-data';

const asciiToUnicodeCache = new Map<string, string>();

function isUnicodeEmoji(src: string) {
    if (asciiToUnicodeCache.has(src)) {
        return true;
    }
    for (const [regExp, unicode] of asciiToUnicode.entries()) {
        if (src.replace(regExp, unicode) === unicode) {
            asciiToUnicodeCache.set(src, unicode);
            return true;
        }
    }
    return false;
}

function isTextEmoji(src: string) {
    return shortToUnicode.has(src);
}

export function isEmoji(src: string) {
    // What the heck?
    if (unicodeToShort.has(src)) {
        return true;
    }
    if (isTextEmoji(src)) {
        return true;
    }
    return !!isUnicodeEmoji(src);
}
