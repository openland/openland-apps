import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import { useReply } from './useReply';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../components/messenger/MessagesStateContext';
import { QuoteStateT } from './useQuote';
import { DraftStateT } from './useDraft';
import { InputMethodsStateT } from './useInputMethods';
import { MentionsStateT } from './useMentions';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { useReplyPropsT } from './useReply';
import { UploadContext } from '../../modules/FileUploading/UploadContext';

export type useHandleSendT = {
    onSend?: (text: string, mentions: UserWithOffset[] | null, uploadedFileKey?: string) => void;
    onSendFile?: (file: UploadCare.File) => Promise<string> | void;
    mentionsState?: MentionsStateT;
    inputMethodsState?: InputMethodsStateT;
    draftState?: DraftStateT;
    setInputValue: Function;
    quoteState?: QuoteStateT;
    inputValue: string;
    inputRef?: any;
    scrollToBottom?: () => void;
} & useReplyPropsT;

export function useHandleSend({
    onSend,
    onSendFile,
    replyMessage,
    members,
    conversationId,
    inputValue,
    inputMethodsState,
    draftState,
    setInputValue,
    quoteState,
    mentionsState,
    inputRef,
    scrollToBottom,
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

    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const dropZoneContext = React.useContext(UploadContext);
    const { file } = dropZoneContext;

    const { replyMessagesProc } = useReply({
        replyMessage,
        members,
        conversationId,
        quoteState,
        mentionsState,
        inputValue,
    });

    const scrollChatToBottom = () => {
        if (scrollToBottom) {
            scrollToBottom();
        }
    };

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

    const onUploadCareSendFile = async (fileForUc: UploadCare.File) => {
        let uploadedFileKey = undefined;
        const ucFile = UploadCare.fileFrom('object', fileForUc);
        if (onSendFile) {
            uploadedFileKey = await onSendFile(ucFile);
            dropZoneContext.fileRemover();
        }

        return uploadedFileKey;
    };

    const closeEditor = () => {
        messagesContext.resetAll();
        setInputValue('');
        if (supportQuote()) {
            // TODO move to quote here
            quoteState!!.setQuoteMessageReply!!(null);
            quoteState!!.setQuoteMessageSender!!(null);
            quoteState!!.setQuoteMessagesId!!([]);
        }
        if (inputRef && inputRef.current) {
            inputRef.current.innerText = '';
        }

        if (inputMethodsState) {
            inputMethodsState.resetAndFocus();
        }
    };

    const handleSend = async () => {
        let msg = inputValue.trim();
        if (onSend && !hasQuoteInState()) {
            let uploadedFileKey = undefined;
            if (file) {
                uploadedFileKey = (await onUploadCareSendFile(file)) || undefined;
            }
            if (supportMentions() && mentionsState) {
                await onSend(msg, mentionsState.getMentions(), uploadedFileKey);
                mentionsState.setCurrentMentions([]);
            } else {
                await onSend(msg, null, uploadedFileKey);
            }

            if (supportDraft()) {
                draftState!!.setBeDrafted!!(false);
            }
        }
        if (inputValue && hasQuoteInState()) {
            replyMessagesProc();
            if (file) {
                onUploadCareSendFile(file);
            }
        }
        scrollChatToBottom();

        closeEditor();
        if (supportDraft()) {
            draftState!!.cleanDraft!!();
        }
    };

    return { handleSend, closeEditor };
}
