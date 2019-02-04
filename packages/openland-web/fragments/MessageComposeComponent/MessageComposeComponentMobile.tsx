import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageFull_mentions, SharedRoomKind, PostMessageType } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { DropZone } from './FileUploading/DropZone';
import { FileUploader } from './FileUploading/FileUploader';
import { UploadContext } from './FileUploading/UploadContext';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { AttachmentButtons } from './AttachmentButtons';

const TextArea = css`
    border-radius: 10px;
    background-color: #fff;
    border: solid 1px #ececec;
    min-height: 40px;
    max-height: 255px;
    overflow: auto;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 16px;
    padding-right: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const InputPlaceholder = css`
    position: absolute;
    top: 10px;
    left: 17px;
    pointer-events: none;
    color: rgba(0, 0, 0, 0.5);
`;

interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
    getMessages?: () => ModelMessage[];
    fileRemover: Function;
    handleDrop: (file: any) => void;
}

interface MessageComposeComponentInnerState {
    message: string;
}

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '\n': '<br>',
};

function escapeHtml(str: string) {
    return String(str).replace(/[&<>"'`=\/\n]/g, function(s: string) {
        return entityMap[s];
    });
}

const SendMessage = ({
    message,
    handleChange,
    onPaste,
    inputRef,
    enabled,
    handleHideChat,
    handleDialogDone,
    handleSend,
}: {
    message: any;
    handleChange: any;
    onPaste: any;
    inputRef: any;
    enabled: any;
    handleHideChat: any;
    handleDialogDone: any;
    handleSend: any;
}) => {
    const { handleDrop } = React.useContext(UploadContext);
    return (
        <SendMessageWrapper>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    <XView flexGrow={1} maxHeight="100%" maxWidth="100%">
                        <div
                            contentEditable={true}
                            className={TextArea}
                            onInput={handleChange}
                            onPaste={onPaste}
                            ref={inputRef}
                        />
                        {message === '' && (
                            <div className={InputPlaceholder}>Write a message...</div>
                        )}
                    </XView>
                    <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                        <AttachmentButtons
                            enabled={enabled}
                            handleHideChat={handleHideChat}
                            handleDialogDone={handleDialogDone}
                        />

                        <XButton
                            text="Send"
                            style="primary"
                            action={handleSend}
                            iconRight="send"
                            enabled={enabled !== false}
                        />
                    </XHorizontal>
                    <FileUploader />
                </XVertical>
            </SendMessageContent>
        </SendMessageWrapper>
    );
};

export class MobileMessageCompose extends React.PureComponent<
    MessageComposeComponentProps,
    MessageComposeComponentInnerState
> {
    inputRef = React.createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);

        this.state = {
            message: '',
        };
    }

    handleDialogDone = (r: UploadCare.File) => {
        this.setState({ message: '' }, () => {
            if (this.props.onSendFile) {
                this.props.onSendFile(r);
            }
        });
    };

    private onUploadCareSendFile = (file: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', file);
        if (this.props.onSendFile) {
            this.props.onSendFile(ucFile);
        }
    };

    private handleSend = () => {
        let { message, file } = this.state;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend) {
                this.props.onSend(msg, null);

                if (file) {
                    this.onUploadCareSendFile(file);
                }
            }
        } else if (file) {
            this.onUploadCareSendFile(file);
        }
        this.closeEditor();
    };

    private handleChange = () => {
        if (!this.inputRef.current) {
            return;
        }

        const msg = this.inputRef.current.innerText;

        this.setState({
            message: msg,
        });

        if (this.props.onChange) {
            this.props.onChange(msg);
        }
    };

    private closeEditor = () => {
        this.setState({
            message: '',
        });
        this.props.fileRemover();

        if (this.inputRef.current) {
            this.inputRef.current.innerText = '';
        }
    };

    private onPaste = (e: any) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, escapeHtml(text));
        if (this.inputRef.current) {
            this.inputRef.current.scrollTop = this.inputRef.current.scrollHeight;
        }
    };

    componentDidMount() {
        if (this.inputRef.current) {
            this.inputRef.current.innerText = this.state.message;
        }
    }

    render() {
        let { message } = this.state;

        return (
            <SendMessage
                message={message}
                handleChange={this.handleChange}
                onPaste={this.onPaste}
                inputRef={this.inputRef}
                enabled={this.props.enabled}
                handleHideChat={this.props.handleHideChat}
                handleDialogDone={this.handleDialogDone}
                handleSend={this.handleSend}
            />
        );
    }
}
