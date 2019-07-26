// const emojione = require('emojione');
// let shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');
// let emojiList = emojione.emojioneList;
import emojiRegex from 'emoji-regex';

const vs16RegExp = /\uFE0F/g;
// avoid using a string literal like '\u200D' here because minifiers expand it inline
const zeroWidthJoiner = String.fromCharCode(0x200d);
const removeVS16s = (rawEmoji: string) => (rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, '') : rawEmoji);
function toCodePoints(unicodeSurrogates: string): Array<string> {
    const points = [];
    let char = 0;
    let previous = 0;
    let i = 0;
    while (i < unicodeSurrogates.length) {
        char = unicodeSurrogates.charCodeAt(i++);
        if (previous) {
            points.push((0x10000 + ((previous - 0xd800) << 10) + (char - 0xdc00)).toString(16));
            previous = 0;
        } else if (char > 0xd800 && char <= 0xdbff) {
            previous = char;
        } else {
            points.push(char.toString(16));
        }
    }
    return points;
}

export function emojiExtract(src: string): { name: string, start: number, length: number }[] {
    let res: { name: string, start: number, length: number }[] = [];
    let regex = emojiRegex();
    let match: RegExpMatchArray | null;
    while (match = regex.exec(src)) {
        res.push({
            name: toCodePoints(removeVS16s(match[0])).join('-'),
            start: match.index!,
            length: [...match[0]].length  * 2
        });
    }
    return res;
}