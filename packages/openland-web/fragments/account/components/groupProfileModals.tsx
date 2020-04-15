import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { TextTitle3, TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { TabRouterContextProps } from 'openland-unicorn/components/TabLayout';
import { showModalBox } from 'openland-x/showModalBox';
import {
    RoomChat_room_SharedRoom,
    RoomChat_room_SharedRoom_welcomeMessage,
    SharedRoomKind,
    UserShort,
} from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { OpenlandClient } from 'openland-api/spacex';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { trackEvent } from 'openland-x-analytics';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import IcAt from 'openland-icons/s/ic-at-24.svg';
import IcWallet from 'openland-icons/s/ic-wallet-24.svg';
import IcGallery from 'openland-icons/s/ic-gallery-24.svg';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
// import IcClear from 'openland-icons/s/ic-clear-16.svg';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

interface ShortnameModalBodyProps {
    roomId: string;
    shortname: string;
    hide: () => void;
}

const ShortnameModalBody = React.memo((props: ShortnameModalBodyProps) => {
    const client = useClient();
    const form = useForm();
    const shortnameField = useShortnameField('input.shortname', props.shortname || '', form);
    const onSave = async () => {
        await form.doAction(async () => {
            if (shortnameField.value && shortnameField.value !== props.shortname) {
                await client.mutateSetRoomShortname({
                    id: props.roomId,
                    shortname: shortnameField.value,
                });
                await client.refetchRoomChat({ id: props.roomId });
            }
            props.hide();
        });
    };
    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>
                    {`Choose a shortname so other people can find and mention your group`}
                </div>
                <UInputField
                    label="Shortname"
                    field={shortnameField}
                    remark="Only a-z, 0-9 and underscores, 3 chars min"
                />
            </XModalContent>
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

const showShortnameModal = (roomId: string, shortname: string) => {
    showModalBox(
        {
            width: 400,
            title: 'Shortname',
        },
        (ctx) => <ShortnameModalBody roomId={roomId} shortname={shortname} hide={ctx.hide} />,
    );
};

const socialImageUploadStyle = css`
    & > .avatar-container {
        width: 352px;
        height: 184px;
        border-radius: 8px;
    }
`;

interface SocialImageModalBodyProps {
    roomId: string;
    image: string;
    hide: () => void;
}

const SocialImageModalBody = React.memo((props: SocialImageModalBodyProps) => {
    const client = useClient();
    const form = useForm();
    const imageField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        { uuid: props.image } as any,
        form,
    );
    const onSave = async () => {
        await form.doAction(async () => {
            if (imageField.value?.uuid !== props.image) {
                await client.mutateRoomUpdate({
                    roomId: props.roomId,
                    input: {
                        ...{
                            socialImageRef: imageField.value
                                ? sanitizeImageRef(imageField.value)
                                : null,
                        },
                    },
                });
                await client.refetchRoomChat({ id: props.roomId });
            }
            props.hide();
        });
    };
    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        {`Choose an image for sharing invite to the group on social networks`}
                    </div>
                    <XView position="relative">
                        <UAvatarUploadField
                            field={imageField}
                            cropParams="16:9"
                            className={socialImageUploadStyle}
                            hideImageIndicator={true}
                        />
                        {/*{!!imageField.value?.uuid && (*/}
                        {/*    <XView*/}
                        {/*        width={56}*/}
                        {/*        height={56}*/}
                        {/*        position="absolute"*/}
                        {/*        right={0}*/}
                        {/*        top={0}*/}
                        {/*        justifyContent="center"*/}
                        {/*        alignItems="center"*/}
                        {/*        cursor="pointer"*/}
                        {/*        onClick={() => imageField.input.onChange(null)}*/}
                        {/*    >*/}
                        {/*        <UIcon icon={<IcClear />} size={24} color="#fff" />*/}
                        {/*    </XView>*/}
                        {/*)}*/}
                    </XView>
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

const showSocialImageModal = (roomId: string, image: string) => {
    showModalBox(
        {
            width: 400,
            title: 'Social sharing image',
        },
        (ctx) => <SocialImageModalBody roomId={roomId} image={image} hide={ctx.hide} />,
    );
};

interface WelcomeMessageModalBodyProps {
    hide: () => void;
    roomId: string;
    welcomeMessage: RoomChat_room_SharedRoom_welcomeMessage;
}

interface OptionType<T = string> {
    value: T;
    label: string;
    user: UserShort;
}

const OptionRender = (option: OptionType) => {
    return <UUserView user={option.user} />;
};

const WelcomeMessageModalBody = React.memo((props: WelcomeMessageModalBodyProps) => {
    const { welcomeMessage } = props;
    const client = useClient();
    const form = useForm();

    const [enabled, setEnabled] = React.useState(welcomeMessage.isOn);

    const roomAdmins = client.useRoomAdminMembers({ roomId: props.roomId }).roomAdmins;

    const messageField = useField('welcomeMessageText', welcomeMessage.message || '', form);

    const messageSenderField = useField<string | null>(
        'welcomeMessageText',
        welcomeMessage.sender ? welcomeMessage.sender.id : null,
        form,
    );

    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateUpdateWelcomeMessage({
                roomId: props.roomId,
                welcomeMessageIsOn: enabled,
                welcomeMessageSender: messageSenderField ? messageSenderField.value : undefined,
                welcomeMessageText: messageField.value,
            });
            await client.refetchRoomChat({ id: props.roomId });
            props.hide();
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        {`Send automatic tet-a-tet message to every new member of the group`}
                    </div>
                    <XView marginHorizontal={-16}>
                        <UCheckbox
                            label="Welcome message"
                            checked={enabled}
                            onChange={setEnabled}
                            asSwitcher={true}
                        />
                    </XView>
                    {enabled && (
                        <XView flexGrow={1} flexShrink={1} marginTop={16}>
                            <USelectField
                                creatable={false}
                                multi={false}
                                placeholder="Sender"
                                field={messageSenderField as any}
                                optionRenderer={OptionRender}
                                options={roomAdmins.map((u) => ({
                                    value: u.user.id,
                                    label: u.user.name,
                                    user: u.user,
                                }))}
                            />
                            <UTextAreaField
                                field={messageField}
                                placeholder="Message"
                                marginTop={16}
                                autoResize={true}
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

const showWelcomeMessageModal = (
    roomId: string,
    welcomeMessage: RoomChat_room_SharedRoom_welcomeMessage,
) => {
    showModalBox(
        {
            width: 400,
            title: 'Welcome message',
        },
        (ctx) => (
            <WelcomeMessageModalBody
                roomId={roomId}
                welcomeMessage={welcomeMessage}
                hide={ctx.hide}
            />
        ),
    );
};

const listRightTextStyle = css`
    color: var(--tintGrey);
    margin-right: 8px;
`;

const UListRightText = React.memo((props: { text: string }) => (
    <div className={cx(listRightTextStyle, TextBody)}>{props.text}</div>
));

const secretContainer = css`
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
`;

const secretLabel = css`
    margin-left: 8px;
    color: var(--foregroundTertiary);
`;

const SecretLabel = React.memo(() => (
    <div className={secretContainer}>
        <UIcon icon={<IcLock />} color="var(--foregroundTertiary)" />
        <div className={cx(secretLabel, TextLabel1)}>It’s a secret group</div>
    </div>
));

type RoomEditModalT = {
    room: RoomChat_room_SharedRoom;
    onClose: () => void;
};

const formTitle = css`
    height: 48px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: var(--foregroundPrimary);
`;

const RoomEditModalBody = React.memo((props: RoomEditModalT & { onClose: Function }) => {
    const { room } = props;
    const {
        title,
        photo,
        kind,
        description,
        shortname,
        premiumSettings,
        socialImage,
        welcomeMessage,
    } = room;
    const client = useClient();
    const form = useForm();

    const isShared = kind === SharedRoomKind.PUBLIC;

    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        { uuid: photo } as any,
        form,
    );
    const titleField = useField('input.title', title || '', form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter chat name',
        },
    ]);
    const descriptionField = useField('input.description', description || '', form);

    const onSubmit = async () => {
        await form.doAction(async () => {
            const dataToSend = {
                roomId: room.id,
                input: {
                    ...{ title: titleField.value.trim() },
                    ...{ description: descriptionField.value },
                    ...(avatarField.value && avatarField.value.uuid !== photo
                        ? { photoRef: sanitizeImageRef(avatarField.value) }
                        : {}),
                },
            };
            await client.mutateRoomUpdate(dataToSend);
            await client.refetchRoomChat({ id: room.id });
            props.onClose();
        });
    };
    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <XView alignSelf="center" marginTop={12}>
                        <UAvatarUploadField field={avatarField} />
                    </XView>
                    <div className={cx(formTitle, TextTitle3)}>Info</div>
                    <UInputField label="Name" field={titleField} />
                    <UTextAreaField
                        field={descriptionField}
                        placeholder="Description"
                        marginTop={16}
                        marginBottom={16}
                        autoResize={true}
                    />
                    {!isShared && <SecretLabel />}
                    <div className={cx(formTitle, TextTitle3)}>Advanced</div>
                    <XView marginHorizontal={-24}>
                        {isShared && (
                            <UListItem
                                title="Shortname"
                                icon={<IcAt />}
                                paddingHorizontal={24}
                                onClick={() => showShortnameModal(room.id, shortname || '')}
                                rightElement={<UListRightText text={shortname || 'None'} />}
                            />
                        )}
                        <UListItem
                            title="Payments"
                            icon={<IcWallet />}
                            paddingHorizontal={24}
                            // onClick={() => showShortnameModal(room.id, shortname || '')}
                            rightElement={
                                <UListRightText
                                    text={
                                        premiumSettings
                                            ? formatMoneyInterval(
                                                  premiumSettings.price,
                                                  premiumSettings.interval,
                                              )
                                            : 'Free'
                                    }
                                />
                            }
                        />
                        {isShared && (
                            <UListItem
                                title="Social sharing image"
                                icon={<IcGallery />}
                                paddingHorizontal={24}
                                onClick={() => showSocialImageModal(room.id, socialImage || '')}
                                rightElement={
                                    <UListRightText text={!!socialImage ? 'On' : 'Off'} />
                                }
                            />
                        )}
                        {welcomeMessage && (
                            <UListItem
                                title="Welcome message"
                                icon={<IcMessage />}
                                paddingHorizontal={24}
                                onClick={() => showWelcomeMessageModal(room.id, welcomeMessage)}
                                rightElement={
                                    <UListRightText text={welcomeMessage.isOn ? 'On' : 'Off'} />
                                }
                            />
                        )}
                    </XView>
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => props.onClose()}
                />
                <UButton
                    text="Done"
                    style="primary"
                    size="large"
                    onClick={onSubmit}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
});

const RoomEditModal = ({ chatId, hide }: { chatId: string; hide: () => void }) => {
    const client = useClient();
    const data = client.useRoomChat({ id: chatId }).room;
    let chat = data as RoomChat_room_SharedRoom;
    return <RoomEditModalBody onClose={hide} room={chat} />;
};

export const showRoomEditModal = (chatId: string, isChannel: boolean) => {
    trackEvent(`navigate_group_profile_edit`);
    showModalBox(
        {
            width: 480,
            title: isChannel ? 'Manage channel' : 'Manage group',
        },
        (ctx) => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
    );
};

export const showLeaveChatConfirmation = (
    client: OpenlandClient,
    chatId: string,
    tabRouter: TabRouterContextProps,
    isPremium?: boolean,
) => {
    const builder = new AlertBlanketBuilder();

    builder
        .title('Leave chat')
        .message(
            isPremium
                ? 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.'
                : 'Are you sure you want to leave? You will need to request access to join it again in the future.',
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
