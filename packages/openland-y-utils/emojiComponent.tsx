import * as React from 'react';
import { css } from 'linaria';

const emojiStyle = css`
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
`;

export function emojiComponent(name: string, key?: string) {
    let url = 'https://cdn.openland.com/shared/emoji/128/' + name + '.png';
    return (
        <img
            className={emojiStyle}
            src={url}
            key={key}
        />
    );
}