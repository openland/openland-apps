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

export const Emoji = ({
    theme = {},
    cacheBustParam,
    imagePath,
    imageType,
    className,
    decoratedText,
    useNativeArt,
    ...props
}: {
    theme: any;
    cacheBustParam: any;
    imagePath: any;
    imageType: any;
    className: any;
    decoratedText: any;
    useNativeArt: any;
    children: any;
}) => {
    const shortName = emojione.toShort(decoratedText);

    if (useNativeArt === true) {
        return <span title={shortName}>{props.children}</span>;
    } else {
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
                {props.children}
            </span>
        );
    }
};
