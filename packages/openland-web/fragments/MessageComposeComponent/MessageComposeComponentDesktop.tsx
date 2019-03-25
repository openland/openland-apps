import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
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
    SharedRoomKind,
    RoomMembers_members,
    UserShort,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useKeydownHandler } from './useKeydownHandler';
import { useDraft } from './useDraft';
import { useHandleSend } from './useHandleSend';
import { useInputMethods } from './useInputMethods';
import { useQuote } from './useQuote';
import { useHandleChange } from './useHandleChange';
import { useMentions } from './useMentions';
import { DumpSendMessage } from './DumpSendMessage';
import { DesktopSendMessage } from './SendMessage/DesktopSendMessage';
import { UploadContext } from './FileUploading/UploadContext';

export interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    isActive: boolean;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: UserShort[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
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
    const inputRef = React.useRef<XRichTextInput2RefMethods>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: messageComposeProps.enabled });
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const { file } = React.useContext(UploadContext);

    if (file) {
        inputMethodsState.focusIfNeeded();
    }

    const draftState = useDraft(messageComposeProps);

    const [inputValue, setInputValue] = React.useState(draftState.getDefaultValue().text);

    const quoteState = useQuote({
        inputMethodsState,
        conversationId: messageComposeProps.conversationId,
    });

    const mentionsState = useMentions({
        members: messageComposeProps.members,
    });

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

    const { handleChange } = useHandleChange({
        mentionsState,
        onChange: messageComposeProps.onChange,
        setInputValue,
        draftState,
    });

    const hasReply = () => {
        return !(
            messagesContext.replyMessages.size &&
            messagesContext.replyMessagesId.size &&
            messagesContext.replyMessagesSender.size
        );
    };

    const [currentConversation, setCurrentConversation] = React.useState<string | undefined>(
        undefined,
    );

    React.useEffect(() => {
        if (
            messageComposeProps.conversationId &&
            currentConversation !== messageComposeProps.conversationId
        ) {
            setCurrentConversation(messageComposeProps.conversationId);
        }
    });

    React.useEffect(
        () => {
            const newInputValue = hasReply()
                ? draftState.getNextDraft()
                : { text: '', mentions: [] };
            messagesContext.changeForwardConverstion();
            setInputValue(newInputValue.text);
            draftState.setBeDrafted(hasReply());
            inputMethodsState.setInputValue(newInputValue);
            inputMethodsState.focusIfNeeded();
        },
        [currentConversation],
    );

    return (
        <>
            {messageComposeProps.isActive && (
                <DumpSendMessage
                    TextInputComponent={
                        messageComposeProps.TextInputComponent || DesktopSendMessage
                    }
                    quoteState={quoteState}
                    handleChange={handleChange}
                    handleSend={handleSend}
                    inputRef={inputRef}
                    inputValue={inputValue}
                    enabled={messageComposeProps.enabled}
                    closeEditor={closeEditor}
                    mentionsState={mentionsState}
                />
            )}
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
