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
    UserShort,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { PostIntroModal } from '../../components/messenger/message/content/attachments/introMessage/PostIntroModal';
import { AttachmentButtons } from './AttachmentButtons';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { FileUploader } from './FileUploading/FileUploader';
import { EditView } from './EditView';
import * as DraftStore from './MessageComposing/DraftStore';

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
    handleDrop: (file: any) => void;
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

const getFirstInSet = (set: Set<string>) => {
    return [...set][0];
};

const getMentions = (
    str: string,
    listOfMembersNames: string[],
    members?: RoomMembers_members[],
) => {
    if (!members) {
        return null;
    }

    const mentionsNames = listOfMembersNames.filter((name: string) => str.includes(name));
    return members
        .filter(({ user: { name } }) => mentionsNames.indexOf(`@${name}`) !== -1)
        .map(({ user }) => user);
};

function useKeydownHandler({
    forwardMessagesId,
    setEditMessage,
    inputValue,
    quoteMessagesId,
    hasFocus,
    conversation,
    user,
}: {
    forwardMessagesId: Set<string>;
    setEditMessage: (id: string | null, message: string | null) => void;
    inputValue: string;
    quoteMessagesId: string[];
    hasFocus: () => boolean;
    conversation?: ConversationEngine;
    user: UserShort | null;
}) {
    const keydownHandler = (e: any) => {
        if (forwardMessagesId && forwardMessagesId.size > 0) {
            return;
        }

        if (
            inputValue.length === 0 &&
            conversation &&
            ((e.code === 'ArrowUp' && !e.altKey && hasFocus()) ||
                (e.code === 'KeyE' && e.ctrlKey)) &&
            !quoteMessagesId
        ) {
            let messages = conversation
                .getState()
                .messages.filter(
                    (m: any) => isServerMessage(m) && m.message && user && m.sender.id === user.id,
                );
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                setEditMessage(messageData.id, messageData.message);
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        return function cleanup() {
            window.removeEventListener('keydown', keydownHandler);
        };
    });
}

const MessageComposeComponentInner = (props: MessageComposeComponentInnerProps) => {
    const {
        enabled,
        members,
        getMessages,
        replyMessage,
        conversationId,
        conversation,
        user,
        onSend,
        onSendFile,
        saveDraft,
        onChange,
        handleDrop,
        handleHideChat,
    } = props;

    let wasFocused = false;
    let listOfMembersNames: string[] = [];
    let inputRef = React.createRef<XRichTextInput>();

    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const [inputValue, setInputValue] = React.useState(DraftStore.getDraftMessage(conversationId));
    const [quoteMessagesId, setQuoteMessagesId] = React.useState<string[]>([]);
    const [quoteMessageReply, setQuoteMessageReply] = React.useState<string | undefined>(undefined);
    const [quoteMessageSender, setQuoteMessageSender] = React.useState<string | undefined>(
        undefined,
    );
    const [file, setFile] = React.useState<UploadCare.File | undefined>(undefined);
    const [beDrafted, setBeDrafted] = React.useState(false);

    const hasFocus = () => {
        return !!(
            inputRef &&
            inputRef.current &&
            inputRef.current.state.editorState.getSelection().getHasFocus()
        );
    };

    useKeydownHandler({
        forwardMessagesId: messagesContext.forwardMessagesId,
        setEditMessage: messagesContext.setEditMessage,
        inputValue,
        quoteMessagesId,
        hasFocus,
        conversation,
        user,
    });

    const hasQuoteInState = () => {
        return quoteMessageReply && quoteMessagesId && quoteMessageSender;
    };

    const getEditViewMessage = () => {
        return quoteMessageReply;
    };

    const getEditViewTitle = () => {
        return quoteMessageSender !== undefined ? quoteMessageSender : 'Edit message';
    };

    const getForwardText = ({ forwardMessagesId }: { forwardMessagesId: Set<string> }) => {
        return (
            `Forward ${forwardMessagesId.size} ` +
            (forwardMessagesId.size === 1 ? 'message' : 'messages')
        );
    };

    const getReplyText = ({ replyMessagesId }: { replyMessagesId: Set<string> }) => {
        return (
            `Reply ${replyMessagesId.size} ` + (replyMessagesId.size === 1 ? 'message' : 'messages')
        );
    };

    const hasReply = ({
        replyMessagesSender,
        replyMessages,
    }: {
        replyMessagesSender: Set<string>;
        replyMessages: Set<string>;
    }) => {
        return replyMessages.size && replyMessagesSender.size;
    };

    const getForwardOrReply = (): 'forward' | 'reply' => {
        if (messagesContext.forwardMessagesId.size !== 0) {
            return 'forward';
        }
        return 'reply';
    };

    const getQuoteMessageReply = () => {
        const mode = getForwardOrReply();

        if (mode === 'forward') {
            return hasForward(messagesContext) ? getForwardText(messagesContext) : '';
        }
        return hasReply(messagesContext)
            ? getFirstInSet(messagesContext.replyMessages)
            : getReplyText(messagesContext);
    };

    const getQuoteMessageId = () => {
        const mode = getForwardOrReply();

        if (mode === 'forward') {
            return hasForward(messagesContext)
                ? [getFirstInSet(messagesContext.forwardMessagesId)]
                : [];
        }
        return hasReply(messagesContext)
            ? [getFirstInSet(messagesContext.replyMessagesId)]
            : [...messagesContext.replyMessagesId];
    };

    const getQuoteMessageSender = () => {
        const mode = getForwardOrReply();

        if (mode === 'forward') {
            return hasForward(messagesContext) ? 'Forward' : '';
        }
        return hasReply(messagesContext)
            ? getFirstInSet(messagesContext.replyMessagesSender)
            : 'Reply';
    };

    const hasForward = ({
        useForwardMessages,
        forwardMessagesId,
    }: {
        useForwardMessages: boolean;
        forwardMessagesId: Set<string>;
    }) => {
        return useForwardMessages && forwardMessagesId.size;
    };

    const handleDialogDone = (r: UploadCare.File) => {
        setInputValue('');
        if (onSendFile) {
            onSendFile(r);
        }
    };

    const replyMessagesProc = () => {
        if (quoteMessagesId.length > 0) {
            let mentions = getMentions(inputValue, listOfMembersNames, members);
            const currentMessages = getMessages ? getMessages() : [];

            const messagesToReply = currentMessages.filter(
                (item: MessageFull) => quoteMessagesId.indexOf(item.id) !== -1,
            );

            const replyMentions = messagesToReply.reduce(
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

            replyMessage({
                variables: {
                    roomId: conversationId,
                    message: inputValue,
                    mentions: replyMentions,
                    replyMessages: quoteMessagesId,
                },
            });
        }
    };

    const onUploadCareSendFile = (fileForUc: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', fileForUc);
        if (onSendFile) {
            onSendFile(ucFile);
        }
    };

    const changeDraft = (message: string) => {
        saveDraft({
            variables: {
                conversationId,
                message,
            },
        });
    };

    const handleSend = () => {
        if (inputValue.trim().length > 0) {
            let msg = inputValue.trim();
            if (onSend && !hasQuoteInState()) {
                let mentions = getMentions(msg, listOfMembersNames, members);

                onSend(msg, mentions);
                setBeDrafted(false);

                if (file) {
                    onUploadCareSendFile(file);
                }
            }
            if (inputValue && hasQuoteInState()) {
                replyMessagesProc();
            }
        } else if (hasQuoteInState()) {
            replyMessagesProc();
        } else if (file) {
            onUploadCareSendFile(file);
        }
        closeEditor();
        changeDraft('');
        DraftStore.cleanDraftMessage(conversationId);
    };

    const handleChange = (value: string) => {
        setInputValue(value);

        if (value.length > 0) {
            setBeDrafted(true);
            DraftStore.setDraftMessage(conversationId, value);
        }

        if (value.length === 0) {
            DraftStore.cleanDraftMessage(conversationId);
        }

        if (onChange) {
            onChange(value);
        }

        if (quoteMessagesId || !beDrafted) {
            return;
        }

        changeDraft(value);
    };

    const focus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const resetAndFocus = () => {
        if (inputRef.current) {
            inputRef.current.resetAndFocus();
        }
    };

    const closeEditor = () => {
        messagesContext.resetAll();
        setInputValue('');
        setQuoteMessageReply(undefined);
        setQuoteMessageSender(undefined);
        setQuoteMessagesId([]);
        setFile(undefined);
        resetAndFocus();
    };

    const focusIfNeeded = () => {
        if (enabled !== false && !wasFocused) {
            wasFocused = true;
            focus();
        }
    };

    const shouldBeDrafted = () => {
        const { replyMessages, replyMessagesId, replyMessagesSender } = messagesContext;

        return !(replyMessages.size && replyMessagesId.size && replyMessagesSender.size);
    };

    const getNextDraft = () => {
        let draft = DraftStore.getDraftMessage(conversationId);

        if (draft === '' && props.draft && props.draft !== '') {
            draft = props.draft;
        }
        return draft;
    };

    const shouldHaveQuote = () => {
        const { replyMessagesId } = messagesContext;

        return !!replyMessagesId.size;
    };

    const updateQuote = () => {
        if (shouldHaveQuote()) {
            setQuoteMessageReply(getQuoteMessageReply());
            setQuoteMessagesId(getQuoteMessageId());
            setQuoteMessageSender(getQuoteMessageSender());
        }
    };

    React.useEffect(
        () => {
            updateQuote();
        },
        [messagesContext.replyMessages],
    );

    React.useEffect(
        () => {
            messagesContext.changeForwardConverstion();
            updateQuote();
            setInputValue(shouldBeDrafted() ? getNextDraft() : '');
            setBeDrafted(shouldBeDrafted());
        },
        [conversationId],
    );

    // rewrote to effect correctly
    React.useEffect(
        () => {
            listOfMembersNames = members
                ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
                : [];
        },
        [members],
    );

    React.useEffect(() => {
        focusIfNeeded();
    });

    const editViewMessage = getEditViewMessage();
    const editViewTitle = getEditViewTitle();
    const mentionsData = convertChannelMembersDataToMentionsData(members);

    return (
        <SendMessageWrapper>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    {editViewMessage && (
                        <EditView
                            message={editViewMessage}
                            title={editViewTitle}
                            onCancel={closeEditor}
                        />
                    )}
                    <TextInputWrapper>
                        <XRichTextInput
                            mentionsData={mentionsData}
                            placeholder="Write a message..."
                            flexGrow={1}
                            onChange={handleChange}
                            onSubmit={handleSend}
                            ref={inputRef}
                            value={inputValue}
                            onPasteFile={handleDrop}
                        />
                    </TextInputWrapper>
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
            <PostIntroModal targetQuery="addItro" conversationId={conversationId || ''} />
        </SendMessageWrapper>
    );
};

export const MessageComposeComponent = withMessageState(
    withUserInfo(MessageComposeComponentInner),
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
