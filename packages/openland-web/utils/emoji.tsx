import * as React from 'react';
const emojione = require('emojione');

// let shortnames = emojione.shortnames as string; // add |:some_custom_emoji: for custom emoji
let shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');
let emojiList = emojione.emojioneList;
let baseUrl = 'https://cdn.openland.com/shared/web/emoji/4.0/png/'

export function emoji(src: string, size?: number) {
    let height = size || 32;
    let assetSize = 32;
    let assetRetinaSize = 64;
    if (height > 32) {
        assetSize = 64;
        assetRetinaSize = 128;
    }
    let res = emojione.toShort(src) as string;
    return res.split(shortnamesRegexp).filter(Boolean).map((v, i) => {
        if (emojiList[v]) {
            let fname = emojiList[v].uc_base;
            let url = baseUrl + assetSize + '/' + fname + '.png';
            let retinaUrl = baseUrl + assetRetinaSize + '/' + fname + '.png';
            return <img width={height} height={height} key={'e-' + i} alt={v} src={url} srcSet={retinaUrl + ' 2x'} />
        } else {
            return v;
        }
    });
}