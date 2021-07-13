import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { TextBody, TextLabel1, TextTitle3 } from 'openland-web/utils/TextStyles';
import { TabRouterContextProps } from 'openland-unicorn/components/TabLayout';
import { showModalBox } from 'openland-x/showModalBox';
import {
    RoomChat_room_SharedRoom,
    RoomChat_room_SharedRoom_premiumSubscription,
    RoomChat_room_SharedRoom_welcomeMessage,
    SharedRoomKind,
    UserShort,
    WalletSubscriptionInterval, WalletSubscriptionState,
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
import { UCheckbox, UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { MentionItemComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { DistributionType, GroupPriceSettings } from '../../create/CreateEntityFragment';
import { trackEvent } from 'openland-x-analytics';
import IcAt from 'openland-icons/s/ic-at-24.svg';
import IcWallet from 'openland-icons/s/ic-wallet-24.svg';
import IcGallery from 'openland-icons/s/ic-gallery-24.svg';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
import IcReply from 'openland-icons/s/ic-reply-24.svg';
import IcCall from 'openland-icons/s/ic-call-24.svg';
import IcChannel from 'openland-icons/s/ic-channel-24.svg';
import { modalSubtitle } from './groupProfileModals/shared';
import { getCallSettingsShortLabel, showGroupCallsModal } from './groupProfileModals/groupCalls';
import {
    getServiceMessagesSettingsShortLabel,
    showServiceMessagesModal,
} from './groupProfileModals/serviceMessages';
import { RoomEditModalSuperAdminTile } from './groupProfileModals/superAdminSettings';

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
            await client.mutateSetRoomShortname({
                id: props.roomId,
                shortname: shortnameField.value,
            });
            await client.refetchRoomChat({ id: props.roomId });
            props.hide();
        });
    };
    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>
                    Choose a shortname so other people can find and mention your group
                </div>
                <UInputField
                    autofocus={true}
                    label="Shortname"
                    field={shortnameField}
                    remark={
                        form.error ? undefined : 'Only a-z, 0-9 and underscores, at least 3 chars'
                    }
                    errorText={form.error ? form.error : undefined}
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
        &::after {
            border-radius: 8px;
        }
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
            if (!imageField.value) {
                await client.mutateRoomUpdate({
                    roomId: props.roomId,
                    input: {
                        socialImageRef: null,
                    },
                });
                await client.refetchRoomChat({ id: props.roomId });
            }
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
                        Choose an image for sharing invite to the group on social networks
                    </div>
                    <UAvatarUploadField
                        field={imageField}
                        cropParams="16:9"
                        className={socialImageUploadStyle}
                        hideImageIndicator={true}
                        clearable={true}
                    />
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

interface PaymentsModalBodyProps {
    roomId: string;
    hide: () => void;
}

const PaymentsModalBody = React.memo((props: PaymentsModalBodyProps) => {
    const form = useForm();

    const distributionField = useField<DistributionType>(
        'input.distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<string>('input.price', '1', form, [
        {
            checkIsValid: (x) => {
                return /^[0-9]*$/.test(x);
            },
            text: 'Numbers only',
        },
        {
            checkIsValid: (x) => {
                return Number(x) <= 1000;
            },
            text: '$1000 maximum',
        },
        {
            checkIsValid: (x) => {
                return Number(x) >= 1;
            },
            text: '$1 minimum',
        },
    ]);
    const intervalField = useField<WalletSubscriptionInterval | null>('input.interval', null, form);

    const onSave = async () => {
        props.hide();
    };
    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        Set up monetization of your group. All changes will affect only new members
                    </div>
                    <XView minHeight={250}>
                        <GroupPriceSettings
                            distributionField={distributionField}
                            priceField={priceField}
                            intervalField={intervalField}
                        />
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

const showPaymentsModal = (roomId: string) => {
    showModalBox(
        {
            width: 400,
            title: 'Payments',
        },
        (ctx) => <PaymentsModalBody roomId={roomId} hide={ctx.hide} />,
    );
};

const welcomeMessageSwitchContainer = css`
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

const OptionRender = (option: OptionType) => (
    <MentionItemComponent
        id={option.user.id}
        photo={option.user.photo}
        title={option.user.name}
    />
);

const WelcomeMessageModalBody = React.memo((props: WelcomeMessageModalBodyProps) => {
    const { welcomeMessage } = props;
    const selectRef = React.useRef<HTMLInputElement>(null);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const client = useClient();
    const form = useForm();

    const [enabled, setEnabled] = React.useState(welcomeMessage.isOn);

    const roomAdmins = client.useRoomAdminMembers({ roomId: props.roomId }, { fetchPolicy: 'cache-and-network' }).roomAdmins;

    const messageField = useField('welcomeMessageText', welcomeMessage.message || '', form);

    const messageSenderField = useField<string | null>(
        'welcomeMessageText',
        welcomeMessage.sender ? welcomeMessage.sender.id : null,
        form,
    );

    const onSave = async () => {
        await form.doAction(async () => {
            if (enabled && !messageSenderField.value) {
                if (selectRef && selectRef.current) {
                    selectRef.current.focus();
                }
                return;
            }
            if (enabled && !messageField.value.trim()) {
                if (inputRef && inputRef.current) {
                    inputRef.current.focus();
                }
                return;
            }
            await client.mutateUpdateWelcomeMessage({
                roomId: props.roomId,
                welcomeMessageIsOn: enabled,
                welcomeMessageSender: messageSenderField ? messageSenderField.value : undefined,
                welcomeMessageText: messageField.value.trim(),
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
                    <div
                        className={welcomeMessageSwitchContainer}
                        onClick={() => setEnabled(!enabled)}
                    >
                        <UCheckbox label="Welcome message" checked={enabled} asSwitcher={true} />
                    </div>
                    {enabled && (
                        <XView flexGrow={1} flexShrink={1} marginTop={16}>
                            <USelectField
                                ref={selectRef}
                                label="Sender"
                                field={messageSenderField}
                                optionRender={OptionRender}
                                useMenuPortal={true}
                                options={roomAdmins.map((u) => ({
                                    value: u.user.id,
                                    label: u.user.name,
                                    user: u.user,
                                }))}
                            />
                            <UTextAreaField
                                ref={inputRef}
                                field={messageField}
                                placeholder="Message"
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

interface EnableRepliesModalBodyProps {
    roomId: string;
    initialValue: boolean;
    hide: () => void;
}

const EnableRepliesModalBody = React.memo((props: EnableRepliesModalBodyProps) => {
    const { roomId, initialValue, hide } = props;

    const client = useClient();
    const form = useForm();

    const enableRepliesField = useField('enableReplies', initialValue, form);

    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateRoomUpdate({
                roomId,
                input: {
                    repliesEnabled: enableRepliesField.value,
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
                        Choose whether to allow replies in group
                    </div>
                    <XView marginHorizontal={-24}>
                        <UCheckboxFiled
                            label="Allow replies"
                            field={enableRepliesField}
                            asSwitcher={true}
                            disableHorizontalPadding={true}
                            paddingHorizontal={24}
                            withCorners={true}
                        />
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

const showEnableRepliesModal = (roomId: string, initialValue: boolean) => {
    showModalBox(
        {
            width: 400,
            title: 'Replies',
        },
        (ctx) => (
            <EnableRepliesModalBody roomId={roomId} initialValue={initialValue} hide={ctx.hide} />
        ),
    );
};

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
        repliesEnabled,
        callSettings,
        serviceMessageSettings,
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
                    />
                    {!isShared && <SecretLabel />}
                    <div className={cx(formTitle, TextTitle3)}>Settings</div>
                    <XView marginHorizontal={-24}>
                        {isShared && (
                            <UListItem
                                title="Shortname"
                                icon={<IcAt />}
                                paddingHorizontal={24}
                                onClick={() => showShortnameModal(room.id, shortname || '')}
                                textRight={shortname || 'None'}
                            />
                        )}
                        <XWithRole role="super-admin">
                            <UListItem
                                title="Payments"
                                icon={<IcWallet />}
                                paddingHorizontal={24}
                                onClick={() => showPaymentsModal(room.id)}
                                textRight={
                                    premiumSettings
                                        ? formatMoneyInterval(
                                              premiumSettings.price,
                                              premiumSettings.interval,
                                          )
                                        : 'Free'
                                }
                            />
                        </XWithRole>
                        <UListItem
                            title="Social sharing image"
                            icon={<IcGallery />}
                            paddingHorizontal={24}
                            onClick={() => showSocialImageModal(room.id, socialImage || '')}
                            textRight={!!socialImage ? 'On' : 'None'}
                        />
                        {welcomeMessage && (
                            <UListItem
                                title="Welcome message"
                                icon={<IcMessage />}
                                paddingHorizontal={24}
                                onClick={() => showWelcomeMessageModal(room.id, welcomeMessage)}
                                textRight={welcomeMessage.isOn ? 'On' : 'Off'}
                            />
                        )}
                        {!room.isChannel && (
                            <>
                                <UListItem
                                    title="Replies"
                                    icon={<IcReply />}
                                    paddingHorizontal={24}
                                    onClick={() => showEnableRepliesModal(room.id, repliesEnabled)}
                                    textRight={repliesEnabled ? 'On' : 'Off'}
                                />
                                <UListItem
                                    title="Service messages"
                                    icon={<IcChannel />}
                                    paddingHorizontal={24}
                                    onClick={() =>
                                        showServiceMessagesModal(room.id, {
                                            joinsMessageEnabled:
                                                serviceMessageSettings.joinsMessageEnabled,
                                            leavesMessageEnabled:
                                                serviceMessageSettings.leavesMessageEnabled,
                                        })
                                    }
                                    textRight={getServiceMessagesSettingsShortLabel(
                                        serviceMessageSettings,
                                    )}
                                />
                                <UListItem
                                    title="Group calls"
                                    icon={<IcCall />}
                                    paddingHorizontal={24}
                                    onClick={() =>
                                        showGroupCallsModal(room.id, {
                                            mode: callSettings.mode,
                                            callLink: callSettings.callLink || '',
                                        })
                                    }
                                    textRight={getCallSettingsShortLabel(callSettings)}
                                />
                            </>
                        )}
                        <XWithRole role="super-admin">
                            <RoomEditModalSuperAdminTile
                                kind={kind}
                                roomId={room.id}
                                isChannel={room.isChannel}
                            />
                        </XWithRole>
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
                    text="Save"
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
    const { room } = client.useRoomChat({ id: chatId });
    return <RoomEditModalBody onClose={hide} room={room as RoomChat_room_SharedRoom} />;
};

export const showRoomEditModal = (chatId: string, isChannel: boolean) => {
    trackEvent(`navigate_group_profile_edit`);
    showModalBox(
        {
            width: 480,
            title: isChannel ? 'Edit channel' : 'Edit group',
        },
        (ctx) => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
    );
};

export const showLeaveChatConfirmation = (
    client: OpenlandClient,
    chatId: string,
    tabRouter: TabRouterContextProps,
    isPremium?: boolean,
    isPublic?: boolean,
    isChannel?: boolean,
    premiumSubscription?:  RoomChat_room_SharedRoom_premiumSubscription | null,
) => {
    const builder = new AlertBlanketBuilder();
    const shouldCancelSubscription = isPremium && premiumSubscription &&
        ![WalletSubscriptionState.CANCELED, WalletSubscriptionState.EXPIRED].includes(premiumSubscription.state);

    builder
        .title(isChannel ? 'Leave channel' : 'Leave group')
        .message(
            isPremium
                ? 'Leaving the group will cancel your subscription to it. Are you sure?'
                : isPublic
                ? 'Are you sure you want to leave?'
                : 'Are you sure you want to leave? You will need to request access to join it again in the future.',
        )
        .action(
            'Leave',
            async () => {
                if (shouldCancelSubscription) {
                    await client.mutateCancelSubscription({ id: premiumSubscription!.id });
                    await client.refetchSubscriptions();
                }
                await client.mutateRoomLeave({ roomId: chatId });
                await client.refetchRoomChat({ id: chatId });
                if (tabRouter.router.currentTab === 0) {
                    tabRouter.router.reset('/rooms');
                } else {
                    tabRouter.router.navigate('/mail');
                }
            },
            'danger',
        )
        .show();
};

const DeleteChatComponent = React.memo(
    (props: { chatId: string; userName: string; hide: () => void }) => {
        const client = useClient();

        const onDelete = React.useCallback(async () => {
            await client.mutateChatDelete({ chatId: props.chatId, oneSide: true });
            props.hide();
        }, []);

        return (
            <>
                <XModalContent>
                    <div>Are you sure you want to delete conversation? This cannot be undone.</div>
                </XModalContent>
                <XModalFooter>
                    <UButton
                        text="Cancel"
                        style="tertiary"
                        size="large"
                        onClick={() => props.hide()}
                    />
                    <UButton text="Delete" style="danger" size="large" action={onDelete} />
                </XModalFooter>
            </>
        );
    },
);

export const showDeleteChatConfirmation = (chatId: string, userName: string) => {
    showModalBox(
        {
            title: 'Delete conversation',
        },
        (ctx) => <DeleteChatComponent chatId={chatId} hide={ctx.hide} userName={userName} />,
    );
};
