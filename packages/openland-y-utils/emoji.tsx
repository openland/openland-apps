import * as React from 'react';
import { emojiExtract } from './emojiExtract';
import { emojiComponent } from './emojiComponent';

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
        res.push(emojiComponent(e.name, e.src, 'e-' + e.start));
        offset = e.start + e.length;
    }
    if (offset < src.length) {
        res.push(src.substring(offset));
    }

    return (<span>{res}</span>);
}
