import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UserInfoContext } from '../../../components/UserInfo';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../../components/messenger/MessagesStateContext';
import {
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage,
    EditPostMessageVariables,
    EditPostMessage,
    SharedRoomKind,
    RoomMembersForMentionsPaginated_members,
    UserShort,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useKeydownHandler } from '../hooks/useKeydownHandler';
import { useDraft } from '../hooks/useDraft/useDraft';
import { useHandleSend } from '../hooks/useHandleSend';
import { useInputMethods } from '../hooks/useInputMethods';
import { useQuote } from '../hooks/useQuote';
import { useHandleChange } from '../hooks/useHandleChange';
import { DumpSendMessage } from './DumpSendMessage';
import { DesktopSendMessage } from './SendMessage/DesktopSendMessage';
import { UploadContext } from '../../../modules/FileUploading/UploadContext';
import { useClient } from 'openland-web/utils/useClient';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';

export interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    minimal?: boolean;
    onSend?: (
        text: string,
        mentions:
            | (
                  | FullMessage_GeneralMessage_spans_MessageSpanUserMention
                  | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[]
            | null,
    ) => void;
    onSendFile?: (file: UploadCare.File) => Promise<string> | void;
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

// TODO: get rid of any
// TODO: extract only needed props
const MessageComposeComponentInnerInner = React.memo(
    (
        messageComposeProps: MessageComposeComponentInnerProps & {
            inputMethodsState: any;
            inputValue: string;
            setInputValue: (val: string) => void;
            draftState: any;
            inputRef: any;
        },
    ) => {
        let {
            inputMethodsState,
            inputValue,
            setInputValue,
            draftState,
            inputRef,
        } = messageComposeProps;
        const quoteState = useQuote({
            inputMethodsState,
            conversationId: messageComposeProps.conversationId,
        });

        const { handleSend, closeEditor } = useHandleSend({
            replyMessage: messageComposeProps.replyMessage,
            conversationId: messageComposeProps.conversationId,
            onSend: messageComposeProps.onSend,
            onSendFile: messageComposeProps.onSendFile,
            scrollToBottom: messageComposeProps.scrollToBottom,
            inputValue,
            setInputValue,
            quoteState,
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
            onChange: messageComposeProps.onChange,
            setInputValue,
            draftState,
        });

        const getMentionsSuggestions = async () => {
            return (await messageComposeProps.getMembers()).map(({ user }) => user);
        };

        const initialMentions: UserWithOffset[] = draftState.getDefaultValue().mentions;

        return (
            <DumpSendMessage
                initialMentions={initialMentions}
                getMentionsSuggestions={getMentionsSuggestions}
                TextInputComponent={messageComposeProps.TextInputComponent || DesktopSendMessage}
                quoteState={quoteState}
                handleChange={handleChange}
                handleSend={handleSend}
                inputRef={inputRef}
                inputValue={inputValue}
                enabled={messageComposeProps.enabled}
                closeEditor={closeEditor}
            />
        );
    },
);

const MessageComposeComponentInner = (props: MessageComposeComponentInnerProps) => {
    const inputRef = React.useRef<XRichTextInput2RefMethods>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: props.enabled });
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const { file } = React.useContext(UploadContext);
    const isActive = React.useContext(IsActivePoliteContext);
    const draftState = useDraft(props);
    const [inputValue, setInputValue] = React.useState(draftState.getDefaultValue().text);

    const hasReply = () => {
        return !(
            messagesContext.replyMessages.size &&
            messagesContext.replyMessagesId.size &&
            messagesContext.replyMessagesSender.size
        );
    };

    React.useEffect(() => {
        return isActive.listen(a => {
            if (a) {
                const newInputValue = hasReply()
                    ? draftState.getNextDraft()
                    : { text: '', mentions: [] };
                messagesContext.changeForwardConverstion();
                setInputValue(newInputValue.text);
                draftState.setBeDrafted(hasReply());
                inputMethodsState.focusIfNeeded();
            }
        });
    }, []);

    if (file) {
        inputMethodsState.focusIfNeeded();
    }

    return (
        <MessageComposeComponentInnerInner
            {...props}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputMethodsState={inputMethodsState}
            inputRef={inputRef}
            draftState={draftState}
        />
    );
};

type MessageComposeComponentT = MessageComposeWithDraft & {
    getMembers: () => Promise<RoomMembersForMentionsPaginated_members[]>;
};

export const MessageComposeComponent = (props => {
    const ctx = React.useContext(UserInfoContext);
    let client = useClient();
    const replyMessage = React.useCallback(client.mutateReplyMessage.bind(client), []);
    const editMessage = React.useCallback(client.mutateEditPostMessage.bind(client), []);
    const saveDraftMessage = React.useCallback(client.mutateSaveDraftMessage.bind(client), []);

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

    const draft = client.useGetDraftMessage({
        conversationId: props.conversationId!!,
    });

    const getMembers = React.useCallback(async () => {
        const data = await client.queryRoomMembersForMentionsPaginated({
            roomId: props.conversationId!!,
        });

        return data.members;
    }, []);

    return (
        <MessageComposeComponent
            draft={draft ? draft.message : null}
            getMembers={getMembers}
            {...props}
        />
    );
};
