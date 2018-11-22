import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { ChannelMembers_members } from 'openland-api/Types';
import { XModal } from 'openland-x-modal/XModal';
import { XThemeDefault } from 'openland-x/XTheme';
import { XLink } from 'openland-x/XLink';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { getConfig } from '../../../../config';
import { MutationFunc } from 'react-apollo';
import PhotoIcon from '../icons/ic-photo-2.svg';
import FileIcon from '../icons/ic-file-3.svg';
import UloadIc from '../icons/file-upload.svg';
import IntroIc from '../icons/ic-attach-intro-3.svg';
import ShortcutsIcon from '../icons/ic-attach-shortcuts-3.svg';
import CloseIcon from '../icons/ic-close.svg';
import { PostIntroModal } from './content/PostIntroModal';
import { withUserInfo, UserInfoComponentProps } from '../../../UserInfo';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { withMessageState } from '../../../../api/withMessageState';
import { withGetDraftMessage } from '../../../../api/withMessageState';
import { withChannelMembers } from '../../../../api/withChannelMembers';
import {
    ChatEditMessageVariables,
    ChatEditMessage,
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage
} from 'openland-api/Types';

const SendMessageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    minHeight: 114,
    maxHeight: 330,
    backgroundColor: XThemeDefault.backyardColor,
    flexShrink: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: XThemeDefault.separatorColor
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
    paddingLeft: 45,
    paddingRight: 45
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>((props) => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: props.disable ? 0.7 : undefined,
    cursor: props.disable ? 'default !important' : 'pointer',
    '&:first-child': {
        marginLeft: 6,
    },
    '@media (max-width: 800px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important'
        }
    },
    '&:hover': {
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)'
        }
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)'
        },
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
            borderRadius: 10,
            backgroundColor: '#ffffff',
            border: 'solid 1px #ececec',
            minHeight: 40,
            maxHeight: 255,
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 16,
            paddingRight: 40,
        }
    }
});

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 0 19px'
});

const KeyboardShortcut = Glamorous.div({
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#000000',
    marginBottom: 15,

    '& span': {
        margin: '-1px 8px -2px 0',
        padding: '1px 8px 2px',
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '20px',
        color: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },

    '& strong': {
        fontWeight: 600
    }
});

const ShortcutsModal = () => {
    return (
        <XModal
            title="Keyboard shortcuts"
            useTopCloser={true}
            target={(
                <AttachmentButton className="shortcuts-button">
                    <ShortcutsIcon />
                    <span>Shortcuts</span>
                </AttachmentButton>
            )}
        >
            <KeyboardShortcuts>
                <KeyboardShortcut><span>Ctrl + S</span> Search chats</KeyboardShortcut>
                <KeyboardShortcut><span>Esc</span> Close chat</KeyboardShortcut>
                <KeyboardShortcut><span><strong>↑</strong></span> Edit last message (works when the message box is in focus)</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + E</span> Edit last message</KeyboardShortcut>
                <KeyboardShortcut><span>Option + ↑ (Mac)</span><span>Alt + ↑ (Windows)</span> Previous chat</KeyboardShortcut>
                <KeyboardShortcut><span>Option + ↓ (Mac)</span><span>Alt + ↓ (Windows)</span> Next chat</KeyboardShortcut>
                <KeyboardShortcut><span>Enter</span> Send message</KeyboardShortcut>
                <KeyboardShortcut><span>Shift + Enter</span> New line</KeyboardShortcut>
                <KeyboardShortcut><span>Cmd + Enter (Mac)</span><span>Ctrl + Enter (Windows)</span> Submit form</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + Cmd + Space (Mac)</span> Emojis (standard Mac shortcut)</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + Option + N (Mac)</span><span>Ctrl + Alt + N (Windows)</span> New chat</KeyboardShortcut>
            </KeyboardShortcuts>
        </XModal>
    );
};

const EditWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14
});

const VerticalHidden = Glamorous(XVertical)({
    overflow: 'hidden'
});

const HorizontalHidden = Glamorous(XHorizontal)({
    overflow: 'hidden'
});

const BlueLine = Glamorous.div({
    width: 3,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#1790ff',
    flexShrink: 0
});

const EditTitle = Glamorous.div({
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 600,
    color: '#000'
});

const EditText = Glamorous.div({
    opacity: 0.8,
    fontSize: 13,
    lineHeight: 1.69,
    color: '#000',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const EditCloseBtn = Glamorous.div({
    cursor: 'pointer'
});

const EditView = (props: { title: string, message: string, onCancel: () => void }) => (
    <EditWrapper justifyContent="space-between" alignItems="center" separator={5}>
        <BlueLine />
        <HorizontalHidden flexGrow={1} separator={9} alignItems="center" justifyContent="space-between">
            <VerticalHidden separator={1}>
                <EditTitle>{props.title}</EditTitle>
                <EditText>{props.message}</EditText>
            </VerticalHidden>
            <EditCloseBtn onClick={props.onCancel}>
                <CloseIcon />
            </EditCloseBtn>
        </HorizontalHidden>
    </EditWrapper>
);

export interface MessageComposeComponentProps {
    conversationType?: string;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
}

interface MessageComposeWithChannelMembers extends MessageComposeWithDraft {
    members: ChannelMembers_members[];
}

interface MessageComposeWithDraft extends MessageComposeComponentProps {
    draft?: string | null;
}

interface MessageComposeComponentInnerProps extends MessageComposeComponentProps, XWithRouter, UserInfoComponentProps {
    members: ChannelMembers_members[];
    messagesContext: MessagesStateContextProps;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
    draft?: string | null;
}

interface Draft {
    conversationId?: string;
    message?: string;
}

interface MessageComposeComponentInnerState {
    dragOn: boolean;
    dragUnder: boolean;
    message: string;
    statlesMessage?: string;
    statlesMessageReply?: string;
    statlesMessageId?: string;
    statlesMessageSender?: string;
    statlesChatId?: string;
    beDrafted: boolean;
}

const convertChannelMembersDataToMentionsData = (data: any) => {
    if (!data) {
        return [];
    }
    return data.map(({user: { id, name, photo, online, isYou }}) => {
        return { id, name, avatar: photo, online, isYou };
    });
};

class MessageComposeComponentInner extends React.PureComponent<MessageComposeComponentInnerProps, MessageComposeComponentInnerState> {

    constructor(props: any) {
        super(props);
        let message = window.localStorage.getItem('conversation_draft_' + props.conversationId) || '';
        let draftKey = 'conversation_draft_' + this.props.conversationId;

        if (message === draftKey) {
            message = '';
        }

        this.state = {
            dragOn: false,
            dragUnder: false,
            message: message,
            statlesMessage: message,
            statlesMessageReply: undefined,
            statlesMessageId: undefined,
            statlesMessageSender: undefined,
            statlesChatId: undefined,
            beDrafted: false
        };
    }

    private input = React.createRef<XRichTextInput>();
    private wasFocused = false;

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!
        });
        dialog.done((r) => {
            this.setState({ message: '', dragOn: false }, () => {
                if (this.props.onSendFile) {
                    this.props.onSendFile(r);
                }
            });
        });
    }

    private handleSend = () => {
        let {
            message,
            statlesMessage,
            statlesMessageReply,
            statlesMessageId,
            statlesChatId
        } = this.state as any;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend && !statlesMessageId) {
                this.props.onSend(msg);
                this.setState({
                    beDrafted: false
                });
            }
            if ((statlesMessage || statlesMessageReply) && statlesMessageId) {
                if (statlesChatId) {
                    this.props.replyMessage({
                        variables: {
                            conversationId: statlesChatId,
                            message: message,
                            replyMessages: statlesMessageId
                        }
                    });
                }
            }
            this.closeEditor();
            this.changeDraft('');
            this.localDraftCleaner();
        }
    }

    private handleChange = (src: string) => {
        let { statlesMessageId, beDrafted } = this.state;

        this.setState({
            message: src
        });

        if (src.length > 0) {
            this.setState({
                beDrafted: true
            });
            this.localDraftSaver(src);
        }

        if (src.length === 0) {
            this.localDraftCleaner();
        }

        if (this.props.onChange) {
            this.props.onChange(src);
        }

        if (statlesMessageId || !beDrafted) {
            return;
        }

        this.changeDraft(src);

    }

    private localDraftSaver = (src: string) => {
        let draftKey = 'conversation_draft_' + this.props.conversationId;
        window.localStorage.setItem(draftKey, src);
    }

    private localDraftCleaner = () => {
        let draftKey = 'conversation_draft_' + this.props.conversationId;
        window.localStorage.setItem(draftKey, draftKey);
    }

    private changeDraft = (src: string) => {
        this.props.saveDraft({
            variables: {
                conversationId: this.props.conversationId,
                message: src
            }
        });
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

    private handleDragLeave = (e: any) => {
        let file = e.dataTransfer.files[0];
        if (file === undefined) {
            this.setState({
                dragOn: false
            });
        }
        this.setState({
            dragUnder: false
        });
    }

    private closeEditor = () => {
        this.props.messagesContext.resetAll();
        (document as any).isEditMessage = false;
        this.setState({
            message: '',
            statlesMessage: undefined,
            statlesMessageReply: undefined,
            statlesMessageId: undefined,
            statlesMessageSender: undefined,
            statlesChatId: undefined
        });
        if (this.input.current) {
            this.input.current!!.resetAndFocus();
        }
    }

    keydownHandler = (e: any) => {
        let { message, statlesMessageId } = this.state;
        let hasFocus = this.input.current && this.input.current.state.editorState.getSelection().getHasFocus();

        if ((message && message.length === 0 && this.props.conversation) && ((e.code === 'ArrowUp' && !e.altKey && hasFocus) || (e.code === 'KeyE' && e.ctrlKey)) && !statlesMessageId) {
            let messages = this.props.conversation.getState().messages.filter(m => isServerMessage(m) && m.message && this.props.user && m.sender.id === this.props.user.id);
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                this.props.messagesContext.setEditMessage(messageData.id, messageData.message);
                (document as any).isEditMessage = true;
            }
        }
        if (e.code === 'Escape' && statlesMessageId) {
            this.closeEditor();
        }
    }

    componentDidMount() {
        console.log(this.props);
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

    componentWillReceiveProps(nextProps: MessageComposeComponentInnerProps) {
        let {
            editMessage,
            editMessageId,
            replyMessage,
            replyMessageId,
            replyMessageSender,
            forwardMessagesId,
            forwardMessages,
            useForwardMessages,
            conversationId
        } = nextProps.messagesContext;

        // console.log(nextProps);

        let newState: any = {};

        let replyChecker = (replyMessage && replyMessageId && replyMessageSender && conversationId);

        if ((this.props.conversationId !== nextProps.conversationId)) {
            if (!useForwardMessages) {
                //
            }
            if (forwardMessagesId && forwardMessages) {
                console.log(nextProps);
            }
        }

        // if (editMessage && editMessageId) {
        //     this.props.messagesContext.setForwardMessages(null, null);
        // }

        if (replyChecker) {
            (document as any).isEditMessage = true;
            newState = {
                ...newState,
                message: '',
                statlesMessage: undefined,
                statlesMessageReply: replyMessage,
                statlesMessageId: replyMessageId,
                statlesMessageSender: replyMessageSender,
                statlesChatId: conversationId
            };
            if (this.input.current) {
                this.input.current!!.resetAndFocus();
            }
            // this.props.messagesContext.setForwardMessages(null, null);
        }

        let draftChecker = !replyChecker;

        if (draftChecker) {

            let draft = window.localStorage.getItem('conversation_draft_' + this.props.conversationId);
            let draftKey = 'conversation_draft_' + this.props.conversationId;

            if (!draft && nextProps.draft) {
                draft = nextProps.draft;
            }

            if (draft === draftKey) {
                newState = {
                    ...newState,
                    message: '',
                    statlesMessage: undefined,
                    beDrafted: true
                };
            } else if (draft !== draftKey) {
                newState = {
                    ...newState,
                    message: draft,
                    statlesMessage: draft,
                    beDrafted: true
                };
            }
        }

        let focusChecker = this.props.conversationId !== nextProps.conversationId && !editMessage && !editMessageId;

        if (focusChecker) {
            if (this.input.current) {
                this.input.current!!.resetAndFocus();
            }
        }

        this.setState(newState);
    }

    render() {
        let {
            statlesMessage,
            statlesMessageReply,
            statlesMessageId,
            statlesMessageSender
        } = this.state;

        let stateMessage = undefined;
        if (statlesMessage) {
            stateMessage = statlesMessage;
        }
        if (statlesMessageReply) {
            stateMessage = statlesMessageReply;
        }

        const mentionsData = convertChannelMembersDataToMentionsData(this.props.members);
        
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
                        {(stateMessage && statlesMessageId) && (
                            <EditView message={stateMessage} title={statlesMessageSender !== undefined ? statlesMessageSender : 'Edit message'} onCancel={this.closeEditor} />
                        )}
                        <TextInputWrapper>
                            <XRichTextInput
                                mentionsData={mentionsData}
                                placeholder="Write a message..."
                                flexGrow={1}
                                onChange={this.handleChange}
                                onSubmit={this.handleSend}
                                ref={this.input}
                                value={statlesMessage}
                            />
                        </TextInputWrapper>
                        <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                            <XHorizontal separator="none">
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                >
                                    <PhotoIcon />
                                    <span>Photo</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                    className="document-button"
                                >
                                    <FileIcon />
                                    <span>Document</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    query={this.props.enabled === false ? undefined : { field: 'addItro', value: 'true' }}
                                    className="intro-button"
                                    disable={this.props.enabled === false}
                                >
                                    <IntroIc />
                                    <span>Intro</span>
                                </AttachmentButton>
                                <ShortcutsModal />
                            </XHorizontal>
                            <XButton
                                text="Send"
                                style="primary"
                                action={this.handleSend}
                                iconRight="send"
                                enabled={this.props.enabled !== false}
                            />
                        </XHorizontal>
                    </XVertical>
                </SendMessageContent>
                <PostIntroModal targetQuery="addItro" conversationId={this.props.conversationId || ''} />
            </SendMessageWrapper>
        );
    }
}

export const MessageComposeComponent = withMessageState(withUserInfo((props) => {
    return (
        <MessagesStateContext.Consumer>
            {(state: MessagesStateContextProps) => (
                <MessageComposeComponentInner
                    {...props}
                    messagesContext={state}
                    replyMessage={props.replyMessage}
                    saveDraft={props.saveDraft}
                    draft={props.draft}
                />
            )}
        </MessagesStateContext.Consumer>
    );
})) as React.ComponentType<MessageComposeWithChannelMembers>;

const MessageComposeComponentChannelMembers = withChannelMembers(props => {
    return (
        <MessageComposeComponent 
            members={props.data.members} 
            {...props} 
        />
    );
}) as React.ComponentType<MessageComposeComponentProps>;

export const MessageComposeComponentDraft = withGetDraftMessage(props => {
    return (
        <MessageComposeComponentChannelMembers 
            draft={props.data.message} 
            {...props} 
        />
    );
}) as React.ComponentType<MessageComposeComponentProps & { variables?: { conversationId?: string, channelId?: string } }>;