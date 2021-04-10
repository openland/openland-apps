import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { TextBody } from 'openland-web/utils/TextStyles';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showModalBox } from 'openland-x/showModalBox';
import { modalSubtitle } from '../settings/components/groupProfileModals/shared';

const pinnedMessageSwitchContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 -24px;
    padding: 0 8px;
    cursor: pointer;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    & > div {
        pointer-events: none;
    }
`;

interface PinnedMessageSettingsModalBodyProps {
    roomId: string;
    pinnedMessage?: string | null;
    hide: () => void;
}

const PinnedMessageSettingsModalBody = React.memo<PinnedMessageSettingsModalBodyProps>((props) => {
    const { roomId, pinnedMessage } = props;
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const client = useClient();
    const form = useForm();
    const [enabled, setEnabled] = React.useState(!!pinnedMessage);

    const messageField = useField('pinnedMessageText', pinnedMessage || '', form);

    const onSave = async () => {
        await form.doAction(async () => {
            if (!enabled) {
                await client.mutateVoiceChatDeletePinnedMessage({ id: roomId });
                await client.refetchVoiceChat({ id: roomId });
                props.hide();
            } else if (enabled && !messageField.value.trim()) {
                if (inputRef && inputRef.current) {
                    inputRef.current.focus();
                }
            } else {
                await client.mutateVoiceChatSetPinnedMessage({
                    id: roomId,
                    message: messageField.value.trim(),
                });
                await client.refetchVoiceChat({ id: roomId });
                props.hide();
            }
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        Room rules, agenda, or other helpful notes
                    </div>
                    <div
                        className={pinnedMessageSwitchContainer}
                        onClick={() => setEnabled(!enabled)}
                    >
                        <UCheckbox label="Pinned message" checked={enabled} asSwitcher={true} />
                    </div>
                    {enabled && (
                        <XView flexGrow={1} flexShrink={1} marginTop={16}>
                            <UTextAreaField
                                ref={inputRef}
                                field={messageField}
                                placeholder="Text message"
                                marginTop={16}
                            />
                        </XView>
                    )}
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSave}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
});

export const showPinnedMessageSettingsModal = (roomId: string, pinnedMessage?: string | null) => {
    showModalBox({ title: 'PinnedMessage', width: 368 }, (ctx) => (
        <PinnedMessageSettingsModalBody
            roomId={roomId}
            pinnedMessage={pinnedMessage}
            hide={ctx.hide}
        />
    ));
};
