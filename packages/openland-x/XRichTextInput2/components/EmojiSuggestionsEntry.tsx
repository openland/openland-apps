import React from 'react';
import { getShortNameForImage } from '../utils/getShortNameForImage';
import { css, cx } from 'linaria';
import { EmojiDataT } from '../useEmojiSuggestions';

const emojiSuggestionsEntryFocusedClassName = css`
    background-color: #e6f3ff;
`;

const emojiSuggestionsEntryClassName = css`
    padding: 5px 10px 1px 10px;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);

    &:active {
        background-color: #cce7ff;
    }
`;

const emojiSuggestionsEntryIconClassName = css`
    width: 1em;
    height: 1em;
    margin-left: 0.25em;
    margin-right: 0.25em;
    display: inline-block;
`;

const emojiSuggestionsEntryTextClassName = css`
    display: inline-block;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 368px;
    font-size: 0.9em;
`;

type EmojiSuggestionsEntryT = {
    imagePath: string;
    imageType: string;
    cacheBustParam: string;
    id: string;
    emoji: EmojiDataT;
    isSelected: boolean;
    onEmojiFocus?: Function;
};

export const EmojiSuggestionsEntry = React.memo(
    ({ imagePath, imageType, cacheBustParam, id, emoji, isSelected }: EmojiSuggestionsEntryT) => {
        const [isFocused, setIsFocused] = React.useState(false);

        React.useEffect(() => {
            setIsFocused(isSelected);
        }, [isSelected]);

        const onMouseLeave = () => setIsFocused(false);
        const onMouseEnter = () => setIsFocused(true);

        const shortNameForImage = React.useMemo(() => {
            return getShortNameForImage(emoji.shortName);
        }, [emoji]);

        const fullImagePath = `${imagePath}${shortNameForImage}.${imageType}${cacheBustParam}`;

        return (
            <div
                className={cx(
                    emojiSuggestionsEntryClassName,
                    isFocused && emojiSuggestionsEntryFocusedClassName,
                )}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                role="option"
                id={id}
                aria-selected={isFocused ? 'true' : 'false'}
            >
                <img
                    src={fullImagePath}
                    className={emojiSuggestionsEntryIconClassName}
                    role="presentation"
                />
                <span className={emojiSuggestionsEntryTextClassName}>{emoji.shortName}</span>
            </div>
        );
    },
);
