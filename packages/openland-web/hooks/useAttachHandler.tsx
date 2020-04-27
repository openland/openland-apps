import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TypingType } from 'openland-api/spacex.types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';

export const useAttachHandler = (props: { conversationId: string }) => {
    let messenger = React.useContext(MessengerContext);
    let conversation = messenger.getConversation(props.conversationId);

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

    let handleAttach = React.useCallback((files: File[], onAttach?: () => void) => {
        if (files.length) {
            showAttachConfirm(
                files,
                res => {
                    if (onAttach) {
                        onAttach();
                    }
                    return res.map(({ file, localImage }) => conversation!.sendFile(file, localImage));
                },
                refreshFileUploadingTyping,
                endFileUploadingTyping
            );
        }
    }, [conversation, refreshFileUploadingTyping, endFileUploadingTyping]);
    return handleAttach;
};
