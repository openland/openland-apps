import * as React from 'react';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import NotificationsOffIcon from 'openland-icons/s/ic-notifications-off-24.svg';
import { useClient } from 'openland-api/useClient';
import { XViewProps } from 'react-mental';
import { UIconButton } from '../UIconButton';

interface UNotificationsSwitchProps extends XViewProps {
    id: string;
    mute: boolean;
}

export const UNotificationsSwitch = React.memo<UNotificationsSwitchProps>((props) => {
    const { id, mute, ...other } = props;
    const client = useClient();
    const [nofications, setNotifications] = React.useState(!mute);
    const handleNotifications = React.useCallback((value) => {
        setNotifications(value);
        client.mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
    }, []);

    return (
        <UIconButton
            {...other}
            icon={nofications ? <NotificationsIcon /> : <NotificationsOffIcon />}
            onClick={() => handleNotifications(!nofications)}
        />
    );
});