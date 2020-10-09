import * as React from 'react';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import NotificationsOffIcon from 'openland-icons/s/ic-notifications-off-24.svg';
import { useClient } from 'openland-api/useClient';
import { XViewProps } from 'react-mental';
import { UListItem } from '../UListItem';

interface UNotificationsSwitchProps extends XViewProps {
    id: string;
    mute: boolean;
}

export const UNotificationsSwitch = React.memo<UNotificationsSwitchProps>((props) => {
    const { mute } = props;
    const client = useClient();
    const [nofications, setNotifications] = React.useState(!mute);
    const handleNotifications = React.useCallback((value) => {
        setNotifications(value);
        client.mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
    }, []);

    return (
        <UListItem
            useRadius={true}
            title={nofications ? 'Mute notifications' : 'Unmute notifications'}
            icon={nofications ? <NotificationsOffIcon /> : <NotificationsIcon />}
            onClick={() => handleNotifications(!nofications)}
        />
    );
});