import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TypingType } from 'openland-api/spacex.types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';

export const useAttachHandler = (props: { conversationId: string, onOpen?: () => void, onClose?: () => void }) => {
    let messenger = React.useContext(MessengerContext);
    let conversation = messenger.getConversation(props.conversationId);
    let messagesActionsMethods = useChatMessagesActionsMethods(props.conversationId);

    let refreshFileUploadingTyping = React.useCallback((filename?: string) => {
        const lowercaseFilename = filename && filename.toLowerCase();
        let typingType = TypingType.FILE;

        if (lowercaseFilename) {
            if (lowercaseFilename.endsWith('.jpg') || lowercaseFilename.endsWith('.jpeg') || lowercaseFilename.endsWith('.png')) {
                typingType = TypingType.PHOTO;
            }

            if (lowercaseFilename.endsWith('.mp4') || lowercaseFilename.endsWith('.mov')) {
                typingType = TypingType.VIDEO;
            }
        }

        messenger.client.mutateSetTyping({
            conversationId: props.conversationId,
            type: typingType
        });
    }, [messenger]);

    let endFileUploadingTyping = React.useCallback(() => {
        messenger.client.mutateUnsetTyping({
            conversationId: props.conversationId,
        });
    }, [messenger]);

    let handleAttach = (files: File[], initialText: URickTextValue, isImage: boolean, onAttach?: () => void) => {
        if (files.length) {
            if (props.onOpen) {
                props.onOpen();
            }
            showAttachConfirm({
                files,
                text: initialText,
                isImage,
                onSubmit: (uploadingFiles, text, mentions, hasImages) => {
                    if (onAttach) {
                        onAttach();
                    }
                    if (props.onClose) {
                        props.onClose();
                    }
                    let quotedMessages = messagesActionsMethods.prepareToSend();
                    let keys;
                    if (hasImages) {
                        keys = conversation!.sendFiles({ files: uploadingFiles, mentions, text, quotedMessages }).filesKeys;
                    } else {
                        keys = uploadingFiles.map(({ file, preview }) => conversation!.sendFile({ file, preview, quotedMessages: undefined }));
                        if (text) {
                            keys.push(conversation!.sendMessage(text, mentions || null, quotedMessages));
                        }
                    }
                    return keys;
                },
                chatId: conversation?.conversationId,
                onFileUploadingProgress: refreshFileUploadingTyping,
                onFileUploadingEnd: endFileUploadingTyping,
                onCancel: props.onClose
            });
        }
    };
    return handleAttach;
};
