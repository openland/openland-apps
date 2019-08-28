import rankings from './data/emoji-ranking.json'; // from http://emojitracker.com/api/rankings
import { EMOJI_DATA } from './data/emoji-data';
import { emojiConvertToName } from './emojiExtract';
import { emojiWordMap } from './emojiWordMap';
import { getRecent } from 'openland-web/components/unicorn/emoji/Recent';

const emojiList: {
    name: string,
    value: string,
    shortcodes: string[]
}[] = [];

function populateEmoji() {
    const processed = new Set<string>();
    const recent = getRecent().filter(r => r.used > 0);
    for (let r of recent) {
        if (processed.has(r.value)) {
            continue;
        }
        processed.add(r.value);
        let dt = EMOJI_DATA.find((v) => v[2] === r.value);
        if (!dt) {
            continue;
        }
        emojiList.push({ name: emojiConvertToName(dt[2] as string), value: dt[2] as string, shortcodes: dt[1] as string[] });
    }
    for (let r of rankings) {
        if (processed.has(r.char)) {
            continue;
        }
        processed.add(r.char);
        let dt = EMOJI_DATA.find((v) => v[2] === r.char);
        if (!dt) {
            continue;
        }
        emojiList.push({ name: emojiConvertToName(dt[2] as string), value: dt[2] as string, shortcodes: dt[1] as string[] });
    }
    for (let e of EMOJI_DATA) {
        if (processed.has(e[2] as string)) {
            continue;
        }
        emojiList.push({ name: emojiConvertToName(e[2] as string), value: e[2] as string, shortcodes: e[1] as string[] });
    }
}
populateEmoji();

export function emojiSuggest(input: string): { name: string, value: string, shortcode: string }[] {
    let res: { name: string, value: string, shortcode: string }[] = [];
    input = input.toLowerCase();

    if (input.startsWith(':')) {
        if (input.length <= 1) {
            for (let i = 0; i < 20; i++) {
                res.push({ name: emojiList[i].name, value: emojiList[i].value, shortcode: emojiList[i].shortcodes[0] });
            }
        } else {
            for (let i = 0; i < emojiList.length; i++) {
                let e = emojiList[i];
                for (let j = 0; j < e.shortcodes.length; j++) {
                    let sc = e.shortcodes[j];
                    if (sc.startsWith(input)) {
                        res.push({ name: e.name, value: e.value, shortcode: sc });
                        break;
                    }
                }
            }
        }
    } else {
        for (let dt of emojiWordMap[input] || []) {
            res.push({ name: emojiConvertToName(dt[2] as string), value: dt[2] as string, shortcode: dt[1][0] });
        }
    }

    return res;
}