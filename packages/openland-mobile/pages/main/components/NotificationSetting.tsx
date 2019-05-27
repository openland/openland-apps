import * as React from 'react';
import { Platform } from 'react-native';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';

export const NotificationSettings = XMemo<{ id: string, mute: boolean }>((props) => {
    const [nofications, setNotifications] = React.useState(!props.mute);
    const handleNotifications = React.useCallback<{ (value: boolean): void }>((value) => {
        setNotifications(value);
        getClient().mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
    }, []);
    return (
        <ZListItem
            leftIcon={Platform.OS === 'android' ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-fill-24.png')}
            text="Notifications"
            toggle={nofications}
            onToggle={handleNotifications}
        />
    );
});