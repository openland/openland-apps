import * as React from 'react';
import { cx } from 'linaria';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { GroupSettingsModalBodyProps, modalSubtitle } from './shared';
import { TextBody } from 'openland-web/utils/TextStyles';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';

interface ServiceMessagesValue {
    joinsMessageEnabled: boolean;
    leavesMessageEnabled: boolean;
}

const ServiceMessagesModalBody = React.memo(
    (props: GroupSettingsModalBodyProps<ServiceMessagesValue>) => {
        const { roomId, initialValue, hide } = props;

        const client = useClient();
        const form = useForm();

        const newMemberJoinsField = useField(
            'newMemberJoins',
            initialValue.joinsMessageEnabled,
            form,
        );
        const memberLeavesField = useField('memberLeaves', initialValue.leavesMessageEnabled, form);

        const onSave = async () => {
            await form.doAction(async () => {
                await client.mutateRoomUpdate({
                    roomId,
                    input: {
                        serviceMessageSettings: {
                            joinsMessageEnabled: newMemberJoinsField.value,
                            leavesMessageEnabled: memberLeavesField.value,
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
                        <div className={cx(modalSubtitle, TextBody)}>
                            {`Choose what messages to get`}
                        </div>
                        <XView marginHorizontal={-24}>
                            <UCheckboxFiled
                                label="New member joins"
                                field={newMemberJoinsField}
                                asSwitcher={true}
                                disableHorizontalPadding={true}
                                paddingHorizontal={24}
                                withCorners={true}
                            />
                            <UCheckboxFiled
                                label="Member leaves"
                                field={memberLeavesField}
                                asSwitcher={true}
                                disableHorizontalPadding={true}
                                paddingHorizontal={24}
                                withCorners={true}
                            />
                        </XView>
                    </XModalContent>
                </XScrollView3>
                <XModalFooter>
                    <UButton
                        text="Cancel"
                        style="tertiary"
                        size="large"
                        onClick={() => props.hide()}
                    />
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
    },
);

export const showServiceMessagesModal = (roomId: string, initialValue: ServiceMessagesValue) => {
    showModalBox(
        {
            width: 400,
            title: 'Service messages',
        },
        (ctx) => (
            <ServiceMessagesModalBody roomId={roomId} initialValue={initialValue} hide={ctx.hide} />
        ),
    );
};

export function getServiceMessagesSettingsShortLabel(o: ServiceMessagesValue): string {
    if (o.joinsMessageEnabled && o.leavesMessageEnabled) {
        return 'On';
    } else if (!o.joinsMessageEnabled && !o.leavesMessageEnabled) {
        return 'Off';
    } else {
        return 'Custom';
    }
}
