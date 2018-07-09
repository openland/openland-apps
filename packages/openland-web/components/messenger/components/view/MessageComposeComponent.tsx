import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { getConfig } from '../../../../config';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput } from 'openland-x/XRichTextInput';

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>((props) => ({
    width: 24,
    height: 24,
    marginTop: 5,
    cursor: props.disable ? 'default !important' : 'poonter',
    '& > i': {
        fontSize: 25,
        color: '#bcc3cc'
    },
    '&:hover': {
        '& > i': {
            color: props.disable ? '#bcc3cc' : '#334562'
        }
    }
}));

const SendMessageContainer = Glamorous(XHorizontal)({
    width: '100%',
    height: 100,
    flexShrink: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 10,
    borderTop: '1px solid rgba(229, 233, 242, 0.5)'
});

export interface MessageComposeComponentProps {
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
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
            <SendMessageContainer alignItems="stretch" justifyContent="center" >
                <XHorizontal maxWidth={850} flexGrow={1} separator={15}>
                    <AttachmentButton
                        onClick={this.handleAttach}
                        enabled={this.props.enabled !== false}
                        disable={this.props.enabled === false}
                    >
                        <XIcon icon="attachment" />
                    </AttachmentButton>
                    {/* <XInput
                        placeholder="Write a message..."
                        flexGrow={1}
                        value={this.state.message}
                        onChange={this.handleChange}
                        onEnter={this.handleSend}
                        ref={this.input}
                        disabled={this.props.enabled === false}
                    /> */}
                    <XRichTextInput
                        placeholder="Write a message..."
                        flexGrow={1}
                        onChange={this.handleChange}
                        onSubmit={this.handleSend}
                        ref={this.input}
                    />
                    {/* <XTextArea
                        placeholder="Write a message..."
                        flexGrow={1}
                        value={this.state.message}
                        onChange={this.handleChange}
                        onEnter={this.handleSend}
                        disabled={this.props.enabled === false}

                        maxheight={'100%'}
                        resize={false}
                        bordered={false}
                        size="small"
                        appearance="chat"
                        // ref={this.input}
                    /> */}
                    <XButton
                        text="Send"
                        size="medium"
                        style="primary"
                        action={this.handleSend}
                        iconRight="send"
                        enabled={this.props.enabled !== false}
                    />
                </XHorizontal>
            </SendMessageContainer>
        );
    }
}