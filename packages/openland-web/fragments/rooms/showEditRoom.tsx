import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';

import { showModalBox } from 'openland-x/showModalBox';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { useClient } from 'openland-api/useClient';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showPinnedMessageSettingsModal } from './showPinnedMessageSettingsModal';
import IcPin from 'openland-icons/s/ic-pin-24.svg';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const formTitle = css`
    height: 48px;
    margin-top: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: var(--foregroundPrimary);
`;

const EditRoom = React.memo((props: { hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const messenger = React.useContext(MessengerContext)!;
    const voiceChatData = messenger.voiceChat.useVoiceChat();
    const titleField = useField('room.title', voiceChatData?.title || '', form);
    const [loading, setLoading] = React.useState(false);
    const [shakeClassName, shake] = useShake();
    const pinnedMessage = voiceChatData?.pinnedMessage?.message;

    const handleSave = React.useCallback(async () => {
        if (!voiceChatData) {
            return;
        }
        let title = titleField.value.trim();
        if (loading) {
            return;
        }
        if (title.length === 0) {
            shake();
            return;
        }
        setLoading(true);
        await client.mutateVoiceChatUpdate({ id: voiceChatData.id, input: { title } });
        props.hide();
    }, [titleField.value.length, loading]);
    if (!voiceChatData) {
        return null;
    }

    return (
        <>
            <XView paddingHorizontal={24} marginTop={16}>
                <div className={cx('x', shakeClassName)}>
                    <UTextAreaField
                        placeholder="Room name"
                        field={titleField}
                    />
                </div>
                <div className={cx(formTitle, TextTitle3)}>Settings</div>
            </XView>
            <UListItem
                title="Pinned message"
                icon={<IcPin />}
                paddingHorizontal={24}
                onClick={() => showPinnedMessageSettingsModal(voiceChatData.id, pinnedMessage)}
                textRight={pinnedMessage ? 'On' : 'Off'}
            />
            <XModalFooter marginTop={16}>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={props.hide}
                />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    loading={loading}
                    onClick={handleSave}
                />
            </XModalFooter>
        </>
    );
});

export const showEditRoom = (roomId: string) => {
    showModalBox({ title: 'Edit room', width: 368 }, ctx => (
        <EditRoom hide={ctx.hide} />
    ));
};
