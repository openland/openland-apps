import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { QuoteStateT } from './useQuote';
import { DraftStateT } from './useDraft/useDraft';
import { InputMethodsStateT } from './useInputMethods';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UploadContext } from '../../../modules/FileUploading/UploadContext';
import { ReplyMessageVariables, ReplyMessage } from 'openland-api/Types';
import { findSpans } from 'openland-y-utils/findSpans';
import { getUploadCareFile } from 'openland-web/components/messenger/message/content/comments/useSendMethods';

export type useReplyPropsT = {
    replyMessage?: (variables: ReplyMessageVariables) => Promise<ReplyMessage>;
    conversationId?: string;
    quoteState?: QuoteStateT;
    inputValue: string;
};

export type useHandleSendT = {
    onSend?: (text: string, mentions: UserWithOffset[] | null, uploadedFileKey?: string) => void;
    onSendFile?: (file: UploadCare.File) => Promise<string> | void;
    inputMethodsState?: InputMethodsStateT;
    draftState?: DraftStateT;
    setInputValue: Function;
    quoteState?: QuoteStateT;
    inputValue: string;
    scrollToBottom?: () => void;
} & useReplyPropsT;

export function useHandleSend({
    onSend,
    onSendFile,
    replyMessage,
    conversationId,
    inputValue,
    inputMethodsState,
    draftState,
    setInputValue,
    quoteState,
    scrollToBottom,
}: useHandleSendT) {
    const supportDraft = () => {
        return !!draftState;
    };
    const supportQuote = () => {
        return !!quoteState;
    };

    const messagesContext: MessagesStateContextProps = React.useContext(MessagesStateContext);
    const dropZoneContext = React.useContext(UploadContext);
    const { file } = dropZoneContext;

    const scrollChatToBottom = () => {
        if (scrollToBottom) {
            scrollToBottom();
        }
    };

    const hasQuoteInState = () => {
        if (!supportQuote()) {
            return false;
        }
        return quoteState!!.getQuote();
    };

    const onUploadCareSendFile = async (fileForUc: any) => {
        let uploadedFileKey = undefined;
        if (onSendFile) {
            uploadedFileKey = await onSendFile(getUploadCareFile(fileForUc));
            dropZoneContext.fileRemover();
        }

        return uploadedFileKey;
    };
    const closeEditor = () => {
        messagesContext.resetAll();
        setInputValue('');
        if (supportQuote()) {
            quoteState!!.clearQuote();
        }

        if (inputMethodsState) {
            inputMethodsState.resetAndFocus();
        }
    };

    const clearAfterSend = () => {
        if (supportDraft()) {
            draftState!!.cleanDraft!!();
            draftState!!.setBeDrafted!!(false);
        }
        scrollChatToBottom();
        closeEditor();
    };

    const handleSend = async () => {
        let msg = inputValue.trim();

        let uploadedFileKey = undefined;
        if (file) {
            uploadedFileKey = (await onUploadCareSendFile(file)) || undefined;
        }
        if (replyMessage && hasQuoteInState()) {
            const finalQuoteMessagesId = quoteState ? quoteState.quoteMessagesId || [] : [];
            let mentions: UserWithOffset[] = [];
            if (inputMethodsState) {
                mentions = inputMethodsState.getMentions().map((user: any) => user);
            }
            await replyMessage({
                chatId: conversationId!!,
                message: inputValue,
                mentions: mentions,
                replyMessages: finalQuoteMessagesId,
                spans: findSpans(inputValue),
            });
        } else if (onSend && (inputValue || uploadedFileKey)) {
            if (inputMethodsState) {
                await onSend(msg, inputMethodsState.getMentions(), uploadedFileKey);
            } else {
                await onSend(msg, null, uploadedFileKey);
            }
        }

        clearAfterSend();
    };

    return { handleSend, closeEditor };
}
