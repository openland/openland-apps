import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { XThemeDefault } from 'openland-x/XTheme';
import { XLink } from 'openland-x/XLink';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { getConfig } from '../config';
import { MutationFunc } from 'react-apollo';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import IntroIc from 'openland-icons/ic-attach-intro-3.svg';
import PostIcon from 'openland-icons/ic-add-post.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { ShortcutsModal } from '../components/messenger/view/ShortcutsModal';
import { DropZone } from './DropZone';
import { withUserInfo, UserInfo } from '../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../components/messenger/MessagesStateContext';
import { withMessageState } from '../api/withMessageState';
import { withGetDraftMessage } from '../api/withMessageState';
import { withChannelMembers } from '../api/withChannelMembers';
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
import { PostIntroModal } from '../components/messenger/message/content/attachments/introMessage/PostIntroModal';
import RemoveIcon from 'openland-icons/ic-close.svg';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';

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
        textDecoration: 'none',
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
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
        width: 16,
        height: 16,
    },
    '& > svg > path': {
        fill: '#BCC3CC',
    },
    '&:hover > svg > path': {
        fill: '#000000',
    },
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

const FileItem = Glamorous(XHorizontal)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    fontWeight: 500,
    color: '#000',
    paddingLeft: 18,
    '& .remove': {
        marginTop: 1,
        cursor: 'pointer',
        '& > svg path': {
            fill: '#C7C7C7',
        },
        '&:hover > svg path': {
            fill: '#4a4a4a',
        },
    },
    '& span': {
        opacity: 0.6,
    },
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'flex-start',
    display: 'flex',
    width: 100,
    height: 80,
    '& > img': {
        display: 'block',
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
    },
});

const CoverDelButton = Glamorous.div({
    position: 'absolute',
    right: -2,
    top: -2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    paddingTop: 2,
    paddingRight: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    '& > svg path': {
        fill: '#fff',
    },
});

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

interface MessageComposeComponentInnerState {
    message: string;
    floatingMessage: string;
    forwardMessageReply?: string;
    forwardMessageId?: Set<string> | string;
    forwardMessageSender?: string;
    beDrafted: boolean;
    file: any | null;
    fileSrc: string | null;
    fileName: string | null;
}

const convertChannelMembersDataToMentionsData = (data: any) => {
    if (!data) {
        return [];
    }
    return data.map(({ user }: any) => {
        const { id, name, photo, online, isYou, primaryOrganization } = user;
        return {
            id,
            name: name,
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
            message: message,
            floatingMessage: message,
            forwardMessageReply: undefined,
            forwardMessageId: undefined,
            forwardMessageSender: undefined,
            beDrafted: false,
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
        let { message, floatingMessage, forwardMessageReply, forwardMessageId, file } = this
            .state as MessageComposeComponentInnerState;

        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend && !forwardMessageId) {
                let mentions = this.getMentions(msg);

                this.props.onSend(msg, mentions);
                this.setState({
                    beDrafted: false,
                });

                if (file) {
                    const ucFile = UploadCare.fileFrom('object', file);
                    if (this.props.onSendFile) {
                        this.props.onSendFile(ucFile);
                    }
                }
            }
            if ((floatingMessage || forwardMessageReply) && forwardMessageId) {
                this.replyMessages();
            }
        } else if (forwardMessageReply && forwardMessageId) {
            this.replyMessages();
        } else if (file) {
            const ucFile = UploadCare.fileFrom('object', file);
            if (this.props.onSendFile) {
                this.props.onSendFile(ucFile);
            }
        }
        this.closeEditor();
        this.changeDraft('');
        this.localDraftCleaner();
    };

    private fileRemover = () => {
        this.setState({
            file: null,
            fileName: null,
            fileSrc: null,
        });
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
        this.props.messagesContext.resetAll();
        this.setState({
            message: '',
            floatingMessage: '',
            forwardMessageReply: undefined,
            forwardMessageId: undefined,
            forwardMessageSender: undefined,
            file: null,
            fileSrc: null,
            fileName: null,
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
        const input = this.input.current;
        let hasFocus = input && input.state.editorState.getSelection().getHasFocus();

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
        window.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
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
                ({ user: { name } }: { user: { name: string } }) => `@${name}`,
            );
        }

        let newState: any = {};

        if (this.props.conversationId !== nextProps.conversationId) {
            newState = {
                ...newState,
                forwardMessageReply: '',
                forwardMessageId: null,
                forwardMessageSender: '',
                file: null,
                fileName: null,
                fileSrc: null,
            };
            if (useForwardMessages && forwardMessagesId) {
                this.props.messagesContext.changeForwardConverstion();
                newState = {
                    ...newState,
                    forwardMessageReply:
                        `Forward ${forwardMessagesId.size} ` +
                        (forwardMessagesId.size === 1 ? 'message' : 'messages'),
                    forwardMessageId: forwardMessagesId,
                    forwardMessageSender: 'Forward',
                    file: null,
                    fileName: null,
                    fileSrc: null,
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
                    forwardMessageReply: messageReply,
                    forwardMessageId: messageId,
                    forwardMessageSender: messageSender,
                    file: null,
                    fileName: null,
                    fileSrc: null,
                };
            } else {
                newState = {
                    ...newState,
                    forwardMessageReply:
                        `Reply ${replyMessagesId.size} ` +
                        (replyMessagesId.size === 1 ? 'message' : 'messages'),
                    forwardMessageId: replyMessagesId,
                    forwardMessageSender: 'Reply',
                    file: null,
                    fileName: null,
                    fileSrc: null,
                };
            }
            if (this.input.current) {
                this.input.current!!.focus();
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
            file,
            fileName,
            fileSrc,
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
                <DropZone height="calc(100% - 115px)" onFileDrop={this.handleDrop} />
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
                                <ShortcutsModal
                                    target={
                                        <AttachmentButton className="shortcuts-button">
                                            <ShortcutsIcon />
                                            <span>Shortcuts</span>
                                        </AttachmentButton>
                                    }
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
