import * as React from 'react';
import { OnlineQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { TextStyle, Text } from 'react-native';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';

export class PresenceComponent extends React.PureComponent<{ uid: string, style?: TextStyle, onlineStyle?: TextStyle }> {
    render() {
        return (<YQuery query={OnlineQuery} variables={{ userId: this.props.uid }}>
            {online => {
                let sub = undefined;
                let isOnline = false;
                if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                    sub = formatLastSeen(online.data.user.lastSeen);
                } else if (online.data && online.data.user && online.data.user.online) {
                    sub = 'online';
                    isOnline = true;
                }
                return (
                    <Text style={[this.props.style, isOnline && this.props.onlineStyle]}>{sub}</Text>
                );
            }}
        </YQuery>);
    }
}