import * as React from 'react';
import { ModelMessage } from 'openland-engines/messenger/types';
import {
    ReplyMessageVariables,
    ReplyMessage,
    RoomMembers_members,
    MessageFull_mentions,
} from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import { getMentions } from './MessageComposeComponentDesktop';
import { useReply } from './useReply';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';

export function useHandleSend({
    conversationId,
    quoteMessagesId,
    replyMessage,
    getMessages,
    listOfMembersNames,
    members,
    inputValue,
    onSendFile,
    quoteMessageReply,
    quoteMessageSender,
    onSend,
    resetAndFocus,
    setBeDrafted,
    cleanDraft,
    setInputValue,
    setQuoteMessageReply,
    setQuoteMessageSender,
    setQuoteMessagesId,
}: {
    cleanDraft: Function;
    resetAndFocus: Function;
    setBeDrafted: Function;
    setInputValue: Function;
    setQuoteMessageReply: Function;
    setQuoteMessageSender: Function;
    setQuoteMessagesId: Function;
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    quoteMessageReply: any;
    quoteMessageSender: any;
    quoteMessagesId: string[];
    conversationId?: string;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
    listOfMembersNames: string[];
    inputValue: string;
}) {
    const [file, setFile] = React.useState<UploadCare.File | undefined>(undefined);
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const { replyMessagesProc } = useReply({
        conversationId,
        quoteMessagesId,
        replyMessage,
        getMessages,
        listOfMembersNames,
        members,
        inputValue,
    });

    const hasQuoteInState = () => {
        return quoteMessageReply && quoteMessagesId.length !== 0 && quoteMessageSender;
    };

    const onUploadCareSendFile = (fileForUc: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', fileForUc);
        if (onSendFile) {
            onSendFile(ucFile);
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
        let msg = inputValue.trim();
        if (msg.length > 0) {
            if (onSend && !hasQuoteInState()) {
                onSend(msg, getMentions(msg, listOfMembersNames, members));
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

    return { handleSend, closeEditor };
}
