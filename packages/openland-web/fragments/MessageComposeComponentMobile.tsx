import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { getConfig } from '../config';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import { DropZone } from './DropZone';
import { MessageFull_mentions, SharedRoomKind, PostMessageType } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import RemoveIcon from 'openland-icons/ic-close.svg';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import {
    SendMessageWrapper,
    SendMessageContent,
    AttachmentButton,
    FileItem,
    FileImage,
    CoverWrapper,
    CoverDelButton,
    PostButton,
} from './MessageComposeComponent';

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
}

interface MessageComposeComponentInnerState {
    message: string;
    file: any | null;
    fileSrc: string | null;
    fileName: string | null;
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

export class MobileMessageCompose extends React.PureComponent<
    MessageComposeComponentProps,
    MessageComposeComponentInnerState
> {
    inputRef = React.createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);

        this.state = {
            message: '',
            file: null,
            fileSrc: null,
            fileName: null,
        };
    }

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(r => {
            this.setState({ message: '' }, () => {
                if (this.props.onSendFile) {
                    this.props.onSendFile(r);
                }
            });
        });
    };

    private handleSend = () => {
        let { message, file } = this.state;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend) {
                this.props.onSend(msg, null);

                if (file) {
                    const ucFile = UploadCare.fileFrom('object', file);
                    if (this.props.onSendFile) {
                        this.props.onSendFile(ucFile);
                    }
                }
            }
        } else if (file) {
            const ucFile = UploadCare.fileFrom('object', file);
            if (this.props.onSendFile) {
                this.props.onSendFile(ucFile);
            }
        }
        this.closeEditor();
    };

    private fileRemover = () => {
        this.setState({
            file: null,
            fileName: null,
            fileSrc: null,
        });
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

    private handleDrop = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (file.type.match('image')) {
                this.setState({
                    file: file,
                    fileSrc: reader.result,
                    fileName: null,
                });
            } else {
                this.setState({
                    file: file,
                    fileSrc: null,
                    fileName: file.name,
                });
            }
        };
    };

    private closeEditor = () => {
        this.setState({
            message: '',
            file: null,
            fileSrc: null,
            fileName: null,
        });

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
        let { file, fileName, fileSrc } = this.state;

        return (
            <SendMessageWrapper>
                <DropZone height="calc(100% - 115px)" onFileDrop={this.handleDrop} />
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        <XView flexGrow={1} maxHeight="100%" maxWidth="100%">
                            <div
                                contentEditable={true}
                                className={TextArea}
                                onInput={this.handleChange}
                                onPaste={this.onPaste}
                                ref={this.inputRef}
                            />
                        </XView>
                        <XHorizontal
                            alignItems="center"
                            justifyContent="space-between"
                            flexGrow={1}
                        >
                            <XHorizontal separator="none">
                                <AttachmentButton
                                    onClick={
                                        this.props.enabled === false ? undefined : this.handleAttach
                                    }
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                >
                                    <PhotoIcon />
                                    <span>Photo</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    onClick={
                                        this.props.enabled === false ? undefined : this.handleAttach
                                    }
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                    className="document-button"
                                >
                                    <FileIcon />
                                    <span>Document</span>
                                </AttachmentButton>
                                <PostButton
                                    enabled={this.props.enabled}
                                    handleHideChat={this.props.handleHideChat}
                                />
                            </XHorizontal>
                            <XButton
                                text="Send"
                                style="primary"
                                action={this.handleSend}
                                iconRight="send"
                                enabled={this.props.enabled !== false}
                            />
                        </XHorizontal>
                        {file &&
                            fileSrc && (
                                <CoverWrapper>
                                    <img src={fileSrc} />
                                    <CoverDelButton onClick={this.fileRemover}>
                                        <RemoveIcon />
                                    </CoverDelButton>
                                </CoverWrapper>
                            )}
                        {file &&
                            fileName && (
                                <FileItem key={'file' + fileName} separator={4} alignItems="center">
                                    <FileImage />
                                    <XHorizontal alignItems="center" separator={4}>
                                        <div>
                                            {fileName} <span>•</span> {niceBytes(Number(file.size))}
                                        </div>
                                        <XHorizontal
                                            alignItems="center"
                                            className="remove"
                                            onClick={this.fileRemover}
                                        >
                                            <RemoveIcon />
                                        </XHorizontal>
                                    </XHorizontal>
                                </FileItem>
                            )}
                    </XVertical>
                </SendMessageContent>
            </SendMessageWrapper>
        );
    }
}
