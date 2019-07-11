import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';

enum MessagesNotificationsOptions {
    ALL_NEW_MESSAGES = 'ALL_NEW_MESSAGES',
    DIRECT_MESSAGES_AND_MENTIONS = 'DIRECT_MESSAGES_AND_MENTIONS',
}

enum CommentsNotificationsOptions {
    ALL_NEW_COMMENTS = 'ALL_NEW_COMMENTS',
    NEVER_NOTIFY_ME = 'NEVER_NOTIFY_ME',
}

enum EmailNotificationsOptions {
    AT_MOST_ONCE_EVERY_15_MINS = 'AT_MOST_ONCE_EVERY_15_MINS',
    AT_MOST_ONCE_PER_HOUR = 'AT_MOST_ONCE_PER_HOUR',
    AT_MOST_ONCE_PER_DAY = 'AT_MOST_ONCE_PER_DAY',
    NEVER_NOTIFY_ME = 'NEVER_NOTIFY_ME',
}

export const Notifications = () => {
    const form = useForm();
    const client = useClient();
    let messagesNotifications = useField(
        'input.messagesNotifications',
        MessagesNotificationsOptions.ALL_NEW_MESSAGES,
        form,
    );
    let commentsNotifications = useField(
        'input.commentsNotifications',
        CommentsNotificationsOptions.ALL_NEW_COMMENTS,
        form,
    );
    let emailNotifications = useField(
        'input.emailNotifications',
        EmailNotificationsOptions.AT_MOST_ONCE_EVERY_15_MINS,
        form,
    );
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            //
        });
    }, []);

    return (
        <XView>
            <RadioButtonsSelect
                title="Messages notifications"
                {...messagesNotifications.input}
                selectOptions={[
                    {
                        value: MessagesNotificationsOptions.ALL_NEW_MESSAGES,
                        label: `All new messages`,
                    },
                    {
                        value: MessagesNotificationsOptions.DIRECT_MESSAGES_AND_MENTIONS,
                        label: `Direct messages and mentions`,
                    },
                ]}
            />
            <RadioButtonsSelect
                title="Comments notifications"
                {...commentsNotifications.input}
                selectOptions={[
                    {
                        value: CommentsNotificationsOptions.ALL_NEW_COMMENTS,
                        label: `All new comments`,
                    },
                    {
                        value: CommentsNotificationsOptions.NEVER_NOTIFY_ME,
                        label: `Never notify me`,
                    },
                ]}
            />

            <RadioButtonsSelect
                title="Email notifications"
                {...emailNotifications.input}
                selectOptions={[
                    {
                        value: EmailNotificationsOptions.AT_MOST_ONCE_EVERY_15_MINS,
                        label: `At most once every 15 minutes`,
                    },
                    {
                        value: EmailNotificationsOptions.AT_MOST_ONCE_PER_HOUR,
                        label: `At most once per hour`,
                    },
                    {
                        value: EmailNotificationsOptions.AT_MOST_ONCE_PER_DAY,
                        label: `At most once per day`,
                    },
                    {
                        value: EmailNotificationsOptions.NEVER_NOTIFY_ME,
                        label: `Never notify me`,
                    },
                ]}
            />
            <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
        </XView>
    );
};
