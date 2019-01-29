import * as React from 'react';
import { css, cx } from 'linaria';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { ContentState, DraftHandleValue, EditorState } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import EmojiIcon from 'openland-icons/ic-emoji.svg';
import { Invalid } from './PostTitle';

const Wrapper = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    align-items: stretch;
    overflow: hidden;
    & .DraftEditor-root {
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex-grow: 1;
        & .public-DraftEditorPlaceholder-root {
            color: rgba(0, 0, 0, 0.5);
        }
        & .public-DraftEditorPlaceholder-hasFocus {
            color: rgba(0, 0, 0, 0.5);
        }
        & .DraftEditor-editorContainer {
            display: flex;
            flex-direction: column;
            flex: 1;
            & > div {
                flex: 1;
            }
        }
    }
`;

const emojiPlugin = createEmojiPlugin({
    selectButtonContent: <EmojiIcon />,
});

export const { EmojiSelect } = emojiPlugin;

interface TextInputProps {
    onChange: (value: string) => void;
    value: string;
    placeholder: string;
    invalid: boolean;
}

type TextInputState = {
    editorState: EditorState;
    plainText: string;
};

/// End Mentions
export class PostText extends React.PureComponent<TextInputProps, TextInputState> {
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
                </div>
            );
        }
        return null;
    }
}
