import * as React from 'react';
import { emojiExtract } from './emojiExtract';
import { css } from 'linaria';

let baseUrl = 'https://cdn.openland.com/shared/emoji/';

const emojiStyle = css`
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
   svg { max-height: 100%; };
`;

export function emoji(src: string) {
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
