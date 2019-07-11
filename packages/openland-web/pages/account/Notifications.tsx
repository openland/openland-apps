import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import {
    EmailFrequency,
    CommentsNotificationDelivery,
    NotificationMessages,
} from 'openland-api/Types';

export const Notifications = () => {
    const form = useForm();
    const client = useClient();
    const settings = client.useSettings();

    let messagesNotifications = useField(
        'input.messagesNotifications',
        settings.settings.desktopNotifications,
        form,
    );
    let commentsNotifications = useField(
        'input.commentsNotifications',
        settings.settings.commentNotificationsDelivery,
        form,
    );
    let emailNotifications = useField(
        'input.emailNotifications',
        settings.settings.emailFrequency,
        form,
    );
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            await client.mutateSettingsUpdate({
                input: {
                    emailFrequency: emailNotifications.value,
                    commentNotificationsDelivery: commentsNotifications.value,
                    desktopNotifications: messagesNotifications.value,
                    mobileNotifications: messagesNotifications.value,
                },
            });
        });
    }, []);

    return (
        <XView>
            <RadioButtonsSelect
                title="Messages notifications"
                {...messagesNotifications.input}
                selectOptions={[
                    {
                        value: NotificationMessages.ALL,
                        label: `All new messages`,
                    },
                    {
                        value: NotificationMessages.DIRECT,
                        label: `Direct messages and mentions`,
                    },
                ]}
            />
            <RadioButtonsSelect
                title="Comments notifications"
                {...commentsNotifications.input}
                selectOptions={[
                    {
                        value: CommentsNotificationDelivery.ALL,
                        label: `All new comments`,
                    },
                    {
                        value: CommentsNotificationDelivery.NONE,
                        label: `Never notify me`,
                    },
                ]}
            />

            <RadioButtonsSelect
                title="Email notifications"
                {...emailNotifications.input}
                selectOptions={[
                    {
                        value: EmailFrequency.MIN_15,
                        label: `At most once every 15 minutes`,
                    },
                    {
                        value: EmailFrequency.HOUR_1,
                        label: `At most once per hour`,
                    },
                    {
                        value: EmailFrequency.HOUR_24,
                        label: `At most once per day`,
                    },
                    {
                        value: EmailFrequency.NEVER,
                        label: `Never notify me`,
                    },
                ]}
            />
            <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
        </XView>
    );
};
