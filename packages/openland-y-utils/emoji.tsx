import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { emojiExtract } from './emojiExtract';
import { css } from 'linaria';

let baseUrl = 'https://cdn.openland.com/shared/emoji/';
export class EmojiFlags {
    static ignoreEmojione = canUseDOM && localStorage.getItem('meke_web_great_again') === 'true';
}

type SizeT = 10 | 12 | 13 | 14 | 15 | 16 | 18 | 20 | 25 | 38;

// get native from short
// if paste depends on native, how it can work on other platforms? (BAD)
// better to make it depend on shortname

const emojiStyle = css`
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
`;

export function emoji(src: string) {
    if (EmojiFlags.ignoreEmojione) {
        return src;
    }

    let emojies = emojiExtract(src);
    if (emojies.length === 0) {
        return src;
    }

    let offset = 0;
    let res: any[] = [];
    for (let e of emojies) {
        if (e.start > offset) {
            res.push(src.substring(offset, e.start));
        }
        let v = src.substring(e.start, e.start + e.length);
        let url = baseUrl + 'svg/' + e.name + '.svg';
        res.push(<img
            className={emojiStyle}
            key={'e-' + e.start}
            alt={v}
            src={url}
        />);
        offset = e.start + e.length;
    }
    if (offset < src.length) {
        res.push(src.substring(offset));
    }

    return (<span>{res}</span>);
}
