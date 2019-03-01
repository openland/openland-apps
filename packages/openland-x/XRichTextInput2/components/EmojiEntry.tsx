import React from 'react';
import { css, cx } from 'linaria';
const emojione = require('draft-js-emoji-plugin/node_modules/emojione');

const emojiClassName = css`
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    max-width: 1.95ch;
    max-height: 1em;
    line-height: inherit;
    margin: -0.2ex 0 0.2ex;
    color: transparent;
`;

type EmojiEntry = {
    cacheBustParam: string;
    imagePath: string;
    imageType: string;
    className?: string;
    decoratedText: string;
    children: any;
};

export const EmojiEntry = ({
    cacheBustParam,
    imagePath,
    imageType,
    className,
    decoratedText,
    children,
}: EmojiEntry) => {
    const shortName = emojione.toShort(decoratedText);

    // short name to image url code steal from emojione source code
    const shortNameForImage =
        emojione.emojioneList[shortName].unicode[
            emojione.emojioneList[shortName].unicode.length - 1
        ];

    return (
        <span
            className={cx(className, emojiClassName)}
            title={shortName}
            style={{
                backgroundImage: `url(${imagePath}${shortNameForImage}.${imageType}${cacheBustParam})`,
            }}
        >
            {children}
        </span>
    );
};
