import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
const emojione = require('emojione');

// let shortnames = emojione.shortnames as string; // add |:some_custom_emoji: for custom emoji
let shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');
let emojiList = emojione.emojioneList;
let baseUrl = 'https://cdn.openland.com/shared/web/emoji/4.0/png/';
export class EmojiFlags {
    static ignoreEmojione = canUseDOM && localStorage.getItem('meke_web_great_again') === 'true';
}

type SizeT = 10 | 12 | 14 | 16 | 18 | 20 | 25 | 36;

export function emoji({
    src,
    size,
    crop,
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
    let res = emojione.toShort(src) as string;

    let style: any = null;
    if (size === 14) {
        style = {
            marginTop: -2,
        };
    }

    if (size === 16) {
        style = {
            marginTop: -3,
        };
    }
    if (size === 12) {
        style = {
            marginTop: -2,
        };
    }
    if (size === 36) {
        style = {
            marginTop: -6,
        };
    }
    return (
        <span>
            {res
                .split(shortnamesRegexp)
                .filter(Boolean)
                .map((v, i) => {
                    if (emojiList[v]) {
                        let fname = emojiList[v].uc_base;
                        let url = baseUrl + assetSize + '/' + fname + '.png';
                        let retinaUrl = baseUrl + assetRetinaSize + '/' + fname + '.png';

                        if (crop) {
                            return (
                                <figure
                                    style={{
                                        display: 'inline-block',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height,
                                        width: height,
                                        ...crop.figureStyle,
                                    }}
                                >
                                    <img
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            alignSelf: 'center',
                                            verticalAlign: 'middle',
                                            // background: 'white',
                                            ...crop.imgStyle,
                                        }}
                                        width={height}
                                        height={height}
                                        key={'e-' + i}
                                        alt={v}
                                        src={url}
                                        srcSet={retinaUrl + ' 2x'}
                                    />
                                </figure>
                            );
                        }
                        return (
                            <img
                                style={{
                                    alignSelf: 'center',
                                    verticalAlign: 'middle',
                                    ...(style ? style : {}),
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
                })}
        </span>
    );
}
