import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2 } from 'openland-x/XRichTextInput2';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { MutationFunc } from 'react-apollo';
import { withUserInfo, UserInfo } from '../../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import { withMessageState } from 'openland-web/api/withMessageState';
import { withGetDraftMessage } from 'openland-web/api/withMessageState';
import { withChannelMembers } from 'openland-web/api/withChannelMembers';
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
import { useKeydownHandler } from './useKeydownHandler';
import { useDraft } from './useDraft';
import { useHandleSend } from './useHandleSend';
import { useInputMethods } from './useInputMethods';
import { useQuote } from './useQuote';
import { useGeneralCompose } from './useGeneralCompose';
import { useMentions } from './useMentions';
import { DumpSendMessage } from './DumpSendMessage';
import { DesktopSendMessage } from './SendMessage/DesktopSendMessage';

export interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    isActive: boolean;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
    getMessages?: () => ModelMessage[];
}

export type MessageComposeComponentInnerProps = {
    TextInputComponent?: any;
    messagesContext: MessagesStateContextProps;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
    editMessage: MutationFunc<RoomEditMessage, Partial<RoomEditMessageVariables>>;
    draft?: string | null;
} & MessageComposeComponentProps &
    XWithRouter &
    UserInfo &
    MessageComposeComponentT;

const MessageComposeComponentInner = (messageComposeProps: MessageComposeComponentInnerProps) => {
    const inputRef = React.useRef<XRichTextInput2>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: messageComposeProps.enabled });
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const draftState = useDraft(messageComposeProps);

    const [inputValue, setInputValue] = React.useState(draftState.getDefaultValue());

    const quoteState = useQuote({
        inputMethodsState,
        conversationId: messageComposeProps.conversationId,
    });

    const mentionsState = useMentions({ members: messageComposeProps.members });

    const { handleSend, closeEditor } = useHandleSend({
        replyMessage: messageComposeProps.replyMessage,
        members: messageComposeProps.members,
        getMessages: messageComposeProps.getMessages,
        conversationId: messageComposeProps.conversationId,
        onSend: messageComposeProps.onSend,
        onSendFile: messageComposeProps.onSendFile,
        inputValue,
        setInputValue,
        quoteState,
        mentionsState,
        draftState,
        inputMethodsState,
    });

    useKeydownHandler({
        conversation: messageComposeProps.conversation,
        user: messageComposeProps.user,
        inputValue,
        quoteState,
        inputMethodsState,
    });

    const { handleChange } = useGeneralCompose({
        onChange: messageComposeProps.onChange,
        onSendFile: messageComposeProps.onSendFile,
        setInputValue,
        quoteState,
        draftState,
    });

    const hasReply = () => {
        return !(
            messagesContext.replyMessages.size &&
            messagesContext.replyMessagesId.size &&
            messagesContext.replyMessagesSender.size
        );
    };

    React.useEffect(() => {
        if (messageComposeProps.isActive) {
            messagesContext.changeForwardConverstion();
            setInputValue(hasReply() ? draftState.getNextDraft() : '');
            draftState.setBeDrafted(hasReply());
            inputMethodsState.focusIfNeeded();
        }
    }, [messageComposeProps.isActive]);

    return (
        <>
            {/* TODO maybe some other pattern here */}
            {messageComposeProps.isActive && (
                <DumpSendMessage
                    TextInputComponent={
                        messageComposeProps.TextInputComponent || DesktopSendMessage
                    }
                    quoteState={quoteState}
                    handleChange={handleChange}
                    handleSend={handleSend}
                    handleHideChat={messageComposeProps.handleHideChat}
                    inputRef={inputRef}
                    inputValue={inputValue}
                    enabled={messageComposeProps.enabled}
                    closeEditor={closeEditor}
                    mentionsState={mentionsState}
                />
            )}
            <PostIntroModal
                targetQuery="addItro"
                conversationId={messageComposeProps.conversationId || ''}
            />
        </>
    );
};

type MessageComposeComponentT = MessageComposeWithDraft & {
    members?: RoomMembers_members[];
};

export const MessageComposeComponent = withMessageState(
    withUserInfo(MessageComposeComponentInner),
) as React.ComponentType<MessageComposeComponentT>;

type MessageComposeWithDraft = MessageComposeComponentProps & {
    draft?: string | null;
};

const MessageComposeComponentChannelMembers = withChannelMembers(props => {
    const typedProps = props as typeof props & MessageComposeWithDraft;

    return <MessageComposeComponent members={typedProps.data.members} {...typedProps} />;
}) as React.ComponentType<MessageComposeWithDraft>;

export type MessageComposeComponentDraftProps = MessageComposeComponentProps & {
    TextInputComponent?: any;
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
