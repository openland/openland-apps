import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UserInfoContext } from '../../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import {
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage,
    EditPostMessageVariables,
    EditPostMessage,
    SharedRoomKind,
    MentionsMembers_members,
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
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';
import { useClient } from 'openland-web/utils/useClient';
export interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: UserShort[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    scrollToBottom?: () => void;
}

export type MessageComposeComponentInnerProps = {
    TextInputComponent?: any;
    replyMessage: (variables: ReplyMessageVariables) => Promise<ReplyMessage>;
    saveDraftMessage: (variables: SaveDraftMessageVariables) => Promise<SaveDraftMessage>;
    editMessage: (variables: EditPostMessageVariables) => Promise<EditPostMessage>;
    draft?: string | null;
} & MessageComposeComponentProps & { user: UserShort } & MessageComposeComponentT; // XWithRouter &

const MessageComposeComponentInner = (messageComposeProps: MessageComposeComponentInnerProps) => {
    const inputRef = React.useRef<XRichTextInput2RefMethods>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: messageComposeProps.enabled });
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const { file } = React.useContext(UploadContext);
    const isActive = React.useContext(IsActiveContext);

    const [currentConversationId, setCurrentConversationId] = React.useState<string | undefined>(
        undefined,
    );
    const [currentConversation, setCurrentConversation] = React.useState<
        ConversationEngine | undefined
    >(undefined);

    React.useEffect(() => {
        if (isActive && messageComposeProps.conversationId) {
            setCurrentConversationId(messageComposeProps.conversationId);
            setCurrentConversation(messageComposeProps.conversation);
        }
    });

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
        conversationId: messageComposeProps.conversationId,
        onSend: messageComposeProps.onSend,
        onSendFile: messageComposeProps.onSendFile,
        scrollToBottom: messageComposeProps.scrollToBottom,
        inputValue,
        setInputValue,
        quoteState,
        mentionsState,
        draftState,
        inputMethodsState,
    });

    useKeydownHandler({
        conversation: currentConversation,
        user: messageComposeProps.user,
        inputValue,
        quoteState,
        inputMethodsState,
        isActive,
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

    React.useEffect(
        () => {
            if (isActive) {
                const newInputValue = hasReply()
                    ? draftState.getNextDraft()
                    : { text: '', mentions: [] };
                messagesContext.changeForwardConverstion();
                setInputValue(newInputValue.text);
                draftState.setBeDrafted(hasReply());
                inputMethodsState.focusIfNeeded();
            }
        },
        [isActive, currentConversationId],
    );

    return (
        <>
            {isActive && (
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
    members?: MentionsMembers_members[];
};

export const MessageComposeComponent = (props => {
    const ctx = React.useContext(UserInfoContext);
    let client = useClient();
    const replyMessage = client.mutateReplyMessage.bind(client);
    const editMessage = client.mutateEditPostMessage.bind(client);
    const saveDraftMessage = client.mutateSaveDraftMessage.bind(client);

    return (
        <MessageComposeComponentInner
            {...props}
            replyMessage={replyMessage}
            editMessage={editMessage}
            saveDraftMessage={saveDraftMessage}
            user={ctx!!.user!!}
        />
    );
}) as React.ComponentType<MessageComposeComponentT>;

type MessageComposeWithDraft = MessageComposeComponentProps & {
    draft?: string | null;
};

export type MessageComposeComponentDraftProps = MessageComposeComponentProps & {
    TextInputComponent?: any;
    variables?: {
        roomId?: string;
        conversationId?: string;
    };
    getMessages?: () => ModelMessage[];
};

export const MessageComposeComponentDraft = (props: MessageComposeComponentDraftProps) => {
    let client = useClient();

    const draft = client.useWithoutLoaderGetDraftMessage({
        conversationId: props.conversationId!!,
    });

    const members = client.useMentionsMembers({
        roomId: props.conversationId!!,
    });

    return (
        <MessageComposeComponent
            draft={draft ? draft.message : null}
            members={members ? members.members : []}
            {...props}
        />
    );
};
