import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput, removeEmojiFromText } from 'openland-x/XRichTextInput';
import { XModal } from 'openland-x-modal/XModal';
import { XThemeDefault } from 'openland-x/XTheme';
import { XLink } from 'openland-x/XLink';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { getConfig } from '../../../../config';
import { MutationFunc } from 'react-apollo';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import UloadIc from 'openland-icons/file-upload.svg';
import IntroIc from 'openland-icons/ic-attach-intro-3.svg';
import PostIcon from 'openland-icons/ic-add-post.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { PostIntroModal } from './content/introMessage/PostIntroModal';
import { withUserInfo, UserInfo } from '../../../UserInfo';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { withMessageState } from '../../../../api/withMessageState';
import { withGetDraftMessage } from '../../../../api/withMessageState';
import { withChannelMembers } from '../../../../api/withChannelMembers';
import {
    MessageFull,
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage,
    MessageFull_mentions,
    SharedRoomKind,
    RoomMembers_members,
    PostMessageType,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';

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
    borderTopColor: XThemeDefault.separatorColor,
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
    backgroundColor: props.dragOn ? '#fff' : 'transparent',
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
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC',
        },
    },
}));

const DropAreaTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#334562',
    marginTop: 23,
    marginBottom: 4,
});

const DropAreaSubtitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#5c6a81',
});

const SendMessageContent = Glamorous(XHorizontal)({
    width: '100%',
    maxWidth: 930,
    flexBasis: '100%',
    paddingLeft: 97,
    paddingRight: 112,
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>(props => ({
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
    '@media (max-width: 1150px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important',
        },
    },
    '&:hover': {
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)',
        },
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1,
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)',
        },
    },
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
        },
    },
});

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 0 19px',
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
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },

    '& strong': {
        fontWeight: 600,
    },
});

const ShortcutsModal = () => {
    return (
        <XModal
            title="Keyboard shortcuts"
            useTopCloser={true}
            target={
                <AttachmentButton className="shortcuts-button">
                    <ShortcutsIcon />
                    <span>Shortcuts</span>
                </AttachmentButton>
            }
        >
            <KeyboardShortcuts>
                <KeyboardShortcut>
                    <span>Ctrl + S</span> Search chats
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Esc</span> Close chat
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>
                        <strong>↑</strong>
                    </span>{' '}
                    Edit last message (works when the message box is in focus)
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Ctrl + E</span> Edit last message
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Option + ↑ (Mac)</span>
                    <span>Alt + ↑ (Windows)</span> Previous chat
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Option + ↓ (Mac)</span>
                    <span>Alt + ↓ (Windows)</span> Next chat
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Enter</span> Send message
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Shift + Enter</span> New line
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Cmd + Enter (Mac)</span>
                    <span>Ctrl + Enter (Windows)</span> Submit form
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Ctrl + Cmd + Space (Mac)</span> Emojis (standard Mac shortcut)
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Ctrl + Option + N (Mac)</span>
                    <span>Ctrl + Alt + N (Windows)</span> New chat
                </KeyboardShortcut>
            </KeyboardShortcuts>
        </XModal>
    );
};

const EditWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14,
});

const VerticalHidden = Glamorous(XVertical)({
    overflow: 'hidden',
});

const HorizontalHidden = Glamorous(XHorizontal)({
    overflow: 'hidden',
});

const BlueLine = Glamorous.div({
    width: 3,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#1790ff',
    flexShrink: 0,
});

const EditTitle = Glamorous.div({
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
});

const EditText = Glamorous.div({
    opacity: 0.8,
    fontSize: 13,
    lineHeight: 1.69,
    color: '#000',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const EditCloseBtn = Glamorous.div({
    cursor: 'pointer',
});

const EditView = (props: { title: string; message: string; onCancel: () => void }) => (
    <EditWrapper justifyContent="space-between" alignItems="center" separator={5}>
        <BlueLine />
        <HorizontalHidden
            flexGrow={1}
            separator={9}
            alignItems="center"
            justifyContent="space-between"
        >
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
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
}

interface MessageComposeWithDraft extends MessageComposeComponentProps {
    draft?: string | null;
}

interface MessageComposeWithChannelMembers extends MessageComposeWithDraft {
    members?: RoomMembers_members[];
    handleHideChat?: (show: boolean) => void;
}

interface MessageComposeComponentInnerProps
    extends MessageComposeComponentProps,
        XWithRouter,
        UserInfo {
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
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
    floatingMessage: string;
    forwardMessageReply?: string;
    forwardMessageId?: Set<string> | string;
    forwardMessageSender?: string;
    beDrafted: boolean;
}

const convertChannelMembersDataToMentionsData = (data: any) => {
    if (!data) {
        return [];
    }
    return data.map(({ user }: any) => {
        const { id, name, photo, online, isYou, primaryOrganization } = user;
        return {
            id,
            name: removeEmojiFromText(name),
            avatar: photo,
            title: primaryOrganization ? primaryOrganization.name : '',
            online,
            isYou,
        };
    });
};

interface PostButtonProps {
    enabled?: boolean;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
}

class PostButton extends React.PureComponent<PostButtonProps> {
    state = {
        show: false,
    };

    private handleShowMenu = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    private handleCloseMenu = () => {
        this.setState({
            show: false,
        });
    };

    render() {
        const { props } = this;
        let onClickHandler =
            props.enabled === false
                ? undefined
                : props.handleHideChat
                    ? props.handleHideChat
                    : undefined;

        let enableProps = {
            enabled: props.enabled === false,
            disable: props.enabled === false,
        };

        return (
            <XPopper
                placement="top-start"
                arrow={null}
                showOnHover={false}
                show={this.state.show}
                contentContainer={<XMenuVertical />}
                onClickOutside={this.handleCloseMenu}
                content={
                    <>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler && onClickHandler(true, PostMessageType.BLANK)
                            }
                        >
                            Quick post
                        </XMenuItem>
                        <XMenuItemSeparator />
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler &&
                                onClickHandler(true, PostMessageType.JOB_OPPORTUNITY)
                            }
                        >
                            Job opportunity
                        </XMenuItem>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler && onClickHandler(true, PostMessageType.OFFICE_HOURS)
                            }
                        >
                            Office hours
                        </XMenuItem>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler &&
                                onClickHandler(true, PostMessageType.REQUEST_FOR_STARTUPS)
                            }
                        >
                            Request for startups
                        </XMenuItem>
                    </>
                }
            >
                <AttachmentButton
                    {...enableProps}
                    onClick={this.props.enabled === false ? undefined : this.handleShowMenu}
                    className="document-button"
                >
                    <PostIcon />
                    <span>Post</span>
                </AttachmentButton>
            </XPopper>
        );
    }
}

class MessageComposeComponentInner extends React.PureComponent<
    MessageComposeComponentInnerProps,
    MessageComposeComponentInnerState
> {
    listOfMembersNames: string[];
    constructor(props: any) {
        super(props);

        let message =
            window.localStorage.getItem('conversation_draft_1_' + props.conversationId) || '';
        let draftKey = 'conversation_draft_1_' + this.props.conversationId;

        if (message === draftKey) {
            message = '';
        }

        this.state = {
            dragOn: false,
            dragUnder: false,
            message: message,
            floatingMessage: message,
            forwardMessageReply: undefined,
            forwardMessageId: undefined,
            forwardMessageSender: undefined,
            beDrafted: false,
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
            this.setState({ message: '', dragOn: false }, () => {
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
                return mentionsNames.indexOf(`@${removeEmojiFromText(name)}`) !== -1;
            })
            .map(({ user }) => user);
    };

    private handleSend = () => {
        let { message, floatingMessage, forwardMessageReply, forwardMessageId } = this
            .state as MessageComposeComponentInnerState;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend && !forwardMessageId) {
                let mentions = this.getMentions(msg);

                this.props.onSend(msg, mentions);
                this.setState({
                    beDrafted: false,
                });
            }
            if ((floatingMessage || forwardMessageReply) && forwardMessageId) {
                this.replyMessages();
            }
        } else if (forwardMessageReply && forwardMessageId) {
            this.replyMessages();
        }
        this.closeEditor();
        this.changeDraft('');
        this.localDraftCleaner();
    };

    private replyMessages = () => {
        let { message, forwardMessageId } = this.state;

        let messages: string[] = [];
        if (typeof forwardMessageId === 'string') {
            messages = [forwardMessageId];
        } else if (typeof forwardMessageId === 'object') {
            messages = [...forwardMessageId];
        }

        if (messages.length > 0) {
            let mentions = this.getMentions(message);
            const currentMessages = this.props.getMessages ? this.props.getMessages() : [];

            const replyMessages = currentMessages.filter((item: MessageFull) => {
                return messages.indexOf(item.id) !== -1;
            });

            const replyMentions = replyMessages.reduce(
                (accumulator: string[], currentValue: ModelMessage) => {
                    if (!currentValue.mentions) {
                        return accumulator;
                    }

                    currentValue.mentions.forEach(mention => {
                        if (accumulator.indexOf(mention.id) === -1) {
                            accumulator.push(mention.id);
                        }
                    });

                    return accumulator;
                },
                mentions ? mentions.map(({ id }) => id) : [],
            );

            this.props.replyMessage({
                variables: {
                    roomId: this.props.conversationId,
                    message: message,
                    mentions: replyMentions,
                    replyMessages: messages,
                },
            });
        }
    };

    private handleChange = (src: string) => {
        let { forwardMessageId, beDrafted } = this.state;

        this.setState({
            message: src,
        });

        if (src.length > 0) {
            this.setState({
                beDrafted: true,
            });

            this.localDraftSaver(src);
        }

        if (src.length === 0) {
            this.localDraftCleaner();
        }

        if (this.props.onChange) {
            this.props.onChange(src);
        }

        if (forwardMessageId || !beDrafted) {
            return;
        }

        this.changeDraft(src);
    };

    private localDraftSaver = (src: string) => {
        let draftKey = 'conversation_draft_1_' + this.props.conversationId;
        window.localStorage.setItem(draftKey, src);
    };

    private localDraftCleaner = () => {
        let draftKey = 'conversation_draft_1_' + this.props.conversationId;
        window.localStorage.setItem(draftKey, draftKey);
    };

    private changeDraft = (src: string) => {
        this.props.saveDraft({
            variables: {
                conversationId: this.props.conversationId,
                message: src,
            },
        });
    };

    private focusIfNeeded = () => {
        if (this.props.enabled !== false && !this.wasFocused) {
            this.wasFocused = true;
            if (this.input.current) {
                this.input.current.focus();
            }
        }
    };

    private handleDrop = (e: any) => {
        e.preventDefault();

        this.setState({
            dragOn: false,
            dragUnder: false,
        });

        let file = e.dataTransfer.files[0];

        let ucFile = UploadCare.fileFrom('object', file);

        if (this.props.onSendFile) {
            this.props.onSendFile(ucFile);
        }
    };

    private handleWindowDragover = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: true,
        });
    };

    private handleWindowDrop = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: false,
        });
    };

    private handleMouseOut = () => {
        this.setState({
            dragOn: false,
            dragUnder: false,
        });
    };

    private handleDragOver = () => {
        this.setState({
            dragUnder: true,
        });
    };

    private handleDragLeave = (e: any) => {
        let file = e.dataTransfer.files[0];
        if (file === undefined) {
            this.setState({
                dragOn: false,
            });
        }
        this.setState({
            dragUnder: false,
        });
    };

    private closeEditor = () => {
        this.props.messagesContext.resetAll();
        this.setState({
            message: '',
            floatingMessage: '',
            forwardMessageReply: undefined,
            forwardMessageId: undefined,
            forwardMessageSender: undefined,
        });
        if (this.input.current) {
            this.input.current!!.resetAndFocus();
        }
        this.listOfMembersNames = [];
    };

    keydownHandler = (e: any) => {
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId && forwardMessagesId.size > 0) {
            return;
        }

        let { message, forwardMessageId } = this.state;
        let hasFocus =
            this.input.current && this.input.current.state.editorState.getSelection().getHasFocus();

        if (
            message.length === 0 &&
            this.props.conversation &&
            ((e.code === 'ArrowUp' && !e.altKey && hasFocus) || (e.code === 'KeyE' && e.ctrlKey)) &&
            !forwardMessageId
        ) {
            let messages = this.props.conversation
                .getState()
                .messages.filter(
                    m =>
                        isServerMessage(m) &&
                        m.message &&
                        this.props.user &&
                        m.sender.id === this.props.user.id,
                );
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                this.props.messagesContext.setEditMessage(messageData.id, messageData.message);
            }
        }
        if (e.code === 'Escape' && forwardMessageId) {
            this.closeEditor();
        }
    };

    componentDidMount() {
        const { messagesContext } = this.props;
        if (messagesContext.useForwardMessages && messagesContext.forwardMessagesId) {
            messagesContext.changeForwardConverstion();
            this.setState({
                message: '',
                floatingMessage: '',
                forwardMessageReply:
                    `Forward ${messagesContext.forwardMessagesId.size} ` +
                    (messagesContext.forwardMessagesId.size === 1 ? 'message' : 'messages'),
                forwardMessageId: messagesContext.forwardMessagesId,
                forwardMessageSender: 'Forward',
            });
        }
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
        const {
            editMessage,
            editMessageId,
            replyMessages,
            replyMessagesId,
            replyMessagesSender,
            forwardMessagesId,
            useForwardMessages,
        } = nextProps.messagesContext;

        if (nextProps.members && nextProps.members !== this.props.members) {
            this.listOfMembersNames = nextProps.members.map(
                ({ user: { name } }: { user: { name: string } }) => `@${removeEmojiFromText(name)}`,
            );
        }

        let newState: any = {};

        if (this.props.conversationId !== nextProps.conversationId) {
            if (useForwardMessages && forwardMessagesId) {
                this.props.messagesContext.changeForwardConverstion();
                newState = {
                    ...newState,
                    message: '',
                    floatingMessage: '',
                    forwardMessageReply:
                        `Forward ${forwardMessagesId.size} ` +
                        (forwardMessagesId.size === 1 ? 'message' : 'messages'),
                    forwardMessageId: forwardMessagesId,
                    forwardMessageSender: 'Forward',
                };
            }
        }

        if (replyMessagesId) {
            if (replyMessages && replyMessagesSender) {
                const messageReply = [...replyMessages!][0];
                const messageId = [...replyMessagesId!][0];
                const messageSender = [...replyMessagesSender!][0];
                newState = {
                    ...newState,
                    message: '',
                    floatingMessage: '',
                    forwardMessageReply: messageReply,
                    forwardMessageId: messageId,
                    forwardMessageSender: messageSender,
                };
            } else {
                newState = {
                    ...newState,
                    message: '',
                    floatingMessage: '',
                    forwardMessageReply:
                        `Reply ${replyMessagesId.size} ` +
                        (replyMessagesId.size === 1 ? 'message' : 'messages'),
                    forwardMessageId: replyMessagesId,
                    forwardMessageSender: 'Reply',
                };
            }
            if (this.input.current) {
                this.input.current!!.resetAndFocus();
            }
        }

        let draftChecker = !(replyMessages && replyMessagesId && replyMessagesSender);

        if (draftChecker) {
            let draft =
                window.localStorage.getItem('conversation_draft_1_' + this.props.conversationId) ||
                '';
            let draftKey = 'conversation_draft_1_' + this.props.conversationId;

            if (!draft && nextProps.draft) {
                draft = nextProps.draft;
            }

            if (draft === draftKey) {
                newState = {
                    ...newState,
                    message: '',
                    floatingMessage: '',
                    beDrafted: true,
                };
            } else if (draft !== draftKey) {
                newState = {
                    ...newState,
                    message: draft,
                    floatingMessage: draft,
                    beDrafted: true,
                };
            }
        }

        let focusChecker =
            this.props.conversationId !== nextProps.conversationId &&
            !editMessage &&
            !editMessageId;

        if (focusChecker) {
            if (this.input.current) {
                this.input.current!!.focus();
            }
        }

        this.setState(newState);
    }

    render() {
        let {
            floatingMessage,
            forwardMessageReply,
            forwardMessageId,
            forwardMessageSender,
        } = this.state;

        let stateMessage = undefined;
        if (floatingMessage) {
            stateMessage = floatingMessage;
        }
        if (forwardMessageReply) {
            stateMessage = forwardMessageReply;
        }

        const mentionsData = convertChannelMembersDataToMentionsData(this.props.members);

        return (
            <SendMessageWrapper>
                <DropArea dragOn={this.state.dragOn}>
                    <DropAreaContent
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        onMouseOut={this.handleMouseOut}
                        dragUnder={this.state.dragUnder}
                    >
                        <UloadIc />
                        <DropAreaTitle>Drop files here</DropAreaTitle>
                        <DropAreaSubtitle>To send them as files</DropAreaSubtitle>
                    </DropAreaContent>
                </DropArea>
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        {stateMessage &&
                            forwardMessageId && (
                                <EditView
                                    message={stateMessage}
                                    title={
                                        forwardMessageSender !== undefined
                                            ? forwardMessageSender
                                            : 'Edit message'
                                    }
                                    onCancel={this.closeEditor}
                                />
                            )}
                        <TextInputWrapper>
                            <XRichTextInput
                                mentionsData={mentionsData}
                                placeholder="Write a message..."
                                flexGrow={1}
                                onChange={this.handleChange}
                                onSubmit={this.handleSend}
                                ref={this.input}
                                value={floatingMessage}
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
                                <AttachmentButton
                                    query={
                                        this.props.enabled === false
                                            ? undefined
                                            : {
                                                  field: 'addItro',
                                                  value: 'true',
                                              }
                                    }
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
                <PostIntroModal
                    targetQuery="addItro"
                    conversationId={this.props.conversationId || ''}
                />
            </SendMessageWrapper>
        );
    }
}

export const MessageComposeComponent = withMessageState(
    withUserInfo(props => {
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
    }),
) as React.ComponentType<MessageComposeWithChannelMembers>;

const MessageComposeComponentChannelMembers = withChannelMembers(props => {
    return (
        <MessageComposeComponent
            members={props.data.members}
            {...props}
            handleHideChat={(props as any).handleHideChat}
        />
    );
}) as React.ComponentType<MessageComposeComponentProps & { draft: string | null }>;

export const MessageComposeComponentDraft = withGetDraftMessage((props: any) => {
    return <MessageComposeComponentChannelMembers {...props} draft={props.data.message} />;
}) as React.ComponentType<
    MessageComposeComponentProps & {
        variables?: {
            roomId?: string;
            conversationId?: string;
            organizationId: string | null;
        };
        getMessages?: Function;
    }
>;
