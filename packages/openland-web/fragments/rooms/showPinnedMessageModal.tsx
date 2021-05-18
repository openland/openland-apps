import * as React from 'react';

import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';

import { showPinnedMessageSettingsModal } from './showPinnedMessageSettingsModal';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { UText } from 'openland-web/components/unicorn/UText';
import { emoji } from 'openland-y-utils/emoji';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface PinnedMessageModalBodyProps {
    hide: () => void;
}

const PinnedMessageModalBody = React.memo<PinnedMessageModalBodyProps>((props) => {
    const messenger = React.useContext(MessengerContext)!;
    const voiceChatData = messenger.voiceChat.useVoiceChat();
    const client = useClient();
    const pinnedMessage = voiceChatData?.pinnedMessage?.message;

    React.useEffect(() => {
        if (!pinnedMessage) {
            props.hide();
        }
    }, [pinnedMessage]);

    const handleDeleteClick = React.useCallback(() => {
        if (!voiceChatData) {
            return;
        }
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
    }, [voiceChatData]);

    if (!voiceChatData) {
        return null;
    }

    return (
        <>
            <XModalContent>
                <UText text={pinnedMessage} proccessText={emoji} />
            </XModalContent>
            {voiceChatData.me?.status === VoiceChatParticipantStatus.ADMIN && (
                <XModalFooter>
                    <UButton
                        text="Delete"
                        style="danger"
                        size="large"
                        onClick={handleDeleteClick}
                    />
                    <UButton
                        text="Edit"
                        style="primary"
                        size="large"
                        marginLeft={16}
                        onClick={() =>
                            showPinnedMessageSettingsModal(voiceChatData.id, pinnedMessage)
                        }
                    />
                </XModalFooter>
            )}
        </>
    );
});

export const showPinnedMessageModal = (roomId: string) => {
    showModalBox({ title: 'Pinned message', width: 368, useTopCloser: true }, (ctx) => (
        <PinnedMessageModalBody hide={ctx.hide} />
    ));
};
