import * as React from 'react';
import { css } from 'linaria';
import { animUnicodeToName } from './data/emoji-data';

const emojiStyle = css`
   height: 50px;
   width: 50px;
   display: block;
`;

export function emojiAnimated(unicode: string) {
    const name = animUnicodeToName.get(unicode);

    return (
        <img
            className={emojiStyle}
            alt={unicode}
            src={`https://cdn.openland.com/shared/anim/GIF/128/${name}_128.gif`}
        />
    );
}