import React from 'react';
import { genKey, EditorState } from 'draft-js';
import { EmojiSuggestionsEntry } from './EmojiSuggestionsEntry';
import { addEmoji, Mode as AddEmojiMode } from '../modifiers/addEmoji';
import { css } from 'linaria';
import { emojiList } from '../utils/emojiList';

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
    // transform: scale(0);
`;

type EmojiSuggestionsProps = {
    activeWord: string;
    cacheBustParam: string;
    imagePath: string;
    imageType: string;
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
};

const shortNames: any[] = Object.keys(emojiList.list);

export const EmojiSuggestions = ({
    cacheBustParam,
    imagePath,
    imageType,
    activeWord,
    setEditorState,
    editorState,
}: EmojiSuggestionsProps) => {
    const [key] = React.useState(genKey());

    const popoverRef = React.useRef(null);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(0);

    const emojiValue = activeWord.substring(1, activeWord.length).toLowerCase();

    const filteredValues = shortNames.filter(
        (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
    );

    const filteredEmojis = filteredValues.slice(0, 9);

    const onEmojiFocus = (index: number) => {
        setFocusedOptionIndex(index);

        // to force a re-render of the outer component to change the aria props
        setEditorState(editorState);
    };

    const onEmojiSelect = (emoji: string) => {
        setEditorState(
            addEmoji({
                editorState: editorState,
                emojiShortName: emoji,
                mode: AddEmojiMode.REPLACE,
            }),
        );
    };

    if (!filteredEmojis.length) {
        return null;
    }

    return (
        <div
            className={emojiSuggestionsClassName}
            role="listbox"
            id={`emojis-list-${key}`}
            ref={popoverRef}
        >
            {filteredEmojis.map((emoji: string, index: number) => (
                <EmojiSuggestionsEntry
                    key={emoji}
                    onEmojiSelect={onEmojiSelect}
                    onEmojiFocus={onEmojiFocus}
                    isFocused={focusedOptionIndex === index}
                    emoji={emoji}
                    index={index}
                    id={`emoji-option-${key}-${index}`}
                    imagePath={imagePath}
                    imageType={imageType}
                    cacheBustParam={cacheBustParam}
                />
            ))}
        </div>
    );
};
