import React from 'react';
import { genKey, EditorState } from 'draft-js';
import { css, cx } from 'linaria';

const emojiSuggestionsShow = css`
    transform: scale(1);
`;

const emojiSuggestionsHide = css`
    transform: scale(0);
`;

const emojiSuggestionsClassName = css`
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
    items: any;
    show: boolean;
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
};

export const EmojiSuggestions = ({ items, show }: EmojiSuggestionsProps) => {
    const [key] = React.useState(genKey());

    return (
        <div
            className={cx(
                emojiSuggestionsClassName,
                show ? emojiSuggestionsShow : emojiSuggestionsHide,
            )}
            role="listbox"
            id={`emojis-list-${key}`}
        >
            {items}
        </div>
    );
};
