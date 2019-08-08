import * as React from 'react';
import { css } from 'linaria';
import { emojiLink } from './emojiLink';

const emojiStyle = css`
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   transform: translateY(0.1em);
`;

export function emojiComponent(name: string, src?: string, key?: string) {
    return (
        <img
            alt={src}
            className={emojiStyle}
            src={emojiLink(name)}
            key={key}
        />
    );
}