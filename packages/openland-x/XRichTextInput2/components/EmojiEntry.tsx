import React from 'react';
import { css, cx } from 'linaria';
import { getShortNameForImage } from '../utils/getShortNameForImage';
import { ContentState } from 'draft-js';
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
    width: 19px;
`;

type EmojiEntry = {
    cacheBustParam: string;
    imagePath: string;
    imageType: string;
    className?: string;
    decoratedText: string;
    entityKey: string;
    contentState: ContentState;
    children: any;
};

export const EmojiEntry = (props: any) => {
    const {
        cacheBustParam,
        imagePath,
        entityKey,
        contentState,
        imageType,
        className,
        decoratedText,
        children,
    }: EmojiEntry = props;

    const entity = contentState.getEntity(entityKey);

    const shortName = React.useMemo(() => {
        return emojione.toShort(decoratedText);
    }, [decoratedText, entity.getData().unified]);

    const shortNameForImage = React.useMemo(() => {
        if (entity.getData().unified) {
            return entity.getData().unified;
        }
        return getShortNameForImage(shortName);
    }, [shortName, entity.getData().unified]);

    const finalUrl = `${imagePath}${shortNameForImage}.${imageType}${cacheBustParam}`;

    return (
        <span
            className={cx(className, emojiClassName)}
            title={shortName}
            style={{
                backgroundImage: `url(${finalUrl})`,
            }}
        >
            {children}
        </span>
    );
};
