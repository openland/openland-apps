import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TypingType } from 'openland-api/spacex.types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';

export const useAttachHandler = (props: { conversationId: string }) => {
    let messenger = React.useContext(MessengerContext);
    let conversation = messenger.getConversation(props.conversationId);
    let privateUserId = conversation.isPrivate ? conversation.user?.id : undefined;
    let messagesActionsMethods = useChatMessagesActionsMethods({ conversationId: props.conversationId, userId: privateUserId });

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

    let handleAttach = (files: File[], isImage: boolean, onAttach?: () => void) => {
        if (files.length) {
            showAttachConfirm({
                files,
                isImage,
                onSubmit: (uploadingFiles, text, mentions, hasImages) => {
                    if (onAttach) {
                        onAttach();
                    }
                    let quotedMessages = messagesActionsMethods.prepareToSend();
                    let keys;
                    if (hasImages) {
                        keys = conversation!.sendFiles({ files: uploadingFiles, mentions, text, quotedMessages });
                    } else {
                        keys = uploadingFiles.map(({ file, localImage }) => conversation!.sendFile(file, localImage, undefined));
                        if (text) {
                            keys.push(conversation!.sendMessage(text, mentions || null, quotedMessages));
                        }
                    }
                    return keys;
                },
                chatId: conversation?.conversationId,
                onFileUploadingProgress: refreshFileUploadingTyping,
                onFileUploadingEnd: endFileUploadingTyping,
            });
        }
    };
    return handleAttach;
};
