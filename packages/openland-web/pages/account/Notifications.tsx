import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import {
    EmailFrequency,
    CommentsNotificationDelivery,
    NotificationMessages,
} from 'openland-api/Types';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { FormFooter } from './components/FormFooter';

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
        <FormWrapper title="Notifications">
            <FormSection title="Messages notifications">
                <RadioButtonsSelect
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
            </FormSection>
            <FormSection title="Comments notifications">
                <RadioButtonsSelect
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
            </FormSection>
            <FormSection title="Email notifications">
                <RadioButtonsSelect
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
            </FormSection>
            <FormFooter>
                <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
            </FormFooter>
        </FormWrapper>
    );
};
