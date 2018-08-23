import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { getConfig } from '../../../../config';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput } from 'openland-x/XRichTextInput';

const SendMessageWrapper = Glamorous(XHorizontal)({
    width: '100%',
    minHeight: 64,
    maxHeight: 150,
    backgroundColor: '#f9fafb',
    flexShrink: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)'
});

const SendMessageContent = Glamorous(XHorizontal)({
    width: '100%',
    maxWidth: 1000,
    flexBasis: '100%'
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    cursor: props.disable ? 'default !important' : 'poonter',
    '& > i': {
        fontSize: 25,
        color: '#bcc3cc'
    },
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        '& > i': {
            color: props.disable ? '#bcc3cc' : '#1790ff'
        }
    }
}));

const TextInputWrapper = Glamorous.div({
    flexGrow: 1,
    maxHeight: '100%',
    maxWidth: 'calc(100% - 145px)',
    '& > div': {
        maxHeight: '100%',
        height: '100%',
        '& .DraftEditor-root': {
            overflow: 'auto',
            borderRadius: 20,
            backgroundColor: '#fff',
            border: 'solid 1px #eef0f2',
            minHeight: 40,
            maxHeight: 125,
            paddingTop: 9,
            paddingLeft: 16,
            paddingRight: 40,
        }
    }
});

export interface MessageComposeComponentProps {
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
}

export class MessageComposeComponent extends React.PureComponent<MessageComposeComponentProps> {

    private input = React.createRef<XRichTextInput>();
    private wasFocused = false;
    private message: string = '';

    // focus = () => {
    //     if (this.input.current) {
    //         this.input.current.focus();
    //     }
    // }

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!
        });
        dialog.done((r) => {
            // this.props.conversation.sendFile(r);
            this.setState({ message: '' }, () => {
                // this.focus();
                if (this.props.onSendFile) {
                    this.props.onSendFile(r);
                }
            });
        });
    }

    private handleSend = () => {
        if (this.message.trim().length > 0) {
            let msg = this.message.trim();
            if (this.props.onSend) {
                this.props.onSend(msg);
            }
            if (this.input.current) {
                this.input.current!!.resetAndFocus();
            }
        }
    }

    private handleChange = (src: string) => {
        this.message = src;
        if (src.length > 0 && this.props.onChange) {
            this.props.onChange(src);
        }
    }

    private focusIfNeeded = () => {
        if (this.props.enabled !== false && !this.wasFocused) {
            this.wasFocused = true;
            if (this.input.current) {
                this.input.current.focus();
            }
        }
    }

    componentDidMount() {
        this.focusIfNeeded();
    }

    componentDidUpdate() {
        this.focusIfNeeded();
    }

    render() {
        return (
            <SendMessageWrapper alignItems="stretch" justifyContent="center" >
                <SendMessageContent separator={4} alignItems="center">
                    <AttachmentButton
                        onClick={this.props.enabled === false ? undefined : this.handleAttach}
                        enabled={this.props.enabled === false}
                        disable={this.props.enabled === false}
                    >
                        <XIcon icon="attachment" />
                    </AttachmentButton>
                    <TextInputWrapper>
                        <XRichTextInput
                            placeholder="Write a message..."
                            flexGrow={1}
                            onChange={this.handleChange}
                            onSubmit={this.handleSend}
                            ref={this.input}
                        />
                    </TextInputWrapper>
                    <XButton
                        text="Send"
                        size="r-default"
                        style="primary-sky-blue"
                        action={this.handleSend}
                        iconRight="send"
                        enabled={this.props.enabled !== false}
                    />
                </SendMessageContent>
            </SendMessageWrapper>
        );
    }
}