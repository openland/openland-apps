import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-api/useClient';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { UpdateSettingsInput, NotificationPreview } from 'openland-api/spacex.types';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { debounce } from 'openland-y-utils/timer';
import { UCheckbox, UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';

export const SettingsNotificationsFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const settings = client.useSettings({ fetchPolicy: 'network-only' }).settings;

    const directShowNotification = useField(
        'input.desktop.direct.showNotification',
        settings.desktop.direct.showNotification,
        form,
    );
    const directSound = useField('input.desktop.direct.sound', settings.desktop.direct.sound, form);
    const secretChatShowNotification = useField(
        'input.desktop.secretChat.showNotification',
        settings.desktop.secretChat.showNotification,
        form,
    );
    const secretChatSound = useField(
        'input.desktop.secretChat.sound',
        settings.desktop.secretChat.sound,
        form,
    );
    const organizationChatShowNotification = useField(
        'input.desktop.organizationChat.showNotification',
        settings.desktop.organizationChat.showNotification,
        form,
    );
    const organizationChatSound = useField(
        'input.desktop.organizationChat.sound',
        settings.desktop.organizationChat.sound,
        form,
    );
    const communityChatShowNotification = useField(
        'input.desktop.communityChat.showNotification',
        settings.desktop.communityChat.showNotification,
        form,
    );
    const communityChatSound = useField(
        'input.desktop.communityChat.sound',
        settings.desktop.communityChat.sound,
        form,
    );
    const commentsShowNotification = useField(
        'input.desktop.comments.showNotification',
        settings.desktop.comments.showNotification,
        form,
    );
    const commentsSound = useField(
        'input.desktop.comments.sound',
        settings.desktop.comments.sound,
        form,
    );
    const notificationPreview = useField(
        'input.desktop.notificationPreview',
        settings.desktop.notificationPreview,
        form,
    );
    const excludeMutedChats = useField('input.excludeMutedChats', settings.excludeMutedChats, form);
    const countUnreadChats = useField('input.countUnreadChats', settings.countUnreadChats, form);

    const doConfirm = (input: UpdateSettingsInput) => {
        client.mutateSettingsUpdate({ input });
    };

    const doConfirmDebounced = React.useRef<null | ((input: UpdateSettingsInput) => void)>();
    React.useEffect(() => {
        doConfirmDebounced.current = debounce(doConfirm, 1000);
    }, []);
    React.useEffect(
        () => {
            if (doConfirmDebounced.current) {
                doConfirmDebounced.current({
                    excludeMutedChats: excludeMutedChats.value,
                    countUnreadChats: countUnreadChats.value,

                    desktop: {
                        direct: {
                            showNotification: directShowNotification.value,
                            sound: directSound.value,
                        },
                        secretChat: {
                            showNotification: secretChatShowNotification.value,
                            sound: secretChatSound.value,
                        },
                        organizationChat: {
                            showNotification: organizationChatShowNotification.value,
                            sound: organizationChatSound.value,
                        },
                        communityChat: {
                            showNotification: communityChatShowNotification.value,
                            sound: communityChatSound.value,
                        },
                        comments: {
                            showNotification: commentsShowNotification.value,
                            sound: commentsSound.value,
                        },
                        notificationPreview: notificationPreview.value,
                    },
                });
            }
        },
        [
            excludeMutedChats.value,
            countUnreadChats.value,
            directShowNotification.value,
            directSound.value,
            secretChatShowNotification.value,
            secretChatSound.value,
            organizationChatShowNotification.value,
            organizationChatSound.value,
            communityChatShowNotification.value,
            communityChatSound.value,
            commentsShowNotification.value,
            commentsSound.value,
            notificationPreview.value,
        ],
    );

    return (
        <Page track="account_notifications">
            <UHeader title="Notifications" />
            <FormWrapper>
                <FormSection title="Direct messages">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Show notifications"
                            field={directShowNotification}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled label="Sound" field={directSound} asSwitcher={true} />
                    </XView>
                </FormSection>
                <FormSection title="Secret groups messages">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Show notifications"
                            field={secretChatShowNotification}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled label="Sound" field={secretChatSound} asSwitcher={true} />
                    </XView>
                </FormSection>
                <FormSection title="Organization groups messages">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Show notifications"
                            field={organizationChatShowNotification}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled
                            label="Sound"
                            field={organizationChatSound}
                            asSwitcher={true}
                        />
                    </XView>
                </FormSection>
                <FormSection title="Community groups messages">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Show notifications"
                            field={communityChatShowNotification}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled
                            label="Sound"
                            field={communityChatSound}
                            asSwitcher={true}
                        />
                    </XView>
                </FormSection>
                <FormSection title="New comments">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Show notifications"
                            field={commentsShowNotification}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled label="Sound" field={commentsSound} asSwitcher={true} />
                    </XView>
                </FormSection>
                <FormSection title="Notifications preview">
                    <XView marginHorizontal={-16}>
                        <RadioButtonsSelect
                            {...notificationPreview.input}
                            selectOptions={[
                                {
                                    value: NotificationPreview.NAME_TEXT,
                                    label: 'Show name and text',
                                },
                                {
                                    value: NotificationPreview.NAME,
                                    label: 'Show name only',
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
                <FormSection
                    title="Badge counter"
                    footer={
                        "Push notification settings apply to all your desktop devices and don't affect mobile. Badge\u00A0settings affect all your devices"
                    }
                >
                    <XView marginHorizontal={-16}>
                        <UCheckbox
                            label="Include muted chats"
                            onChange={v => excludeMutedChats.input.onChange(!v)}
                            checked={!excludeMutedChats.value}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled
                            label="Count chats instead of messages"
                            field={countUnreadChats}
                            asSwitcher={true}
                        />
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
