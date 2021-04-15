import * as React from 'react';

import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useVoiceChat, VoiceChatProvider } from 'openland-y-utils/voiceChat/voiceChatWatcher';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';

import { showPinnedMessageSettingsModal } from './showPinnedMessageSettingsModal';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';

interface PinnedMessageModalBodyProps {
    hide: () => void;
}

const PinnedMessageModalBody = React.memo<PinnedMessageModalBodyProps>((props) => {
    const voiceChatData = useVoiceChat();
    const client = useClient();
    const pinnedMessage = voiceChatData.pinnedMessage?.message;

    React.useEffect(() => {
        if (!pinnedMessage) {
            props.hide();
        }
    }, [pinnedMessage]);

    const handleDeleteClick = React.useCallback(() => {
        const builder = new AlertBlanketBuilder();

        builder.title('Delete pinned message');
        builder.action(
            'Delete',
            async () => {
                await client.mutateVoiceChatDeletePinnedMessage({ id: voiceChatData.id });
                await client.refetchVoiceChat({ id: voiceChatData.id });
                props.hide();
            },
            'danger',
        );
        builder.show();
    }, []);

    return (
        <>
            <XModalContent>{pinnedMessage}</XModalContent>
            {voiceChatData.me?.status === VoiceChatParticipantStatus.ADMIN && (
                <XModalFooter>
                    <UButton text="Delete" style="danger" size="large" onClick={handleDeleteClick} />
                    <UButton
                        text="Edit"
                        style="primary"
                        size="large"
                        marginLeft={16}
                        onClick={() => showPinnedMessageSettingsModal(voiceChatData.id, pinnedMessage)}
                    />
                </XModalFooter>
            )}
        </>
    );
});

export const showPinnedMessageModal = (roomId: string) => {
    showModalBox({ title: 'PinnedMessage', width: 368, useTopCloser: true }, (ctx) => (
        <VoiceChatProvider roomId={roomId}>
            <PinnedMessageModalBody hide={ctx.hide} />
        </VoiceChatProvider>
    ));
};