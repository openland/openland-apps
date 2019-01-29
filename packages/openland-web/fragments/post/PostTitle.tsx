import * as React from 'react';
import { css, cx } from 'linaria';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { ContentState, DraftHandleValue, EditorState } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import EmojiIcon from 'openland-icons/ic-emoji.svg';

const Wrapper = css`
    flex-shrink: 0;
    z-index: 2;
    & .emoji-wrapper {
        opacity: 0;
    }
    &:focus-within {
        & .emoji-wrapper {
            opacity: 1;
        }
    }
    & .DraftEditor-root {
        font-size: 22px;
        font-weight: 600;
        line-height: normal;
        padding-right: 40px;
        max-height: 130px;
        overflow: auto;
        & .public-DraftEditorPlaceholder-root {
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;

export const Invalid = css`
    & .DraftEditor-root .public-DraftEditorPlaceholder-root {
        color: #e26363 !important;
    }
`;

const EmojiWrapper = css`
    position: absolute;
    top: 6px;
    right: 12px;
    & > div {
        display: block;
    }
    & > div > button {
        width: 18px;
        height: 18px;
        opacity: 1;
        border-radius: 50px;
        border: none;
        display: block;
        padding-bottom: 0;
        background: none !important;
        & svg {
            display: block;
            & * {
                fill: rgba(0, 0, 0, 0.25);
            }
        }
        &:hover svg * {
            fill: #1790ff;
        }
        &.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu svg * {
            fill: #1790ff;
        }
    }
    & > div > div {
        top: 30px;
        right: 0;
    },
`;

const emojiPlugin = createEmojiPlugin({
    selectButtonContent: <EmojiIcon />,
});

const { EmojiSelect } = emojiPlugin;

interface TextInputProps {
    onChange?: (value: string) => void;
    value: string;
    placeholder?: string;
    invalid: boolean;
}

type TextInputState = {
    editorState: EditorState;
    plainText: string;
};

/// End Mentions
export class PostTitle extends React.PureComponent<TextInputProps, TextInputState> {
    private editorRef = React.createRef<Editor>();

    constructor(props: TextInputProps) {
        super(props);

        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(props.value)),
            plainText: props.value,
        };
    }

    onChange = (editorState: EditorState) => {
        const plainText = editorState.getCurrentContent().getPlainText();
        this.setState(
            {
                editorState,
                plainText,
            },
            () => {
                if (this.props.onChange) {
                    this.props.onChange(plainText);
                }
            },
        );
    };

    componentWillReceiveProps(nextProps: TextInputProps) {
        const nextValue = nextProps.value;
        if (this.props.value !== nextValue && this.state.plainText !== nextValue) {
            this.setState({
                editorState: EditorState.moveFocusToEnd(
                    EditorState.createWithContent(ContentState.createFromText(nextValue)),
                ),
                plainText: nextValue,
            });
        }
    }

    render() {
        if (canUseDOM) {
            const { invalid } = this.props;
            return (
                <div className={cx(Wrapper, invalid && Invalid)}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        ref={this.editorRef}
                        plugins={[emojiPlugin]}
                    />
                    <div className={`${EmojiWrapper} emoji-wrapper`}>
                        <EmojiSelect />
                    </div>
                </div>
            );
        }
        return null;
    }
}
