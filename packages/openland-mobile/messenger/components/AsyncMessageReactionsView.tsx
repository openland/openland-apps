
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
const maxReactionsNames = 3;

export class AsyncMessageReactionsView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        let reactions = this.props.message.reactions!.reduce(
            (res, r) => {
                let data = res.get(r.reaction) || { reaction: r.reaction, count: 0, my: false };
                data.count++;
                data.my = data.my || r.user.id === getMessenger().engine.user.id;
                res.set(r.reaction, data);
                return res;
            },
            new Map<string, { count: number, my: boolean, reaction: string }>()
        );
        let users = this.props.message.reactions!
            .reduce(
                (res, r) => res.find(u => u.id === r.user.id) ? res : [...res, r.user],
                [] as { id: string, name: string }[]
            )
            // 'You' first
            .sort((a, b) => a.id === getMessenger().engine.user.id ? -1 : 1)
            // replace user name to 'You';
            .map(u => u.id === getMessenger().engine.user.id ? { ...u, name: 'You' } : u);
        // reduce
        let usersString = users.map(u => u.name).join(', ');
        if (users.length > maxReactionsNames) {
            users = users
                // polaceholder
                .map((u, index) => index === maxReactionsNames - 1 ? { ...u, name: 'and ' + (users.length - maxReactionsNames + 1) + ' more' } : u)
                // reduce
                .filter((u, index) => index < maxReactionsNames);
            usersString = users.map(u => u.name).join(maxReactionsNames < 3 ? ' ' : ', ');
        }

        return (
            <ASFlex flexDirection="row" marginRight={7}>
                {[...reactions.values()].map((r, i) => (
                    <ASFlex flexDirection="row" marginTop={5} marginBottom={5}>
                        <ASText fontSize={14} key={i} marginLeft={7}>{r.reaction}</ASText>
                        <ASText fontSize={14} key={i + '-counter'} color={r.my ? 'rgb(23, 144, 255)' : 'rgba(0, 0, 0, 0.5)'}>{r.count}</ASText>
                    </ASFlex>
                )
                )}
                {users.length > 0 && <ASText marginLeft={5} marginTop={5} marginBottom={5} fontSize={14} key={'users'} color={'rgba(0, 0, 0, 0.5)'}>{usersString}</ASText>}

            </ASFlex>
        );
    }
}
