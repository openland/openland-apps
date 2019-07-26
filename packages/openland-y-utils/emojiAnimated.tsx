import * as React from 'react';
import { css } from 'linaria';
import emojiData from './data/emoji-data';

const emojiStyle = css`
   height: 50px;
   width: 50px;
`;

export function emojiAnimated(unicode: string) {
    const name = emojiData.animUnicodeToName.get(unicode);

    return (
        <img
            className={emojiStyle}
            src={`https://cdn.openland.com/shared/anim/GIF/128/${name}_128.gif`}
        />
    );
}