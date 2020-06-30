import * as React from 'react';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getClient } from 'openland-mobile/utils/graphqlClient';

export const NotificationSettings = React.memo((props: { id: string, mute: boolean }) => {
    const [nofications, setNotifications] = React.useState(!props.mute);
    const handleNotifications = React.useCallback<{ (value: boolean): void }>((value) => {
        setNotifications(value);
        getClient().mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
    }, []);
    return (
        <ZListItem
            leftIcon={require('assets/ic-notifications-glyph-24.png')}
            text="Notifications"
            toggle={nofications}
            onToggle={handleNotifications}
        />
    );
});