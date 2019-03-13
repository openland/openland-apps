import React from 'react';
import { genKey } from 'draft-js';
import { css, cx } from 'linaria';

const emojiSuggestionsShow = css`
    transform: scale(1);
`;

const emojiSuggestionsHide = css`
    transform: scale(0);
`;

const emojiSuggestionsClassName = css`
    // transform-origin: 1em 0%;
    // transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);

    border: 1px solid #eee;
    margin-top: 1.75em;
    position: absolute;
    min-width: 220px;
    bottom: 50px;
    max-width: 440px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 4px 30px 0px rgba(220, 220, 220, 1);
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

type EmojiSuggestionsProps = {
    cursorXPosition: number;
    items: any;
    show: boolean;
};

export const EmojiSuggestions = ({ cursorXPosition, items, show }: EmojiSuggestionsProps) => {
    const [key] = React.useState(genKey());

    return (
        <div
            className={cx(
                emojiSuggestionsClassName,
                show ? emojiSuggestionsShow : emojiSuggestionsHide,
            )}
            style={{
                left: cursorXPosition,
            }}
            role="listbox"
            id={`emojis-list-${key}`}
        >
            {items}
        </div>
    );
};
