
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

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
        return (
            <ASFlex flexDirection="row" marginRight={7}>
                {[...reactions.values()].map((r, i) => (
                    <ASFlex flexDirection="row" marginTop={5} marginBottom={5}>
                        <ASText fontSize={14} key={i} marginLeft={7}>{r.reaction}</ASText>
                        <ASText fontSize={14} key={i + '-counter'} color={r.my ? 'rgb(23, 144, 255)' : '#000'}>{r.count}</ASText>
                    </ASFlex>
                )
                )}
            </ASFlex>
        );
    }
}
