import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { TypingType } from 'openland-api/spacex.types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';

export const useAttachHandler = (props: { messenger: MessengerEngine, conversationId: string }) => {
    let conversation = props.messenger.getConversation(props.conversationId);

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

        props.messenger.client.mutateSetTyping({
            conversationId: props.conversationId,
            type: typingType
        });
    }, [props.messenger]);

    let endFileUploadingTyping = React.useCallback(() => {
        props.messenger.client.mutateUnsetTyping({
            conversationId: props.conversationId,
        });
    }, [props.messenger]);

    let handleAttach = React.useCallback((files: File[]) => {
        if (files.length) {
            showAttachConfirm(
                files,
                res => res.map(({ file, localImage }) => conversation!.sendFile(file, localImage)),
                refreshFileUploadingTyping,
                endFileUploadingTyping
            );
        }
    }, [conversation, refreshFileUploadingTyping, endFileUploadingTyping]);
    return handleAttach;
};
