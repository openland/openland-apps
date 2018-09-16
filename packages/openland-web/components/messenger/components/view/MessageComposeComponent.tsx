import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { getConfig } from '../../../../config';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import PhotoIcon from '../icons/ic-photo.svg';
import ListingIcon from '../icons/ic-listing.svg';
import FileIcon from '../icons/ic-file.svg';
import UloadIc from '../icons/file-upload.svg';
import { PostChannelModal } from '../../../../pages/main/channel/components/postChannelModal';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { withUserInfo, UserInfoComponentProps } from '../../../UserInfo';

const SendMessageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    minHeight: 114,
    maxHeight: 200,
    backgroundColor: '#f9fafb',
    flexShrink: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)'
});

const DropArea = Glamorous.div<{ dragOn: boolean }>(props => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 115px)',
    zIndex: 2,
    padding: 24,
    visibility: props.dragOn ? 'visible' : 'hidden',
    backgroundColor: props.dragOn ? '#fff' : 'transparent'
}));

const DropAreaContent = Glamorous.div<{ dragUnder: boolean }>(props => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: props.dragUnder ? 'rgba(23, 144, 255, 0.2)' : 'rgba(51, 69, 98, 0.1)',
    borderRadius: 8,
    backgroundColor: props.dragUnder ? 'rgba(23, 144, 255, 0.02)' : '#fff',
    '& > svg': {
        pointerEvents: 'none',
        '& > g': {
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC'
        }
    }
}));

const DropAreaTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#334562',
    marginTop: 23,
    marginBottom: 4
});

const DropAreaSubtitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#5c6a81'
});

const SendMessageContent = Glamorous(XHorizontal)({
    width: '100%',
    maxWidth: 800,
    flexBasis: '100%',
    paddingLeft: 50,
    paddingRight: 50
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>((props) => ({
    paddingLeft: 14,
    paddingRight: 14,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#a3acb8',
    cursor: props.disable ? 'default !important' : 'poonter',
    '&:hover': {
        color: props.disable ? '#a3acb8' : '#1790ff',
        backgroundColor: props.disable ? 'transparent' : 'rgba(23, 144, 255, 0.05)',
        '& > svg > path': {
            fill: props.disable ? '#c1c7cf' : 'rgba(23, 144, 255, 0.5)'
        }
    },
    '&.document-button:hover': {
        '& > svg > g > g': {
            fill: props.disable ? '#c1c7cf' : 'rgba(23, 144, 255, 0.5)'
        }
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 11
    }
}));

const TextInputWrapper = Glamorous.div({
    flexGrow: 1,
    maxHeight: '100%',
    maxWidth: '100%',
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
    conversationType?: string;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
}

class MessageComposeComponentInner extends React.PureComponent<MessageComposeComponentProps & XWithRouter & UserInfoComponentProps> {

    state = {
        dragOn: false,
        dragUnder: false
    };

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
            this.setState({ message: '', dragOn: false }, () => {
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

    private handleDrop = (e: any) => {
        e.preventDefault();

        this.setState({
            dragOn: false,
            dragUnder: false
        });

        let file = e.dataTransfer.files[0];

        let ucFile = UploadCare.fileFrom('object', file);

        if (this.props.onSendFile) {
            this.props.onSendFile(ucFile);
        }
    }

    private handleWindowDragover = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: true
        });
    }

    private handleWindowDrop = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: false
        });
    }

    private handleDragOver = () => {
        this.setState({
            dragUnder: true
        });
    }

    private handleDragLeave = () => {
        this.setState({
            dragUnder: false
        });
    }

    keydownHandler = (e: any) => {
        if (e.code === 'ArrowUp' && this.message.length === 0 && this.input.current && this.input.current.state.editorState.getSelection().getHasFocus() && this.props.conversation) {
            let messages = this.props.conversation.getState().messages.filter(m => isServerMessage(m) && this.props.user && m.sender.id === this.props.user.id);
            let message = messages[messages.length - 1];
            if (message && isServerMessage(message)) {
                e.preventDefault();
                this.props.router.replaceQueryParams({ editMessage: message.id });
            }

        }
    }

    componentDidMount() {
        this.focusIfNeeded();
        window.addEventListener('dragover', this.handleWindowDragover);
        window.addEventListener('drop', this.handleWindowDrop);
        window.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('dragover', this.handleWindowDragover);
        window.removeEventListener('drop', this.handleWindowDrop);
        window.removeEventListener('keydown', this.keydownHandler);
    }

    componentDidUpdate() {
        this.focusIfNeeded();
    }

    render() {
        return (
            <SendMessageWrapper>
                <DropArea
                    dragOn={this.state.dragOn}
                >
                    <DropAreaContent
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        dragUnder={this.state.dragUnder}
                    >
                        <UloadIc />
                        <DropAreaTitle>Drop files here</DropAreaTitle>
                        <DropAreaSubtitle>To send them as files</DropAreaSubtitle>
                    </DropAreaContent>
                </DropArea>
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        <TextInputWrapper>
                            <XRichTextInput
                                placeholder="Write a message..."
                                flexGrow={1}
                                onChange={this.handleChange}
                                onSubmit={this.handleSend}
                                ref={this.input}
                            />
                        </TextInputWrapper>
                        <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                            <XHorizontal separator={1}>
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                >
                                    <PhotoIcon />
                                    <span>Photo</span>
                                </AttachmentButton>
                                {this.props.conversationType === 'ChannelConversation' && this.props.conversationId && (
                                    <AttachmentButton
                                        query={{ field: 'addListing', value: 'true' }}
                                    // enabled={this.props.enabled === false}
                                    // disable={this.props.enabled === false}
                                    >
                                        <ListingIcon />
                                        <span>Listing</span>
                                    </AttachmentButton>
                                )}
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                    className="document-button"
                                >
                                    <FileIcon />
                                    <span>Document</span>
                                </AttachmentButton>
                            </XHorizontal>
                            <XButton
                                text="Send"
                                size="r-default"
                                style="primary-sky-blue"
                                action={this.handleSend}
                                iconRight="send"
                                enabled={this.props.enabled !== false}
                            />
                        </XHorizontal>
                    </XVertical>
                </SendMessageContent>
                <PostChannelModal targetQuery="addListing" />
            </SendMessageWrapper>
        );
    }
}

export let MessageComposeComponent = withUserInfo(withRouter((props) => <MessageComposeComponentInner {...props} />)) as React.ComponentType<MessageComposeComponentProps>;