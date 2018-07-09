import * as React from 'react';
import Glamorous from 'glamorous';
import { EditorState, Editor, getDefaultKeyBinding, DraftHandleValue, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';

const Container = Glamorous.div<XFlexStyles>([{

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
                    />
                </Container>
            );
        } else {
            return <Container {...extractFlexProps(this.props)} />;
        }
    }
}