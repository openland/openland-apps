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
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showModalBox } from 'openland-x/showModalBox';
import { UInputField } from 'openland-web/components/unicorn/UInput';

import { modalSubtitle } from '../settings/components/groupProfileModals/shared';

const switchContainer = css`
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

interface MonetizationSettingsModalBodyProps {
    roomId: string;
    hide: () => void;
}

const MonetizationSettingsModalBody = React.memo<MonetizationSettingsModalBodyProps>((props) => {
    const { roomId } = props;
    const actionTextRef = React.useRef<HTMLInputElement>(null);
    const goalRef = React.useRef<HTMLInputElement>(null);
    const client = useClient();
    const form = useForm();
    const [donationsEnabled, setDonationsEnabled] = React.useState(false);
    const [goalEnabled, setGoalEnabled] = React.useState(false);

    const actionTextField = useField('actionText', '', form);
    const descriptionField = useField('description', '', form);
    const goalField = useField('description', '', form);

    const onSave = async () => {
        await form.doAction(async () => {
            if (!donationsEnabled) {
                // await client.mutateVoiceChatDeletePinnedMessage({ id: roomId });
                await client.refetchVoiceChat({ id: roomId });
                props.hide();
            } else if (donationsEnabled && !actionTextField.value.trim()) {
                if (actionTextRef && actionTextRef.current) {
                    actionTextRef.current.focus();
                }
            } else if (goalEnabled && !goalField.value.trim()) {
                if (goalRef && goalRef.current) {
                    goalRef.current.focus();
                }
            } else {
                // await client.mutateVoiceChatSetPinnedMessage({
                //     id: roomId,
                //     message: messageField.value.trim(),
                // });
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
                       Let people support live room
                    </div>
                    <div
                        className={switchContainer}
                        onClick={() => setDonationsEnabled(!donationsEnabled)}
                    >
                        <UCheckbox label="Enable donations" checked={donationsEnabled} asSwitcher={true} />
                    </div>
                    {donationsEnabled && (
                        <>
                            <XView flexGrow={1} flexShrink={1} marginTop={16}>
                                <UInputField
                                    label="Action text"
                                    field={actionTextField}
                                    ref={actionTextRef}
                                    remark="Up to 20 characters"
                                />
                                <UInputField
                                    label="Description"
                                    marginTop={16}
                                    field={descriptionField}
                                    remark="Up to 60 characters"
                                />
                            </XView>
                            <div
                                className={switchContainer}
                                onClick={() => setGoalEnabled(!goalEnabled)}
                            >
                                <UCheckbox label="Goal" checked={goalEnabled} asSwitcher={true} />
                            </div>
                            {goalEnabled && (
                                <UInputField
                                    label="Goal, $"
                                    marginTop={16}
                                    type="number"
                                    ref={goalRef}
                                    field={descriptionField}
                                />
                            )}
                        </>
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

export const showMonetizationSettingsModal = (roomId: string) => {
    showModalBox({ title: 'Monetization', width: 368 }, (ctx) => (
        <MonetizationSettingsModalBody
            roomId={roomId}
            hide={ctx.hide}
        />
    ));
};
