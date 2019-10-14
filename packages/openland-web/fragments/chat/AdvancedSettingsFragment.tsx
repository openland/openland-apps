import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { TextBody, TextLabel1, TextTitle3 } from 'openland-web/utils/TextStyles';

const sectionStyle = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    margin-bottom: 20px;
`;

const titleStyle = css`
    height: 28px;
    color: var(--foregroundPrimary);
    padding-left: 16px;
`;

const descriptionStyle = css`
    color: var(--foregroundPrimary);
    max-width: 260px;
    padding-left: 16px;
`;

const imageUploadStyle = css`
    margin-left: 16px;
    margin-top: 16px;
    & > .avatar-container {
        width: 240px;
        height: 120px
        border-radius: 8px;
    }
`;

const userOptionContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

const userNameStyle = css`
    color: var(--foregroundPrimary);
    margin-left: 16px;
`;

interface OptionType<T = string> {
    value: T;
    label: string;
    photo?: string | null;
}

const OptionRender = (option: OptionType) => {
    return (
        <div className={userOptionContainer}>
            <UAvatar id={option.value} photo={option.photo} title={option.label} />
            <div className={cx(userNameStyle, TextLabel1)}>{option.label}</div>
        </div>
    );
};

export const AdvancedSettingsFragment = () => {
    const form = useForm();
    const client = useClient();
    const unicorn = useUnicorn();
    const chatId = unicorn.id;
    const rawGroup = client.useRoom({ id: chatId }).room;

    const group = rawGroup && rawGroup.__typename === 'SharedRoom' ? rawGroup : undefined;

    if (!group) {
        return null;
    }
    if (!group.welcomeMessage) {
        return null;
    }

    const [welcomeMessageEnabled, setWelcomeMessageEnabled] = React.useState(
        group.welcomeMessage.isOn,
    );
    const [matchmakingEnabled, setMatchmakingEnabled] = React.useState(
        group.matchmaking ? group.matchmaking.enabled : false,
    );

    const [socialImageChat] = React.useState(
        group.socialImage
            ? { uuid: group.socialImage, crop: { w: 240, h: 120, x: 1, y: 1 } }
            : null,
    );

    const socialImageField = useField<StoredFileT | undefined | null>(
        'socialImageRef',
        socialImageChat,
        form,
    );

    const welcomeMessageText =
        group.welcomeMessage && group.welcomeMessage.message ? group.welcomeMessage.message : '';

    const welcomeMessageField = useField('welcomeMessageText', welcomeMessageText, form);

    const welcomeMessageSenderField = useField<string | null>(
        'welcomeMessageText',
        group.welcomeMessage.sender ? group.welcomeMessage.sender.id : null,
        form,
    );
    const roomAdmins = client.useRoomOrganizationAdminMembers({ id: chatId });

    const sendersOption = getWelcomeMessageSenders({
        chat: group,
        admins: (
            (roomAdmins &&
                roomAdmins.room &&
                roomAdmins.room.__typename === 'SharedRoom' &&
                roomAdmins.room.organization &&
                roomAdmins.room.organization.adminMembers) ||
            []
        ).map(a => a.user),
    });

    const handleSave = () =>
        form.doAction(async () => {
            await client.mutateUpdateWelcomeMessage({
                roomId: chatId,
                welcomeMessageIsOn: welcomeMessageEnabled,
                welcomeMessageSender: welcomeMessageSenderField
                    ? welcomeMessageSenderField.value
                    : undefined,
                welcomeMessageText: welcomeMessageField.value,
            });
            await client.mutateMatchmakingRoomSave({
                peerId: chatId,
                input: {
                    enabled: matchmakingEnabled,
                },
            });
            await client.mutateRoomUpdate({
                roomId: chatId,
                input: {
                    ...(socialImageField.value && socialImageField.value !== socialImageChat
                        ? {
                              socialImageRef: {
                                  uuid: socialImageField.value.uuid,
                                  crop: socialImageField.value.crop || null,
                              },
                          }
                        : {}),
                },
            });
            await client.refetchRoom({ id: chatId });
        });

    return (
        <Page track="advanced_settings" padded={true}>
            <UHeader title="Advanced settings" />
            <div className={sectionStyle}>
                <UCheckbox
                    label="Welcome message"
                    checked={welcomeMessageEnabled}
                    onChange={setWelcomeMessageEnabled}
                    asSwitcher={true}
                    boldTitle={true}
                />
                <div className={cx(descriptionStyle, TextBody)}>
                    Send an automatic message in 1:1 chat to every new member who joins this group
                </div>
                {welcomeMessageEnabled && (
                    <XView marginTop={16} maxWidth={400}>
                        <USelectField
                            field={welcomeMessageSenderField as any}
                            creatable={false}
                            multi={false}
                            placeholder="Sender"
                            optionRenderer={OptionRender}
                            options={sendersOption.map(i => ({
                                value: i.id,
                                label: i.name,
                                photo: i.photo,
                            }))}
                        />
                        <UTextAreaField
                            field={welcomeMessageField}
                            placeholder="Text message"
                            height={160}
                            marginTop={12}
                        />
                        {!!form.error && (
                            <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                                {form.error}
                            </XView>
                        )}
                    </XView>
                )}
            </div>
            <div className={sectionStyle}>
                <UCheckbox
                    label="Member profiles"
                    checked={matchmakingEnabled}
                    onChange={setMatchmakingEnabled}
                    asSwitcher={true}
                    boldTitle={true}
                />
                <div className={cx(descriptionStyle, TextBody)}>
                    Some description about this feature
                </div>
            </div>
            <div className={sectionStyle}>
                <div className={cx(titleStyle, TextTitle3)}>Social sharing image</div>
                <div className={cx(descriptionStyle, TextBody)}>
                    Choose an image to display when sharing invite to this group on social networks
                </div>
                <UAvatarUploadField
                    field={socialImageField}
                    cropParams="16:9"
                    className={imageUploadStyle}
                />
            </div>
            <UButton
                action={handleSave}
                text="Save changes"
                size="large"
                square={true}
                marginLeft={16}
                marginTop={16}
                marginBottom={20}
                alignSelf="flex-start"
            />
        </Page>
    );
};
