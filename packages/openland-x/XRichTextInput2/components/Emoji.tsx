import React from 'react';
import { css } from 'linaria';
const unionClassNames = require('union-class-names').default;
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

    let emojiDisplay = null;
    if (useNativeArt === true) {
        emojiDisplay = <span title={emojione.toShort(decoratedText)}>{props.children}</span>;
    } else {
        // short name to image url code steal from emojione source code
        const shortNameForImage =
            emojione.emojioneList[shortName].unicode[
                emojione.emojioneList[shortName].unicode.length - 1
            ];

        const backgroundImage = `url(${imagePath}${shortNameForImage}.${imageType}${cacheBustParam})`;
        const combinedClassName = unionClassNames(className, emojiClassName);

        emojiDisplay = (
            <span
                className={combinedClassName}
                title={emojione.toShort(decoratedText)}
                style={{ backgroundImage }}
            >
                {props.children}
            </span>
        );
    }

    return emojiDisplay;
};
