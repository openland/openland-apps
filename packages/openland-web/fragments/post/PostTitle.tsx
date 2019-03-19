import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { ContentState, DraftHandleValue, EditorState } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import EmojiIcon from 'openland-icons/ic-emoji.svg';
import { XInput } from 'openland-x/XInput';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { XMemo } from 'openland-y-utils/XMemo';

const desktopWrapperClassName = css`
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

export const desktopInvalidClassName = css`
    & .DraftEditor-root .public-DraftEditorPlaceholder-root {
        color: #e26363 !important;
    }
`;

const emojiPositionClassName = css`
    position: absolute;
    top: 6px;
    right: 12px;
    & > div > div {
        top: 30px;
        right: 0;
        bottom: auto !important;
    },
`;

export const emojiWrapperClassName = css`
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
        right: 0;
        bottom: 50px;
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
class DesktopPostTitle extends React.PureComponent<TextInputProps, TextInputState> {
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
                <div className={cx(desktopWrapperClassName, invalid && desktopInvalidClassName)}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        ref={this.editorRef}
                        plugins={[emojiPlugin]}
                    />
                    <div
                        className={`${emojiWrapperClassName} ${emojiPositionClassName} emoji-wrapper`}
                    >
                        <EmojiSelect />
                    </div>
                </div>
            );
        }
        return null;
    }
}

const MobilePostTitle = (props: TextInputProps) => (
    <XView zIndex={1}>
        <XInput
            {...props}
            color="flat"
            minHeight={30}
            height={30}
            attach="both"
            fontSize={22}
            fontWeight={600}
            lineHeight={1.36}
            padding={0}
        />
    </XView>
);

export const PostTitle = XMemo<TextInputProps>(props => {
    const { isMobile } = React.useContext(MobileSidebarContext);
    return isMobile ? <MobilePostTitle {...props} /> : <DesktopPostTitle {...props} />;
});
