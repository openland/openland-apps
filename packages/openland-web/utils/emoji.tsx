import * as React from 'react';
const emojione = require('emojione');

// let shortnames = emojione.shortnames as string; // add |:some_custom_emoji: for custom emoji
let shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');
let emojiList = emojione.emojioneList;
let baseUrl = 'https://cdn.jsdelivr.net/emojione/assets/4.0/png/'

export function emoji(src: string, size?: 32 | 64 | 128) {
    let res = emojione.toShort(src) as string;
    return res.split(shortnamesRegexp).filter(Boolean).map((v, i) => {
        if (emojiList[v]) {
            let fname = emojiList[v].uc_base;
            let url = baseUrl + (size || 64) + '/' + fname + '.png';
            return <img width={32} height={32} key={'e-' + i} alt={v} src={url} />
        } else {
            return v;
        }
    });
}