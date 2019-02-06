import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { MutationFunc } from 'react-apollo';
import { DropZone } from './FileUploading/DropZone';
import { withUserInfo, UserInfo } from '../../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
    getQuoteMessageReply,
    getQuoteMessageId,
    getQuoteMessageSender,
} from '../../components/messenger/MessagesStateContext';
import { withMessageState } from '../../api/withMessageState';
import { withGetDraftMessage } from '../../api/withMessageState';
import { withChannelMembers } from '../../api/withChannelMembers';
import {
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage,
    RoomEditMessageVariables,
    RoomEditMessage,
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
import { useKeydownHandler } from './useKeydownHandler';
import { useDraft } from './useDraft';
import { useReply } from './useReply';
import { useInputMethods } from './useInputMethods';

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
    editMessage: MutationFunc<RoomEditMessage, Partial<RoomEditMessageVariables>>;
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

export const getMentions = (
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
        draft,
    } = props;

    let wasFocused = false;
    let listOfMembersNames: string[] = [];
    const inputRef = React.useRef<XRichTextInput>(null);

    const { focus, resetAndFocus, hasFocus } = useInputMethods({ inputRef });

    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const {
        getDefaultValue,
        cleanDraft,
        changeDraft,
        getNextDraft,
        beDrafted,
        setBeDrafted,
    } = useDraft({
        conversationId,
        saveDraft,
        draft,
    });

    const [inputValue, setInputValue] = React.useState(getDefaultValue());
    const [quoteMessagesId, setQuoteMessagesId] = React.useState<string[]>([]);
    const [quoteMessageReply, setQuoteMessageReply] = React.useState<string | undefined>(undefined);
    const [quoteMessageSender, setQuoteMessageSender] = React.useState<string | undefined>(
        undefined,
    );

    const { replyMessagesProc } = useReply({
        conversationId,
        quoteMessagesId,
        replyMessage,
        getMessages,
        listOfMembersNames,
        members,
        inputValue,
    });
    const [file, setFile] = React.useState<UploadCare.File | undefined>(undefined);

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
        return quoteMessageReply && quoteMessagesId.length !== 0 && quoteMessageSender;
    };

    const handleDialogDone = (r: UploadCare.File) => {
        setInputValue('');
        if (onSendFile) {
            onSendFile(r);
        }
    };

    const onUploadCareSendFile = (fileForUc: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', fileForUc);
        if (onSendFile) {
            onSendFile(ucFile);
        }
    };

    const focusIfNeeded = () => {
        if (enabled !== false && !wasFocused) {
            wasFocused = true;
            focus();
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
        cleanDraft();
    };

    const handleChange = (value: string) => {
        setInputValue(value);

        if (onChange) {
            onChange(value);
        }

        if (!quoteMessagesId.length && beDrafted) {
            changeDraft(value);
        }
    };

    const shouldBeDrafted = () => {
        const { replyMessages, replyMessagesId, replyMessagesSender } = messagesContext;

        return !(replyMessages.size && replyMessagesId.size && replyMessagesSender.size);
    };

    const shouldHaveQuote = () => {
        const { replyMessagesId } = messagesContext;

        return !!replyMessagesId.size;
    };

    const updateQuote = () => {
        if (shouldHaveQuote()) {
            setQuoteMessageReply(getQuoteMessageReply(messagesContext));
            setQuoteMessagesId(getQuoteMessageId(messagesContext));
            setQuoteMessageSender(getQuoteMessageSender(messagesContext));
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
            focusIfNeeded();
        },
        [conversationId],
    );

    React.useEffect(
        () => {
            listOfMembersNames = members
                ? members.map(({ user: { name } }: { user: { name: string } }) => `@${name}`)
                : [];
        },
        [members],
    );

    const mentionsData = convertChannelMembersDataToMentionsData(members);

    return (
        <SendMessageWrapper>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    {quoteMessageReply && (
                        <EditView
                            message={quoteMessageReply}
                            title={quoteMessageSender || 'Edit message'}
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
    getMessages?: () => ModelMessage[];
};

export const MessageComposeComponentDraft = withGetDraftMessage(props => {
    const typedProps = props as typeof props & MessageComposeComponentDraftProps;
    return (
        <MessageComposeComponentChannelMembers {...typedProps} draft={typedProps.data.message} />
    );
}) as React.ComponentType<MessageComposeComponentDraftProps>;
