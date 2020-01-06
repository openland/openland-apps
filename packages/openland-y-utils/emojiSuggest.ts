import rankings from './data/emoji-ranking.json'; // from http://emojitracker.com/api/rankings
import { EMOJI_DATA, pickerEmoji } from './data/emoji-data';
import { emojiConvertToName } from './emojiExtract';
import { emojiWordMap } from './emojiWordMap';
import { getRecent } from 'openland-web/components/unicorn/emoji/Recent';

const emojiList: {
    name: string;
    value: string;
    shortcodes: string[];
    sprite: string;
}[] = [];

const DIVERSITY = false;

function getSprite(name: string, diversity: boolean): string | null {
    const foundPickerEmoji = pickerEmoji.find(emoji => emoji.name === name);
    if (foundPickerEmoji && foundPickerEmoji.sprite) {
        return foundPickerEmoji.sprite;
    } else {
        return diversity ? 'diversity' : null;
    }
}

function populateEmoji() {
    const processed = new Set<string>();
    const recent = getRecent().filter(r => r.used > 0);
    for (let r of recent) {
        if (processed.has(r.value)) {
            continue;
        }
        processed.add(r.value);
        let dt = EMOJI_DATA.find(v => v[2] === r.value);
        if (!dt) {
            continue;
        }
        const name = emojiConvertToName(dt[2] as string);
        const sprite = getSprite(name, DIVERSITY);
        if (sprite) {
            emojiList.push({
                name,
                sprite,
                value: dt[2] as string,
                shortcodes: dt[1] as string[],
            });
        }
    }

    for (let r of rankings) {
        if (processed.has(r.char)) {
            continue;
        }
        processed.add(r.char);
        let dt = EMOJI_DATA.find(v => v[2] === r.char);
        if (!dt) {
            continue;
        }

        const name = emojiConvertToName(dt[2] as string);
        const sprite = getSprite(name, DIVERSITY);
        if (sprite) {
            emojiList.push({
                name,
                sprite,
                value: dt[2] as string,
                shortcodes: dt[1] as string[],
            });
        }
    }
    for (let e of EMOJI_DATA) {
        if (processed.has(e[2] as string)) {
            continue;
        }

        const name = emojiConvertToName(e[2] as string);
        const sprite = getSprite(name, DIVERSITY);
        if (sprite) {
            emojiList.push({
                name,
                sprite,
                value: e[2] as string,
                shortcodes: e[1] as string[],
            });
        }
    }
}
populateEmoji();

interface Emoji {
    name: string;
    value: string;
    shortcode: string;
    sprite: string;
}

export function emojiSuggest(input: string): Emoji[] {
    let res: Emoji[] = [];
    input = input.toLowerCase();

    if (input.startsWith(':')) {
        if (input.length <= 1) {
            for (let i = 0; i < 20; i++) {
                res.push({
                    name: emojiList[i].name,
                    value: emojiList[i].value,
                    shortcode: emojiList[i].shortcodes[0],
                    sprite: emojiList[i].sprite,
                });
            }
        } else {
            for (let i = 0; i < emojiList.length; i++) {
                let e = emojiList[i];
                for (let j = 0; j < e.shortcodes.length; j++) {
                    let sc = e.shortcodes[j];
                    if (sc.startsWith(input)) {
                        res.push({ name: e.name, value: e.value, shortcode: sc, sprite: e.sprite });
                        break;
                    }
                }
            }
        }
    } else {
        for (let dt of emojiWordMap[input] || []) {
            const name = emojiConvertToName(dt[2] as string);
            const sprite = getSprite(name, DIVERSITY);
            if (sprite) {
                res.push({
                    name,
                    sprite,
                    value: dt[2] as string,
                    shortcode: dt[1][0],
                });
            }
        }
    }

    return res;
}

export function findEmoji(input: string): Emoji[] {
    // used in emojji search
    let res: Emoji[] = [];
    input = ':' + input.toLowerCase();

    for (let i = 0; i < emojiList.length; i++) {
        let e = emojiList[i];
        for (let j = 0; j < e.shortcodes.length; j++) {
            let sc = e.shortcodes[j];
            if (sc.startsWith(input)) {
                res.push({ name: e.name, value: e.value, shortcode: sc, sprite: e.sprite });
                break;
            }
        }
    }
    return res;
}
