import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
const emojione = require('emojione');

// let shortnames = emojione.shortnames as string; // add |:some_custom_emoji: for custom emoji
let shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');
let emojiList = emojione.emojioneList;
let baseUrl = 'https://cdn.openland.com/shared/web/emoji/4.0/png/'
export class EmojiFlags {
    static ignoreEmojione = canUseDOM && localStorage.getItem('meke_web_great_again') === 'true';

}
export function emoji(src: string, size?: number) {
    if (EmojiFlags.ignoreEmojione) {
        return src;
    }
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
            // margin: '0 .15em',
            return (
                <img
                    style={{
                        alignSelf: 'center',
                        margin: '0 .15em'
                    }}
                    width={height}
                    height={height}
                    key={'e-' + i}
                    alt={v}
                    src={url}
                    srcSet={retinaUrl + ' 2x'}
                />
            );
        } else {
            return v;
        }
    });
}