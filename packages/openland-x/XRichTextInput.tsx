import * as React from 'react';
import Glamorous from 'glamorous';
import Editor from 'draft-js-plugins-editor';
import { EditorState, getDefaultKeyBinding, ContentState, DraftHandleValue } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';
import createEmojiPlugin from 'draft-js-emoji-plugin';

const EmojiWrapper = Glamorous.div({
    position: 'absolute',
    top: 'calc(50% - 9px)',
    right: 12,
    '& > div > button': {
        width: 18,
        height: 18,
        opacity: 1,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '10px',
        fontSize: 26,
        paddingBottom: 2,
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.05)'
        },
        '&.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu': {
            backgroundColor: 'rgba(23, 144, 255, 0.05)'
        }
    },
    '& > div > div': {
        bottom: 50,
        right: 0
    }
});

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (element: HTMLElement) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement!!);
};

const emojiPlugin = createEmojiPlugin({
    positionSuggestions: (args: any) => {
        let { state, filteredEmojis, popover, decoratorRect } = args;
        const relativeParent = getRelativeParent(popover.parentElement);
        let relativeRect: any = {};
        if (relativeParent) {
            relativeRect.scrollLeft = relativeParent.scrollLeft;
            relativeRect.scrollTop = relativeParent.scrollTop;

            const relativeParentRect = relativeParent.getBoundingClientRect();
            relativeRect.left = decoratorRect.left - relativeParentRect.left;
            relativeRect.top = decoratorRect.top - relativeParentRect.top + relativeParentRect.height;
            console.warn(relativeParentRect);
        } else {
            relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            relativeRect.top = decoratorRect.top;
            relativeRect.left = decoratorRect.left;
        }

        const left = relativeRect.left + relativeRect.scrollLeft;
        const top = relativeRect.top - relativeRect.scrollTop + 8;

        let transform;
        let transition;
        if (state.isActive) {
            if (filteredEmojis.size > 0) {
                transform = 'scale(1)';
                transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
            } else {
                transform = 'scale(0)';
                transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
            }
        }

        return {
            left: `${left}px`,
            bottom: `${top}px`,
            transform,
            transformOrigin: '1em 0%',
            transition,
        };
    }
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const Container = Glamorous.div<XFlexStyles>([{
    position: 'relative'
}, applyFlex]);

function keyBinding(e: React.KeyboardEvent<any>): string | null {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export class XRichTextInput extends React.Component<{ onChange?: (value: string) => void, onSubmit?: () => void, placeholder?: string } & XFlexStyles, { editorState: EditorState }> {

    private editorRef = React.createRef<Editor>();
    state = {
        editorState: EditorState.createEmpty()
    };

    focus = () => {
        if (this.editorRef.current) {
            this.editorRef.current.focus();
        }
    }

    reset = () => {
        this.setState((src) => ({ editorState: EditorState.push(src.editorState, ContentState.createFromText(''), 'remove-range') }));
    }

    resetAndFocus = () => {
        this.setState((src) => ({ editorState: EditorState.push(src.editorState, ContentState.createFromText(''), 'remove-range') }), () => { this.focus(); });
    }

    onHandleKey: (command: string) => DraftHandleValue = (command: string) => {
        if (command === 'x-editor-submit') {
            if (this.props.onSubmit) {
                this.props.onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState: editorState });
        if (this.props.onChange) {
            // console.warn(editorState.getCurrentContent());
            this.props.onChange(editorState.getCurrentContent().getPlainText());
        }
    }

    render() {
        if (canUseDOM) {
            return (
                <Container {...extractFlexProps(this.props)}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        keyBindingFn={keyBinding}
                        handleKeyCommand={this.onHandleKey}
                        ref={this.editorRef}
                        plugins={[emojiPlugin]}
                    />

                    <EmojiSuggestions />
                    <EmojiWrapper className="emoji-button">
                        <EmojiSelect />
                    </EmojiWrapper>
                </Container>
            );
        } else {
            return <Container {...extractFlexProps(this.props)} />;
        }
    }
}