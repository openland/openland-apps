import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { getConfig } from '../../../../config';
import UploadCare from 'uploadcare-widget';

let SendMessageContainer = Glamorous(XHorizontal)({
    // flexGrow: 1,
    width: '100%',
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    flexBasis: 96,
    paddingLeft: 24,
    paddingRight: 24,
    borderTop: '1px solid rgba(229, 233, 242, 0.5)',
    zIndex: 10
});

export interface MessageComposeComponentProps {
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
}

interface MessageComposeComponentState {
    message: string;
}

export class MessageComposeComponent extends React.PureComponent<MessageComposeComponentProps, MessageComposeComponentState> {

    private input = React.createRef<XInput>();
    private wasFocused = false;

    state = {
        message: ''
    };

    focus = () => {
        if (this.input.current) {
            this.input.current.focus();
        }
    }

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!
        });
        dialog.done((r) => {
            // this.props.conversation.sendFile(r);
            this.setState({ message: '' }, () => {
                this.focus();
                if (this.props.onSendFile) {
                    this.props.onSendFile(r);
                }
            });
        });
    }

    private handleSend = () => {
        if (this.state.message.trim().length > 0) {
            let msg = this.state.message.trim();
            this.setState({ message: '' }, () => {
                this.focus();
                if (this.props.onSend) {
                    this.props.onSend(msg);
                }
            });
        }
    }

    private handleChange = (src: string) => {
        this.setState({ message: src });
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
            <SendMessageContainer>
                <XButton icon="add" size="medium" onClick={this.handleAttach} enabled={this.props.enabled !== false} />
                <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} ref={this.input} disabled={this.props.enabled === false} />
                <XButton text="Send" size="medium" action={this.handleSend} iconRight="send" enabled={this.props.enabled !== false} />
            </SendMessageContainer>
        );
    }
}