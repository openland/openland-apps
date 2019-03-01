import React from 'react';
import { genKey, EditorState } from 'draft-js';
import { EmojiSuggestionsEntry } from './EmojiSuggestionsEntry';
import { addEmoji, Mode as AddEmojiMode } from '../modifiers/addEmoji';
import { getSearchText } from '../utils/getSearchText';
import { css } from 'linaria';

const emojiSuggestionsClassName = css`
    border: 1px solid #eee;
    margin-top: 1.75em;
    position: absolute;
    min-width: 220px;
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
    transform: scale(0);
`;

type EmojiSuggestionsProps = {
    cacheBustParam: string;
    imagePath: string;
    imageType: string;
    // positionSuggestions: any;
    // shortNames?: any;
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
    // getPortalClientRect: any;
};

type EmojiSuggestionsState = {
    isActive: boolean;
    focusedOptionIndex: number;
};

// React.useEffect(() => {
//     if (popoverRef) {
//         // In case the list shrinks there should be still an option focused.
//         // Note: this might run multiple times and deduct 1 until the condition is
//         // not fullfilled anymore.
//         const size = filteredEmojis.size;
//         if (size > 0 && focusedOptionIndex >= size) {
//             setFocusedOptionIndex(size - 1);
//         }

//         const decoratorRect = getPortalClientRect(this.activeOffsetKey);
// const newStyles = positionSuggestions({
//             decoratorRect,
//             prevProps,
//             prevState,
//             props: this.props,
//             state: this.state,
//             filteredEmojis: this.filteredEmojis,
//             popover: popoverRef,
//         });
//         Object.keys(newStyles).forEach((key: any) => {
//             if (popoverRef && popoverRef.current !== null) {
//                 popoverRef.current.style[key] = newStyles[key];
//             }
//         });
//     }
// });

export const NewEmojiSuggestions = (props: EmojiSuggestionsProps) => {
    const [key] = React.useState(genKey());
    const [isActive] = React.useState(false);
    const popoverRef = React.useRef(null);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(0);

    const {
        cacheBustParam,
        imagePath,
        imageType,
        // ariaProps,
        // onSearchChange,
        // positionSuggestions,
        // shortNames,
        ...restProps
    } = props;

    const { setEditorState, editorState } = props;

    if (!isActive) {
        return null;
    }

    const shortNames: any[] = [':+1:'];

    const getEmojisForFilter = () => {
        const selection = editorState.getSelection();
        const { word } = getSearchText(editorState, selection);
        const emojiValue = word.substring(1, word.length).toLowerCase();
        const filteredValues = shortNames.filter(
            (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
        );

        return filteredValues.slice(0, 9);
    };

    const filteredEmojis = getEmojisForFilter();

    const onEmojiSelect = (emoji: string) => {
        setEditorState(
            addEmoji({
                editorState: editorState,
                emojiShortName: emoji,
                mode: AddEmojiMode.REPLACE,
            }),
        );
    };

    const onEmojiFocus = (index: number) => {
        setFocusedOptionIndex(index);

        // to force a re-render of the outer component to change the aria props
        setEditorState(editorState);
    };

    return (
        <div
            {...restProps}
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
