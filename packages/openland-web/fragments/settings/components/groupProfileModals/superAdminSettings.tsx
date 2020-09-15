import { cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { GroupSettingsModalBodyProps, modalSubtitle } from './shared';
import { TextBody } from 'openland-web/utils/TextStyles';
import { RadioButtonsSelect } from '../RadioButtonsSelect';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { FormSection } from '../FormSection';
import { SharedRoomKind } from '../../../../../openland-api/spacex.types';
import IcLock24 from '../../../../../openland-icons/s/ic-lock-24.svg';
import { UListItem } from '../../../../components/unicorn/UListItem';

interface SuperAdminSettingsValue {
    visibility: SharedRoomKind;
    featured: boolean;
}

const SuperAdminSettingsModalBody = React.memo((props: GroupSettingsModalBodyProps<SuperAdminSettingsValue> & {roomSuperId: string}) => {
    const { roomId, initialValue, hide } = props;

    const client = useClient();
    const form = useForm();

    const visibilityField = useField('visibility', initialValue.visibility, form);
    const featuredField = useField('featured', initialValue.featured, form);

    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateRoomUpdate({
                roomId,
                input: {
                    kind: visibilityField.input.value
                }
            });
            await client.mutateRoomAlterFeatured({
                id: props.roomSuperId,
                featured: featuredField.input.value
            });
            await client.refetchRoomSuper({id: roomId});
            await client.refetchRoomChat({ id: roomId });
            hide();
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        {`For Openland team only`}
                    </div>
                    <FormSection title="Visibility">
                    <RadioButtonsSelect
                        selectOptions={[
                            { label: 'Public', value: SharedRoomKind.PUBLIC },
                            { label: 'Private', value: SharedRoomKind.GROUP },
                        ]}
                        {...visibilityField.input}
                    />
                    </FormSection>
                    <FormSection title="Featured group">
                    <RadioButtonsSelect
                        selectOptions={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false },
                        ]}
                        {...featuredField.input}
                    />
                    </FormSection>
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()}/>
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

export const showSuperAdminSettingsModal = (
    {roomId, roomSuperId}: {
        roomId: string,
        roomSuperId: string
    },
    initialValue: SuperAdminSettingsValue,
) => {
    showModalBox(
        {
            width: 400,
            title: 'Superadmin settings',
        },
        (ctx) => (
            <SuperAdminSettingsModalBody
                roomId={roomId}
                roomSuperId={roomSuperId}
                initialValue={initialValue}
                hide={ctx.hide}
            />
        ),
    );
};

interface RoomEditModalSuperAdminTileProps {
    roomId: string;
    kind: SharedRoomKind;
}

export const RoomEditModalSuperAdminTile = React.memo(({roomId, kind}: RoomEditModalSuperAdminTileProps) => {
    const client = useClient();
    const {roomSuper} = client.useRoomSuper({id: roomId});

    if (!roomSuper) {
        return null;
    }

    return <UListItem
        title="Superadmin settings"
        icon={<IcLock24 />}
        paddingHorizontal={24}
        onClick={() => showSuperAdminSettingsModal({roomId, roomSuperId: roomSuper.id}, {
            visibility: kind,
            featured: roomSuper.featured
        })}
        textRight={'Custom'}
    />;
});

RoomEditModalSuperAdminTile.displayName = 'RoomEditModalSuperAdminTile';