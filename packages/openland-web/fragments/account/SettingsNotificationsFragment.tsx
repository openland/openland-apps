import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import {
    EmailFrequency,
    CommentsNotificationDelivery,
    NotificationMessages,
    UpdateSettingsInput,
} from 'openland-api/Types';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { FormFooter } from './components/FormFooter';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { debounce } from 'openland-y-utils/timer';

export const SettingsNotificationsFragment = React.memo(() => {
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
    const doConfirm = (input: UpdateSettingsInput) => {
        client.mutateSettingsUpdate({ input });
    };

    const doConfirmDebounced = React.useRef<null | ((input: UpdateSettingsInput) => void)>();
    React.useEffect(() => {
        doConfirmDebounced.current = debounce(doConfirm, 1000);
    }, []);
    React.useEffect(() => {
        if (doConfirmDebounced.current) {
            doConfirmDebounced.current({
                emailFrequency: emailNotifications.value,
                commentNotificationsDelivery: commentsNotifications.value,
                desktopNotifications: messagesNotifications.value,
                mobileNotifications: messagesNotifications.value,
            });
        }
    });
    return (
        <Page>
            <UHeader title="Notifications" />
            <FormWrapper title="Notifications">
                <FormSection title="Messages notifications">
                    <XView marginHorizontal={-16}>
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
                                {
                                    value: NotificationMessages.NONE,
                                    label: `Never notify me`,
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
                <FormSection title="Comments notifications">
                    <XView marginHorizontal={-16}>
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
                    </XView>
                </FormSection>
                <FormSection title="Email notifications">
                    <XView marginHorizontal={-16}>
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
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
