import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { ContentState, DraftHandleValue, EditorState } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import EmojiIcon from 'openland-icons/ic-emoji.svg';
import { DesktopInvalid, EmojiWrapper } from './PostTitle';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { XTextArea } from 'openland-x/XTextArea';

const DesktopWrapper = css`
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
class DesktopPostText extends React.PureComponent<TextInputProps, TextInputState> {
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
                <div className={cx(DesktopWrapper, invalid && DesktopInvalid)}>
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

const MobilePostText = (props: TextInputProps) => (
    <XView flexDirection="column" flexGrow={1} alignItems="stretch">
        <XTextArea
            {...props}
            bordered={false}
            flexGrow={1}
            flexShrink={0}
            height="100%"
            minHeight="100%"
            padding={0}
            resize={false}
        />
    </XView>
);

export const EmojiSelectButton = React.memo(() => {
    const { isMobile } = React.useContext(MobileSidebarContext);
    if (!isMobile) {
        return (
            <XView flexDirection="row" alignItems="center" marginRight={10}>
                <div className={EmojiWrapper}>
                    <EmojiSelect />
                </div>
            </XView>
        );
    }
    return null;
});

export const PostText = React.memo<TextInputProps>(props => {
    const { isMobile } = React.useContext(MobileSidebarContext);
    return isMobile ? <MobilePostText {...props} /> : <DesktopPostText {...props} />;
});
