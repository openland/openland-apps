import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import {
    CommentsNotificationDelivery,
    NotificationMessages,
    UpdateSettingsInput,
} from 'openland-api/Types';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { debounce } from 'openland-y-utils/timer';

export const SettingsNotificationsFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const settings = client.useSettings();

    const messagesNotifications = useField(
        'input.messagesNotifications',
        settings.settings.desktopNotifications,
        form,
    );
    const commentsNotifications = useField(
        'input.commentsNotifications',
        settings.settings.commentNotificationsDelivery,
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
                commentNotificationsDelivery: commentsNotifications.value,
                desktopNotifications: messagesNotifications.value,
            });
        }
    }, [messagesNotifications.value, commentsNotifications.value]);
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
            </FormWrapper>
        </Page>
    );
});
