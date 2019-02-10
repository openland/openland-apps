import * as React from 'react';
import { useReply } from './useReply';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import { QuoteStateT } from './useQuote';
import { DraftStateT } from './useDraft';
import { InputMethodsStateT } from './useInputMethods';
import { MentionsStateT } from './useMentions';
import { MessageFull_mentions } from 'openland-api/Types';
import { useReplyPropsT } from './useReply';

export type useHandleSendT = {
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    mentionsState?: MentionsStateT;
    inputMethodsState?: InputMethodsStateT;
    draftState?: DraftStateT;
    setInputValue: Function;
    quoteState?: QuoteStateT;
    inputValue: string;
} & useReplyPropsT;

export function useHandleSend({
    onSend,
    onSendFile,
    replyMessage,
    members,
    getMessages,
    conversationId,
    inputValue,
    inputMethodsState,
    draftState,
    setInputValue,
    quoteState,
    mentionsState,
}: useHandleSendT) {
    const supportMentions = () => {
        return !!mentionsState && !!members;
    };

    const supportDraft = () => {
        return !!draftState;
    };
    const supportQuote = () => {
        return !!quoteState;
    };

    const [file, setFile] = React.useState<UploadCare.File | undefined>(undefined);
    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);

    const { replyMessagesProc } = useReply({
        replyMessage,
        members,
        getMessages,
        conversationId,
        quoteState,
        mentionsState,
        inputValue,
    });

    const hasQuoteInState = () => {
        if (!supportQuote()) {
            return false;
        }
        return (
            // TODO move to quote here
            quoteState!!.quoteMessageReply &&
            quoteState!!.quoteMessagesId!!.length !== 0 &&
            quoteState!!.quoteMessageSender
        );
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
        if (supportQuote()) {
            // TODO move to quote here
            quoteState!!.setQuoteMessageReply!!(undefined);
            quoteState!!.setQuoteMessageSender!!(undefined);
            quoteState!!.setQuoteMessagesId!!([]);
        }

        setFile(undefined);
        if (inputMethodsState) {
            inputMethodsState.resetAndFocus();
        }
    };

    const handleSend = () => {
        let msg = inputValue.trim();
        if (msg.length > 0) {
            if (onSend && !hasQuoteInState()) {
                if (supportMentions()) {
                    onSend(
                        msg,
                        // TODO simplify here
                        mentionsState!!.getMentions!!(
                            msg,
                            mentionsState!!.listOfMembersNames!!,
                            members,
                        ),
                    );
                } else {
                    onSend(msg, null);
                }

                if (supportDraft()) {
                    draftState!!.setBeDrafted!!(false);
                }

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
        if (supportDraft()) {
            draftState!!.cleanDraft!!();
        }
    };

    return { handleSend, closeEditor };
}
