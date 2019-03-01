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
    cacheBustParam: any;
    imagePath: any;
    imageType: any;
    ariaProps: any;
    callbacks: any;
    onClose: any;
    onOpen: any;
    onSearchChange: any;
    positionSuggestions: any;
    shortNames: any;
    store: any;
};

export class EmojiSuggestions extends Component<EmojiSuggestionsT> {
    state = {
        isActive: false,
        focusedOptionIndex: 0,
    };
    lastSelectionIsInsideWord: any;
    closeDropdown: any;
    activeOffsetKey: any;
    lastSearchValue: any;
    key: any;
    popover: any;
    filteredEmojis: any;

    componentWillMount() {
        this.key = genKey();
    }

    componentDidUpdate = (prevProps: any, prevState: any) => {
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

            if (size <= 0) {
                this.closeDropdown();
            }

            const decoratorRect = this.props.store.getPortalClientRect(this.activeOffsetKey);
            const newStyles = this.props.positionSuggestions({
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

    componentWillUnmount = () => {
        this.props.callbacks.onChange = undefined;
    };

    onSearchChange = (editorState: any, selection: any) => {
        const { word } = getSearchText(editorState, selection);
        const searchValue = word.substring(1, word.length);
        if (
            this.lastSearchValue !== searchValue &&
            typeof this.props.onSearchChange === 'function'
        ) {
            this.lastSearchValue = searchValue;
            this.props.onSearchChange({ value: searchValue });
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
            const newIndex = this.state.focusedOptionIndex - 1;
            this.onEmojiFocus(Math.max(newIndex, 0));
        }
    };

    onEscape = (keyboardEvent: any) => {
        keyboardEvent.preventDefault();

        const activeOffsetKey = this.lastSelectionIsInsideWord
            .filter((value: any) => value === true)
            .keySeq()
            .first();
        this.props.store.escapeSearch(activeOffsetKey);
        this.closeDropdown();

        // to force a re-render of the outer component to change the aria props
        this.props.store.setEditorState(this.props.store.getEditorState());
    };

    onEmojiSelect = (emoji: string) => {
        this.closeDropdown();
        const newEditorState = addEmoji({
            editorState: this.props.store.getEditorState(),
            emojiShortName: emoji,
            mode: AddEmojiMode.REPLACE,
        });
        this.props.store.setEditorState(newEditorState);
    };

    onEmojiFocus = (index: number) => {
        this.setState({ focusedOptionIndex: index });

        // to force a re-render of the outer component to change the aria props
        this.props.store.setEditorState(this.props.store.getEditorState());
    };

    // Get the first 6 emojis that match
    getEmojisForFilter = () => {
        const selection = this.props.store.getEditorState().getSelection();
        const { word } = getSearchText(this.props.store.getEditorState(), selection);
        const emojiValue = word.substring(1, word.length).toLowerCase();
        const filteredValues = this.props.shortNames.filter(
            (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
        );
        const size = filteredValues.size < 9 ? filteredValues.size : 9;
        return filteredValues.setSize(size);
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
            callbacks,
            onClose,
            onOpen,
            onSearchChange,
            positionSuggestions,
            shortNames,
            store,
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
