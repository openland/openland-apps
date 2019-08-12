import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { NON_PRODUCTION } from '../Init';
import { Settings_settings, CommentsNotificationDelivery, NotificationMessages, EmailFrequency } from 'openland-api/Types';
import { ZCheckmarkGroup } from 'openland-mobile/components/ZCheckmarkGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { backoff, debounce } from 'openland-y-utils/timer';

const sendMutate = debounce(async (state: Settings_settings) => {
    const input = {
        mobileNotifications: state.mobileNotifications,
        desktopNotifications: state.desktopNotifications,
        commentNotificationsDelivery: state.commentNotificationsDelivery,
        emailFrequency: state.emailFrequency,
        mobileAlert: state.mobileAlert,
        mobileIncludeText: state.mobileIncludeText,
        excludeMutedChats: state.excludeMutedChats,
        countUnreadChats: state.countUnreadChats,
    };

    await backoff(async () => {
        await getClient().mutateSettingsUpdate({ input });
    });
}, 3000);

const SettingsNotificationsContent = XMemo<PageProps>(props => {
    const settingsData = getClient().useSettings({ fetchPolicy: 'network-only' }).settings;
    const [settings, setSettings] = React.useState<Settings_settings>(settingsData);

    const handleSave: <T>(field: string, value: T) => void = (field, value) => {
        setSettings((prevState) => ({ ...prevState, [field]: value }));
    };

    React.useEffect(() => {
        sendMutate(settings);
    }, [settings]);

    return (
        <SScrollView>
            {NON_PRODUCTION && (
                <ZListGroup header="Counter">
                    <ZListItem
                        text="Show unread chats"
                        onToggle={value => handleSave('countUnreadChats', value)}
                        toggle={settings.countUnreadChats}
                    />
                    <ZListItem
                        text="Exclude muted chats"
                        onToggle={value => handleSave('excludeMutedChats', value)}
                        toggle={settings.excludeMutedChats}
                    />
                </ZListGroup>
            )}

            <ZListGroup header="Push notifications">
                <ZListItem
                    text="Alert"
                    onToggle={value => handleSave('mobileAlert', value)}
                    toggle={settings.mobileAlert}
                />
                <ZListItem
                    text="Include preview of messages"
                    onToggle={value => handleSave('mobileIncludeText', value)}
                    toggle={settings.mobileIncludeText}
                />
            </ZListGroup>

            <ZCheckmarkGroup
                header={'Comments notifications'}
                value={settings.commentNotificationsDelivery}
                onChange={item => handleSave('commentNotificationsDelivery', item.value)}
                items={[
                    { label: 'All comments', value: CommentsNotificationDelivery.ALL },
                    { label: 'Never notify me', value: CommentsNotificationDelivery.NONE },
                ]}
            />

            <ZCheckmarkGroup
                header={'Send notification about'}
                value={settings.mobileNotifications}
                onChange={item => handleSave('mobileNotifications', item.value)}
                items={[
                    { label: 'All new messages', value: NotificationMessages.ALL },
                    { label: 'Direct messages', value: NotificationMessages.DIRECT },
                    { label: 'Never notify me', value: NotificationMessages.NONE },
                ]}
            />

            <ZCheckmarkGroup
                header={'Desktop'}
                value={settings.desktopNotifications}
                onChange={item => handleSave('desktopNotifications', item.value)}
                items={[
                    { label: 'All new messages', value: NotificationMessages.ALL },
                    { label: 'Direct messages', value: NotificationMessages.DIRECT },
                    { label: 'Never notify me', value: NotificationMessages.NONE },
                ]}
            />

            <ZCheckmarkGroup
                header={'Email frequency'}
                footer={
                    'When you’re busy or not online, Openland can send you email notifications about new messages. We will use ' +
                    settings.primaryEmail +
                    ' for notifications'
                }
                value={settings.emailFrequency}
                onChange={item => handleSave('emailFrequency', item.value)}
                items={[
                    { label: 'Notify every 15 minutes', value: EmailFrequency.MIN_15 },
                    { label: 'Notify maximum once per 1 hour', value: EmailFrequency.HOUR_1 },
                    { label: 'Once per 24 hours', value: EmailFrequency.HOUR_24 },
                    { label: 'Once a week', value: EmailFrequency.WEEK_1 },
                    { label: 'Never notify me', value: EmailFrequency.NEVER },
                ]}
            />
        </SScrollView>
    );
});

class SettingsNotifciationsComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Notifications" />
                <SettingsNotificationsContent {...this.props} />
            </>
        );
    }
}

export const SettingsNotifications = withApp(SettingsNotifciationsComponent);
