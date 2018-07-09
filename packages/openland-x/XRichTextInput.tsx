import * as React from 'react';
import Glamorous from 'glamorous';
import { EditorState, Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';

const Container = Glamorous.div<XFlexStyles>([{

}, applyFlex]);

export class XRichTextInput extends React.Component<{ onChange?: (value: string) => void, onKeyPres?: () => void, placeholder?: string } & XFlexStyles, { editorState: EditorState }> {

    private editorRef = React.createRef<Editor>();
    state = {
        editorState: EditorState.createEmpty()
    };

    focus = () => {
        if (this.editorRef.current) {
            this.editorRef.current.focus();
        }
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
                        ref={this.editorRef}
                    />
                </Container>
            );
        } else {
            return <Container {...extractFlexProps(this.props)} />;
        }
    }
}