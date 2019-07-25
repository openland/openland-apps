import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { emojiExtract } from './emojiExtract';

let baseUrl = 'https://cdn.openland.com/shared/emoji/';
export class EmojiFlags {
    static ignoreEmojione = canUseDOM && localStorage.getItem('meke_web_great_again') === 'true';
}

type SizeT = 10 | 12 | 13 | 14 | 15 | 16 | 18 | 20 | 25 | 38;

const cacheMap = {};

// get native from short
// if paste depends on native, how it can work on other platforms? (BAD)
// better to make it depend on shortname

export function emoji({
    src,
    size,
    crop,
    cache,
}: {
    src: string;
    size?: SizeT;
    crop?: {
        figureStyle: {
            marginLeft?: number;
            marginRight?: number;
            width?: number;
            marginBottom?: number;
        };
        imgStyle: {
            marginLeft?: number;
            marginRight?: number;
        };
    };
    cache?: boolean;
}) {
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

    let emojies = emojiExtract(src);
    if (emojies.length === 0) {
        return src;
    }
    // let res;
    // if (cache && cacheMap[src]) {
    //     res = cacheMap[src];
    // } else {
    //     res = emojione.toShort(src) as string;
    // }

    // if (cache) {
    //     cacheMap[src] = res;
    // }

    let style: any = null;
    if (size === 15) {
        style = {
            marginTop: -4,
        };
    }
    if (size === 14) {
        style = {
            marginTop: -1,
        };
    }
    if (size === 16) {
        style = {
            marginTop: -3,
        };
    }
    if (size === 18) {
        style = {
            marginTop: -4,
        };
    }
    if (size === 12) {
        style = {
            marginTop: -2,
        };
    }
    if (size === 20) {
        style = {
            marginTop: -6,
        };
    }
    if (size === 38) {
        style = {
            marginTop: -6,
        };
    }

    let offset = 0;
    let res: any[] = [];
    for (let e of emojies) {
        if (e.start > offset) {
            res.push(src.substring(offset, e.start));
        }
        let v = src.substring(e.start, e.start + e.length);
        let url = baseUrl + assetSize + '/' + e.name + '.png';
        res.push(<img
            width={height}
            height={height}
            style={style}
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
