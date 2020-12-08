import { cx } from 'linaria';
import { XImage, XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { GroupSettingsModalBodyProps, modalSubtitle } from './shared';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { RadioButtonsSelect } from '../RadioButtonsSelect';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { FormSection } from '../FormSection';
import { RoomUpdateVariables, SharedRoomKind } from 'openland-api/spacex.types';
import IcLock24 from 'openland-icons/s/ic-lock-24.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { plural } from 'openland-y-utils/plural';

interface SuperAdminSettingsValue {
    visibility: SharedRoomKind;
    featured: boolean;
    giftStickerPackId: string | null;
}

const SuperAdminSettingsModalBody = React.memo(
    (
        props: GroupSettingsModalBodyProps<SuperAdminSettingsValue> & {
            roomSuperId: string;
            isChannel: boolean;
        },
    ) => {
        const { roomId, initialValue, hide } = props;
        const initialFeatured = initialValue.featured ? 'true' : 'false';

        const client = useClient();
        const form = useForm();

        const stickerPacks = (client.useSuperAllStickerPacks()?.superAllStickerPacks || [])
            .map(x => ({ label: x.title, value: x.id, imageId: x.stickers[0]?.image.uuid, count: x.stickers.length }));

        const visibilityField = useField('visibility.input', initialValue.visibility, form);
        const featuredField = useField('featured.input', initialFeatured, form);
        const stickerField = useField('sticker.input', initialValue.giftStickerPackId, form);

        const onSave = async () => {
            form.doAction(async () => {
                let input: RoomUpdateVariables['input'] = { kind: visibilityField.input.value };
                if (stickerField.value !== null) {
                    input.giftStickerPackId = stickerField.value;
                }
                await Promise.all([
                    client.mutateRoomUpdate({
                        roomId,
                        input,
                    }),
                    client.mutateRoomAlterFeatured({
                        id: props.roomSuperId,
                        featured: featuredField.input.value === 'true',
                    })
                ]);
                await Promise.all([
                    client.refetchRoomSuper({ id: roomId }),
                    client.refetchRoomChat({ id: roomId }),
                ]);
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
                            <XView marginHorizontal={-24}>
                                <RadioButtonsSelect
                                    selectOptions={[
                                        { label: 'Public', value: SharedRoomKind.PUBLIC },
                                        { label: 'Private', value: SharedRoomKind.GROUP },
                                    ]}
                                    {...visibilityField.input}
                                    disableHorizontalPadding={true}
                                    paddingHorizontal={24}
                                    withCorners={true}
                                />
                            </XView>
                        </FormSection>
                        <FormSection title={`Featured ${props.isChannel ? 'channel' : 'group'}`}>
                            <XView marginHorizontal={-24}>
                                <RadioButtonsSelect
                                    selectOptions={[
                                        { label: 'Yes', value: 'true' },
                                        { label: 'No', value: 'false' },
                                    ]}
                                    {...featuredField.input}
                                    disableHorizontalPadding={true}
                                    paddingHorizontal={24}
                                    withCorners={true}
                                />
                            </XView>
                        </FormSection>
                        <FormSection title="Gift">
                            <XView marginHorizontal={-24}>

                                <USelectField
                                    label="Sticker pack"
                                    options={stickerPacks}
                                    field={stickerField}
                                    optionRender={(item) => (
                                        <XView
                                            flexDirection="row"
                                            flexGrow={1}
                                            paddingHorizontal={16}
                                            paddingVertical={8}
                                        >
                                            <XImage
                                                src={`https://ucarecdn.com/${item.imageId}/-/format/png/`}
                                                width={40}
                                                height={40}
                                            />
                                            <XView marginLeft={16}>
                                                <XView {...TextStyles.Body} color="var(--foregroundPrimary)">{item.label}</XView>
                                                <XView {...TextStyles.Subhead} color="var(--foregroundSecondary)">{plural(item.count, ['sticker', 'stickers'])}</XView>
                                            </XView>
                                        </XView>
                                    )}
                                    searchable={true}
                                    paddingHorizontal={24}
                                    useMenuPortal={true}
                                />
                            </XView>
                        </FormSection>
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

export const showSuperAdminSettingsModal = (
    {
        roomId,
        roomSuperId,
        isChannel,
    }: {
        roomId: string;
        roomSuperId: string;
        isChannel: boolean;
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
                isChannel={isChannel}
                hide={ctx.hide}
            />
        ),
    );
};

interface RoomEditModalSuperAdminTileProps {
    roomId: string;
    kind: SharedRoomKind;
    isChannel: boolean;
}

export const RoomEditModalSuperAdminTile = React.memo(
    ({ roomId, kind, isChannel }: RoomEditModalSuperAdminTileProps) => {
        const client = useClient();
        const { roomSuper } = client.useRoomSuper({ id: roomId });

        if (!roomSuper) {
            return null;
        }

        return (
            <UListItem
                title="Superadmin settings"
                icon={<IcLock24 />}
                paddingHorizontal={24}
                onClick={() =>
                    showSuperAdminSettingsModal(
                        { roomId, roomSuperId: roomSuper.id, isChannel },
                        {
                            visibility: kind,
                            featured: roomSuper.featured,
                            giftStickerPackId: roomSuper.giftStickerPackId
                        },
                    )
                }
                textRight={'Custom'}
            />
        );
    },
);
