import React, { Component } from 'react';
import { genKey } from 'draft-js';
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

type EmojiSuggestionsT = {
    cacheBustParam: string;
    imagePath: string;
    imageType: string;
    ariaProps?: any;
    onClose: Function;
    onOpen: Function;
    onSearchChange: any;
    positionSuggestions: any;
    shortNames: any;
    getEditorState: any;
    setEditorState: any;
    getPortalClientRect: any;
    escapeSearch: any;
};

export class EmojiSuggestions extends Component<EmojiSuggestionsT> {
    state = {
        isActive: false,
        focusedOptionIndex: 0,
    };
    lastSelectionIsInsideWord: any;

    activeOffsetKey: any;
    lastSearchValue: any;
    key: any;
    popover: any;
    filteredEmojis: any;

    componentWillMount() {
        this.key = genKey();
    }

    componentDidUpdate = (prevProps: any, prevState: any) => {
        const { getPortalClientRect, positionSuggestions } = this.props;

        if (this.popover) {
            // In case the list shrinks there should be still an option focused.
            // Note: this might run multiple times and deduct 1 until the condition is
            // not fullfilled anymore.
            const size = this.filteredEmojis.size;
            if (size > 0 && this.state.focusedOptionIndex >= size) {
                this.setState({
                    focusedOptionIndex: size - 1,
                });
            }

            const decoratorRect = getPortalClientRect(this.activeOffsetKey);
            const newStyles = positionSuggestions({
                decoratorRect,
                prevProps,
                prevState,
                props: this.props,
                state: this.state,
                filteredEmojis: this.filteredEmojis,
                popover: this.popover,
            });

            Object.keys(newStyles).forEach(key => {
                this.popover.style[key] = newStyles[key];
            });
        }
    };

    onSearchChange = (editorState: any, selection: any) => {
        const { onSearchChange } = this.props;
        const { word } = getSearchText(editorState, selection);
        const searchValue = word.substring(1, word.length);
        if (this.lastSearchValue !== searchValue && typeof onSearchChange === 'function') {
            this.lastSearchValue = searchValue;
            onSearchChange({ value: searchValue });
        }
    };

    onDownArrow = (keyboardEvent: any) => {
        keyboardEvent.preventDefault();
        const newIndex = this.state.focusedOptionIndex + 1;
        this.onEmojiFocus(newIndex >= this.filteredEmojis.size ? 0 : newIndex);
    };

    onTab = (keyboardEvent: any) => {
        keyboardEvent.preventDefault();
        this.commitSelection();
    };

    onUpArrow = (keyboardEvent: any) => {
        keyboardEvent.preventDefault();
        if (this.filteredEmojis.size > 0) {
            this.onEmojiFocus(Math.max(this.state.focusedOptionIndex - 1, 0));
        }
    };

    onEscape = (keyboardEvent: any) => {
        const { setEditorState, getEditorState, escapeSearch } = this.props;

        keyboardEvent.preventDefault();

        escapeSearch(
            this.lastSelectionIsInsideWord
                .filter((value: any) => value === true)
                .keySeq()
                .first(),
        );

        // to force a re-render of the outer component to change the aria props
        setEditorState(getEditorState());
    };

    onEmojiSelect = (emoji: string) => {
        const { getEditorState, setEditorState } = this.props;

        setEditorState(
            addEmoji({
                editorState: getEditorState(),
                emojiShortName: emoji,
                mode: AddEmojiMode.REPLACE,
            }),
        );
    };

    onEmojiFocus = (index: number) => {
        const { setEditorState, getEditorState } = this.props;
        this.setState({ focusedOptionIndex: index });

        // to force a re-render of the outer component to change the aria props
        setEditorState(getEditorState());
    };

    // Get the first 6 emojis that match
    getEmojisForFilter = () => {
        const { getEditorState, shortNames } = this.props;
        const selection = getEditorState().getSelection();
        const { word } = getSearchText(getEditorState(), selection);
        const emojiValue = word.substring(1, word.length).toLowerCase();
        const filteredValues = shortNames.filter(
            (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
        );

        return filteredValues.setSize(filteredValues.size < 9 ? filteredValues.size : 9);
    };

    commitSelection = () => {
        this.onEmojiSelect(this.filteredEmojis.get(this.state.focusedOptionIndex));
        return 'handled';
    };

    render() {
        if (!this.state.isActive) {
            return null;
        }

        this.filteredEmojis = this.getEmojisForFilter();
        const {
            cacheBustParam,
            imagePath,
            imageType,
            ariaProps,
            onClose,
            onOpen,
            onSearchChange,
            positionSuggestions,
            shortNames,
            ...restProps
        } = this.props;
        return (
            <div
                {...restProps}
                className={emojiSuggestionsClassName}
                role="listbox"
                id={`emojis-list-${this.key}`}
                ref={element => {
                    this.popover = element;
                }}
            >
                {this.filteredEmojis
                    .map((emoji: string, index: number) => (
                        <EmojiSuggestionsEntry
                            key={emoji}
                            onEmojiSelect={this.onEmojiSelect}
                            onEmojiFocus={this.onEmojiFocus}
                            isFocused={this.state.focusedOptionIndex === index}
                            emoji={emoji}
                            index={index}
                            id={`emoji-option-${this.key}-${index}`}
                            imagePath={imagePath}
                            imageType={imageType}
                            cacheBustParam={cacheBustParam}
                        />
                    ))
                    .toJS()}
            </div>
        );
    }
}
