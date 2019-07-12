import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';

const SettingsNotificationsContent = XMemo<PageProps>((props) => {
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);
    let settings = getClient().useSettings({ fetchPolicy: 'network-only' }).settings;

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async (args) => {
                    await getClient().mutateSettingsUpdate(args);
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    input: {
                        mobileNotifications: settings.mobileNotifications,
                        desktopNotifications: settings.desktopNotifications,
                        commentNotificationsDelivery: settings.commentNotificationsDelivery,
                        emailFrequency: settings.emailFrequency,
                        mobileAlert: settings.mobileAlert,
                        mobileIncludeText: settings.mobileIncludeText,
                        excludeMutedChats: settings.excludeMutedChats,
                        countUnreadChats: settings.countUnreadChats,
                    }
                }}
            >
                <ZListItemGroup header="Counter">
                    <ZListItem text="Show unread chats" toggleField={{ key: 'input.countUnreadChats' }} />
                    <ZListItem text="Exclude muted chats" toggleField={{ key: 'input.excludeMutedChats' }} />
                </ZListItemGroup>
                <ZListItemGroup header="Push notifications">
                    <ZListItem text="Alert" toggleField={{ key: 'input.mobileAlert' }} />
                    <ZListItem text="Include preview of messages" toggleField={{ key: 'input.mobileIncludeText' }} />
                </ZListItemGroup>
                <ZListItemGroup header="Comment notifications">
                    <ZListItem text="All" checkmarkField={{ key: 'input.commentNotificationsDelivery', value: 'ALL' }} />
                    <ZListItem text="Never notify me" checkmarkField={{ key: 'input.commentNotificationsDelivery', value: 'NONE' }} />
                </ZListItemGroup>
                <ZListItemGroup header="Send notification about">
                    <ZListItem text="All new messages" checkmarkField={{ key: 'input.mobileNotifications', value: 'ALL' }} />
                    <ZListItem text="Direct messages" checkmarkField={{ key: 'input.mobileNotifications', value: 'DIRECT' }} />
                    <ZListItem text="Never notify me" checkmarkField={{ key: 'input.mobileNotifications', value: 'NONE' }} />
                </ZListItemGroup>
                <ZListItemGroup header="Desktop & Email">
                    <ZListItem text="All new messages" checkmarkField={{ key: 'input.desktopNotifications', value: 'ALL' }} />
                    <ZListItem text="Direct messages" checkmarkField={{ key: 'input.desktopNotifications', value: 'DIRECT' }} />
                    <ZListItem text="Never notify me" checkmarkField={{ key: 'input.desktopNotifications', value: 'NONE' }} />
                </ZListItemGroup>
                <ZListItemGroup header="Email frequency" footer={'When you’re busy or not online, Openland can send you email notifications about new messages. We will use ' + settings.primaryEmail + ' for notifications'}>
                    <ZListItem text="Notify every 15 minutes" checkmarkField={{ key: 'input.emailFrequency', value: 'MIN_15' }} />
                    <ZListItem text="Notify maximum once per 1 hour" checkmarkField={{ key: 'input.emailFrequency', value: 'HOUR_1' }} />
                    <ZListItem text="Once per 24 hours" checkmarkField={{ key: 'input.emailFrequency', value: 'HOUR_24' }} />
                    <ZListItem text="Once a week" checkmarkField={{ key: 'input.emailFrequency', value: 'WEEK_1' }} />
                    <ZListItem text="Never notify me" checkmarkField={{ key: 'input.emailFrequency', value: 'NEVER' }} />
                </ZListItemGroup>
            </ZForm>
        </>
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