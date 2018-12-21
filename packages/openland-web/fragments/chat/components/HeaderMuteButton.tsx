import * as React from 'react';
import { withConversationSettingsUpdate } from 'openland-web/api/withConversationSettingsUpdate';
import NotificationsOnIcon from 'openland-icons/notifications/ic-notifications-on.svg';
import NotificationsOffIcon from 'openland-icons/notifications/ic-notifications-off.svg';
import { css } from 'linaria';

const muteButtonClass = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: -3px !important;
    & svg path:last-child {
        fill: rgba(0, 0, 0, 0.2);
    }
    &:hover svg path:last-child {
        fill: #1790ff;
    }
`;

class NotificationSettingsComponent extends React.Component<
    { mutation: any; settings: { mute: boolean }; roomId: string },
    { settings: { mute: boolean } }
> {
    handleClick = () => {
        let value = !this.props.settings.mute;

        this.props.mutation({
            variables: {
                settings: {
                    mute: value,
                },
                roomId: this.props.roomId,
            },
        });
    };

    render() {
        return (
            <div className={muteButtonClass} onClick={this.handleClick}>
                {this.props.settings.mute ? <NotificationsOffIcon /> : <NotificationsOnIcon />}
            </div>
        );
    }
}

export const HeaderMuteButton = withConversationSettingsUpdate(props => (
    <NotificationSettingsComponent
        mutation={props.update}
        settings={(props as any).settings}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{
    settings: { mute: boolean | null };
    roomId: string;
}>;
