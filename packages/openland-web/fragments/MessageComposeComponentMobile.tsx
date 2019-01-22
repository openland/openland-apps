import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { getConfig } from '../config';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import { DropZone } from './DropZone';
import { withUserInfo } from '../components/UserInfo';
import { withChannelMembers } from '../api/withChannelMembers';
import {
    MessageFull_mentions,
    SharedRoomKind,
    RoomMembers_members,
    PostMessageType,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import RemoveIcon from 'openland-icons/ic-close.svg';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import {
    SendMessageWrapper,
    SendMessageContent,
    AttachmentButton,
    TextInputWrapper,
    FileItem,
    FileImage,
    CoverWrapper,
    CoverDelButton,
    PostButton,
    convertChannelMembersDataToMentionsData,
} from './MessageComposeComponent';

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

interface MessageComposeComponentInnerProps extends MessageComposeComponentProps {
    members?: RoomMembers_members[];
}

class MessageComposeComponentInner extends React.PureComponent<
    MessageComposeComponentInnerProps,
    MessageComposeComponentInnerState
> {
    listOfMembersNames: string[];
    constructor(props: any) {
        super(props);

        this.state = {
            message: '',
            file: null,
            fileSrc: null,
            fileName: null,
        };
        this.listOfMembersNames = [];
    }

    private input = React.createRef<XRichTextInput>();
    private wasFocused = false;

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

    getMentions = (str: string) => {
        if (!this.props.members) {
            return null;
        }

        const mentionsNames = this.listOfMembersNames.filter((name: string) => str.includes(name));
        return this.props.members
            .filter(({ user: { name } }) => {
                return mentionsNames.indexOf(`@${name}`) !== -1;
            })
            .map(({ user }) => user);
    };

    private handleSend = () => {
        let { message, file } = this.state as MessageComposeComponentInnerState;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend) {
                let mentions = this.getMentions(msg);

                this.props.onSend(msg, mentions);

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

    private handleChange = (src: string) => {
        this.setState({
            message: src,
        });

        if (this.props.onChange) {
            this.props.onChange(src);
        }
    };

    private focusIfNeeded = () => {
        if (this.props.enabled !== false && !this.wasFocused) {
            this.wasFocused = true;
            if (this.input.current) {
                this.input.current.focus();
            }
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
        if (this.input.current) {
            this.input.current!!.resetAndFocus();
        }
        this.listOfMembersNames = [];
    };

    componentDidMount() {
        this.focusIfNeeded();
    }

    componentDidUpdate() {
        this.focusIfNeeded();
    }

    render() {
        let { message, file, fileName, fileSrc } = this.state;
        const mentionsData = convertChannelMembersDataToMentionsData(this.props.members);

        return (
            <SendMessageWrapper>
                <DropZone height="calc(100% - 115px)" onFileDrop={this.handleDrop} />
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        <TextInputWrapper>
                            <XRichTextInput
                                mentionsData={mentionsData}
                                placeholder="Write a message..."
                                flexGrow={1}
                                onChange={this.handleChange}
                                onSubmit={this.handleSend}
                                ref={this.input}
                                value={message}
                                onPasteFile={this.handleDrop}
                            />
                        </TextInputWrapper>
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

interface MessageComposeProps extends MessageComposeComponentProps, XWithRouter {
    members?: RoomMembers_members[];
}

const MessageCompose = withUserInfo(props => (
    <MessageComposeComponentInner {...props} />
)) as React.ComponentType<MessageComposeProps>;

export const MobileMessageCompose = withChannelMembers(props => (
    <MessageCompose {...props} members={props.data.members} />
)) as React.ComponentType<MessageComposeComponentProps>;
