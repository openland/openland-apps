import React from 'react';
import { css, cx } from 'linaria';
import { getShortNameForImage } from '../utils/getShortNameForImage';
const emojione = require('emojione');

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
    const shortName = React.useMemo(() => {
        return emojione.toShort(decoratedText);
    }, [decoratedText]);

    const shortNameForImage = React.useMemo(() => {
        return getShortNameForImage(shortName);
    }, [shortName]);

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
