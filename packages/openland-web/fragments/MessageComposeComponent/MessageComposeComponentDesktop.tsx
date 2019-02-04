import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { MutationFunc } from 'react-apollo';
import { DropZone } from './FileUploading/DropZone';
import { withUserInfo, UserInfo } from '../../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import { withMessageState } from '../../api/withMessageState';
import { withGetDraftMessage } from '../../api/withMessageState';
import { withChannelMembers } from '../../api/withChannelMembers';
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
import { PostIntroModal } from '../../components/messenger/message/content/attachments/introMessage/PostIntroModal';
import { AttachmentButtons } from './AttachmentButtons';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { FileUploader } from './FileUploading/FileUploader';
import { EditView } from './EditView';

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

export interface MessageComposeComponentProps {
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

interface MessageComposeWithDraft extends MessageComposeComponentProps {
    draft?: string | null;
}

interface MessageComposeWithChannelMembers extends MessageComposeWithDraft {
    members?: RoomMembers_members[];
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
}

interface MessageComposeComponentInnerProps
    extends MessageComposeComponentProps,
        XWithRouter,
        UserInfo {
    members?: RoomMembers_members[];
    messagesContext: MessagesStateContextProps;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
    draft?: string | null;
    fileRemover: Function;
    handleDrop: (file: any) => void;
}

interface MessageComposeComponentInnerState {
    message: string;
    floatingMessage: string;
    forwardMessageReply?: string;
    forwardMessageId?: Set<string> | string;
    forwardMessageSender?: string;
    beDrafted: boolean;
}

export const convertChannelMembersDataToMentionsData = (data: any) => {
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
            message,
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

    handleDialogDone = (r: UploadCare.File) => {
        this.setState({ message: '' }, () => {
            if (this.props.onSendFile) {
                this.props.onSendFile(r);
            }
        });
    };

    getMentions = (str: string) => {
        if (!this.props.members) {
            return null;
        }

        const mentionsNames = this.getListOfMembersNames().filter((name: string) =>
            str.includes(name),
        );
        return this.props.members
            .filter(({ user: { name } }) => {
                return mentionsNames.indexOf(`@${name}`) !== -1;
            })
            .map(({ user }) => user);
    };

    private onUploadCareSendFile = (file: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', file);
        if (this.props.onSendFile) {
            this.props.onSendFile(ucFile);
        }
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
                    this.onUploadCareSendFile(file);
                }
            }
            if ((floatingMessage || forwardMessageReply) && forwardMessageId) {
                this.replyMessages();
            }
        } else if (forwardMessageReply && forwardMessageId) {
            this.replyMessages();
        } else if (file) {
            this.onUploadCareSendFile(file);
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

    private closeEditor = () => {
        this.props.messagesContext.resetAll();
        this.setState({
            message: '',
            floatingMessage: '',
            forwardMessageReply: undefined,
            forwardMessageId: undefined,
            forwardMessageSender: undefined,
        });
        this.props.fileRemover();
        if (this.input.current) {
            this.input.current!!.resetAndFocus();
        }
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

    setListOfMembersNames = (newListOfMembersNames: any) => {
        this.listOfMembersNames = newListOfMembersNames;
    };

    getListOfMembersNames = () => {
        return this.listOfMembersNames;
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
            this.setListOfMembersNames(
                nextProps.members.map(
                    ({ user: { name } }: { user: { name: string } }) => `@${name}`,
                ),
            );
        }

        let newState: any = {};

        if (this.props.conversationId !== nextProps.conversationId) {
            newState = {
                ...newState,
                forwardMessageReply: '',
                forwardMessageId: null,
                forwardMessageSender: '',
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
                };
            } else {
                newState = {
                    ...newState,
                    forwardMessageReply:
                        `Reply ${replyMessagesId.size} ` +
                        (replyMessagesId.size === 1 ? 'message' : 'messages'),
                    forwardMessageId: replyMessagesId,
                    forwardMessageSender: 'Reply',
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
                <DropZone height="calc(100% - 115px)" onFileDrop={this.props.handleDrop} />
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        {stateMessage && forwardMessageId && (
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
                                onPasteFile={this.props.handleDrop}
                            />
                        </TextInputWrapper>
                        <XHorizontal
                            alignItems="center"
                            justifyContent="space-between"
                            flexGrow={1}
                        >
                            <AttachmentButtons
                                enabled={this.props.enabled}
                                handleHideChat={this.props.handleHideChat}
                                handleDialogDone={this.handleDialogDone}
                            />

                            <XButton
                                text="Send"
                                style="primary"
                                action={this.handleSend}
                                iconRight="send"
                                enabled={this.props.enabled !== false}
                            />
                        </XHorizontal>
                        <FileUploader />
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
        const state: MessagesStateContextProps = React.useContext(MessagesStateContext);
        return (
            <MessageComposeComponentInner
                {...props}
                messagesContext={state}
                replyMessage={props.replyMessage}
                saveDraft={props.saveDraft}
                draft={props.draft}
            />
        );
    }),
) as React.ComponentType<MessageComposeWithChannelMembers>;

type MessageComposeComponentChannelMembersProps = MessageComposeComponentProps & {
    draft: string | null;
};

const MessageComposeComponentChannelMembers = withChannelMembers(props => {
    const typedProps = props as typeof props & MessageComposeComponentChannelMembersProps;
    return (
        <MessageComposeComponent
            members={typedProps.data.members}
            {...typedProps}
            handleHideChat={typedProps.handleHideChat}
        />
    );
}) as React.ComponentType<MessageComposeComponentProps & { draft: string | null }>;

type MessageComposeComponentDraftProps = MessageComposeComponentProps & {
    variables?: {
        roomId?: string;
        conversationId?: string;
        organizationId: string | null;
    };
    getMessages?: Function;
};

export const MessageComposeComponentDraft = withGetDraftMessage(props => {
    const typedProps = props as typeof props & MessageComposeComponentDraftProps;
    return (
        <MessageComposeComponentChannelMembers {...typedProps} draft={typedProps.data.message} />
    );
}) as React.ComponentType<MessageComposeComponentDraftProps>;
