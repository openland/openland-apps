import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { GroupSettingsModalBodyProps, modalSubtitle } from './shared';
import { TextBody, TextLabel2 } from 'openland-web/utils/TextStyles';
import { RadioButtonsSelect } from '../RadioButtonsSelect';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { RoomCallsMode } from 'openland-api/spacex.types';

interface GroupCallsValue {
    mode: RoomCallsMode;
    callLink: string | null;
}

const callLinkInputHint = css`
    color: var(--foregroundSecondary);
    padding: 8px 16px;
    font-weight: normal;
`;

function isUrlValid(str: string): boolean {
    return /^(https?:\/\/)?[^\s$.?#].[^\s]*$/.test(str);
}

const GroupCallsModalBody = React.memo((props: GroupSettingsModalBodyProps<GroupCallsValue>) => {
    const { roomId, initialValue, hide } = props;

    const client = useClient();
    const form = useForm();

    const callProviderField = useField('callProvider', initialValue.mode, form);
    const customCallLinkField = useField('customCallLink', initialValue.callLink || '', form, [
        {
            checkIsValid: (v) => callProviderField.input.value !== RoomCallsMode.LINK || !!v,
            text: 'Call link is empty!',
        },
        {
            checkIsValid: (v) =>
                callProviderField.input.value !== RoomCallsMode.LINK || isUrlValid(v),
            text: 'Link is invalid',
        },
    ]);

    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateRoomUpdate({
                roomId,
                input: {
                    callSettings:
                        callProviderField.input.value === RoomCallsMode.LINK
                            ? {
                                  mode: callProviderField.value,
                                  callLink: customCallLinkField.value,
                              }
                            : {
                                  mode: callProviderField.value,
                              },
                },
            });
            await client.refetchRoomChat({ id: roomId });
            hide();
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>{`Choose what calls to use`}</div>
                    <XView marginHorizontal={-24}>
                        <RadioButtonsSelect
                            selectOptions={[
                                { label: 'Standard Openland calls', value: RoomCallsMode.STANDARD },
                                { label: 'Custom call link', value: RoomCallsMode.LINK },
                                { label: 'No calls', value: RoomCallsMode.DISABLED },
                            ]}
                            {...callProviderField.input}
                            disableHorizontalPadding={true}
                            paddingHorizontal={24}
                            withCorners={true}
                        />
                    </XView>
                    {callProviderField.value === RoomCallsMode.LINK && (
                        <XView flexGrow={1} flexShrink={1} marginTop={16}>
                            <UInput label={'Call link'} {...customCallLinkField.input} />
                            <div className={cx(callLinkInputHint, TextLabel2)}>
                                {
                                    'A link to external call room, e.g. on Zoom, Google Meet, or any other service'
                                }
                            </div>
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

export const showGroupCallsModal = (roomId: string, initialValue: GroupCallsValue) => {
    showModalBox(
        {
            width: 400,
            title: 'Group calls',
        },
        (ctx) => (
            <GroupCallsModalBody roomId={roomId} initialValue={initialValue} hide={ctx.hide} />
        ),
    );
};

export function getCallSettingsShortLabel(o: GroupCallsValue): string {
    switch (o.mode) {
        case RoomCallsMode.LINK:
            return 'Custom';
        case RoomCallsMode.DISABLED:
            return 'Off';
        case RoomCallsMode.STANDARD:
            return 'Standard';
        default:
            return '';
    }
}
