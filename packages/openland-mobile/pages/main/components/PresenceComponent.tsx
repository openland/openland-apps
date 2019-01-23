import * as React from 'react';
import { OnlineQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { TextStyle, Text } from 'react-native';
import { formatDate } from 'openland-mobile/utils/formatDate';
import * as humanize from 'humanize';

export class PresenceComponent extends React.PureComponent<{ uid: string, styles?: TextStyle }> {
    render() {
        return (<YQuery query={OnlineQuery} variables={{ userId: this.props.uid }}>
            {online => {
                let sub = undefined;
                if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                    let time = new Date(parseInt(online.data.user.lastSeen, 10)).getTime();
                    if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
                        sub = 'last seen ' + humanize.relativeTime(time / 1000);
                    } else if (new Date().getTime() - time < 1000 * 60) {
                        sub = 'just now';
                    } else {
                        sub = 'last seen ' + formatDate(time);
                    }
                    // 
                } else if (online.data && online.data.user && online.data.user.online) {
                    sub = 'online';
                }
                return (
                    <Text style={this.props.styles}>{sub}</Text>
                );
            }}
        </YQuery>);
    }
}