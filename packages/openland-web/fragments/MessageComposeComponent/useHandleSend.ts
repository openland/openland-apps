import * as React from 'react';
import UploadCare from 'uploadcare-widget';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { QuoteStateT } from './useQuote';
import { DraftStateT } from './useDraft';
import { InputMethodsStateT } from './useInputMethods';
import { MentionsStateT } from './useMentions';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UploadContext } from '../../modules/FileUploading/UploadContext';
import { ReplyMessageVariables, ReplyMessage, RoomMembers_members } from 'openland-api/Types';

export type useReplyPropsT = {
    replyMessage?: (variables: ReplyMessageVariables) => Promise<ReplyMessage>;
    conversationId?: string;
    mentionsState?: MentionsStateT;
    quoteState?: QuoteStateT;
    inputValue: string;
};

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
        return !!mentionsState;
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
            quoteState!!.clearQuote();
        }
        if (inputRef && inputRef.current) {
            inputRef.current.innerText = '';
        }

        if (inputMethodsState) {
            inputMethodsState.resetAndFocus();
        }
    };

    const clearAfterSend = () => {
        if (supportMentions() && mentionsState) {
            mentionsState.setCurrentMentions([]);
        }
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
            if (supportMentions() && mentionsState!!.getMentions) {
                mentions = mentionsState!!.getMentions().map((user: any) => user);
            }
            await replyMessage({
                roomId: conversationId!!,
                message: inputValue,
                mentions: mentions.map(m => m.user.id),
                replyMessages: finalQuoteMessagesId,
            });
        } else if (onSend && (inputValue || uploadedFileKey)) {
            if (supportMentions() && mentionsState) {
                await onSend(msg, mentionsState.getMentions(), uploadedFileKey);
            } else {
                await onSend(msg, null, uploadedFileKey);
            }
        }

        clearAfterSend();
    };

    return { handleSend, closeEditor };
}
