import * as React from 'react';
import { XView } from 'react-mental';
import { TabRouterContextProps } from 'openland-unicorn/components/TabLayout';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { Room_room_SharedRoom, SharedRoomKind } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { OpenlandClient } from 'openland-api/spacex';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { trackEvent } from 'openland-x-analytics';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';

type RoomEditModalT = {
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    shortname: string | null;
    kind: SharedRoomKind;
    roomId: string;
    isChannel: boolean;
};

const RoomEditModalBody = (props: RoomEditModalT & { onClose: Function }) => {
    const client = useClient();
    const form = useForm();

    const editPhotoRef = props.photo;
    const initialShortname = props.shortname || '';
    const hasShortname = props.kind === SharedRoomKind.PUBLIC;

    const inputLable = props.isChannel ? 'Channel name' : 'Group name';
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        { uuid: props.photo } as any,
        form,
    );
    const titleField = useField('input.title', props.title || '', form, [
        {
            checkIsValid: value => !!value.trim(),
            text: 'Please enter chat name',
        },
    ]);
    const descriptionField = useField('input.description', props.description || '', form);
    const shortnameField = useShortnameField('input.shortname', initialShortname, form);
    const [errorText, setErrorText] = React.useState(form.error);
    React.useEffect(
        () => {
            setErrorText('');
        },
        [shortnameField.value],
    );
    React.useEffect(
        () => {
            setErrorText(form.error);
        },
        [form.error],
    );
    const onSubmit = async () => {
        await form.doAction(async () => {
            let newPhoto = avatarField.value;
            const dataToSend = {
                roomId: props.roomId,
                input: {
                    ...{ title: titleField.value.trim() },
                    ...{ description: descriptionField.value },
                    ...(newPhoto && newPhoto.uuid !== editPhotoRef
                        ? { photoRef: sanitizeImageRef(newPhoto) }
                        : {}),
                },
            };
            const shortnameData = {
                id: props.roomId,
                shortname: shortnameField.value,
            };
            const promises: Promise<any>[] = [client.mutateRoomUpdate(dataToSend)];
            if (hasShortname && shortnameField.value !== initialShortname) {
                promises.push(client.mutateSetRoomShortname(shortnameData));
            }

            await Promise.all(promises);
            await client.refetchRoomWithoutMembers({ id: props.roomId });
            props.onClose();
        });
    };
    return (
        <>
            <XView paddingHorizontal={24} paddingTop={12} paddingBottom={24}>
                <XView alignSelf="center">
                    <UAvatarUploadField field={avatarField} />
                </XView>
                <UInputField
                    label={inputLable}
                    field={titleField}
                    marginTop={24}
                    marginBottom={16}
                />
                <UInputField field={descriptionField} label="Description" marginBottom={16} />
                {hasShortname && (
                    <>
                        <UInputField label="Shortname" field={shortnameField} />
                        {!!errorText && (
                            <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                                {errorText}
                            </XView>
                        )}
                    </>
                )}
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => props.onClose()}
                />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSubmit}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
};

const RoomEditModal = ({ chatId, hide }: { chatId: string; hide: () => void }) => {
    const client = useClient();
    const data = client.useRoomWithoutMembers({ id: chatId });

    let chat = data.room as Room_room_SharedRoom;

    const sharedRoom = chat.__typename === 'SharedRoom' ? (chat as Room_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);

    if (!chat) {
        return <XLoader loading={true} />;
    }

    return (
        <RoomEditModalBody
            roomId={chat.id}
            title={chat.title}
            photo={chat.photo}
            description={chat.description}
            shortname={chat.shortname}
            kind={chat.kind}
            socialImage={chat.socialImage}
            isChannel={isChannel}
            onClose={hide}
        />
    );
};

export const showRoomEditModal = (chatId: string) => {
    trackEvent(`navigate_group_profile_edit`);
    showModalBox(
        {
            title: 'Edit group',
        },
        ctx => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
    );
};

export const showLeaveChatConfirmation = (
    client: OpenlandClient,
    chatId: string,
    tabRouter: TabRouterContextProps,
    isPremium?: boolean
) => {
    const builder = new AlertBlanketBuilder();

    builder.title('Leave chat')
        .message(
            isPremium ? 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.' :
                'Are you sure you want to leave? You will need to request access to join it again in the future.'
        )
        .action(
            'Leave',
            async () => {
                await client.mutateRoomLeave({ roomId: chatId });
                await client.refetchRoomChat({ id: chatId });
                if (tabRouter.router.currentTab === 0) {
                    tabRouter.router.reset('/discover');
                } else {
                    tabRouter.router.navigate('/mail');
                }
            },
            'danger',
        )
        .show();
};
