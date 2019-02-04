
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { Dimensions, Platform } from 'react-native';
import { bubbleMaxWidth } from './AsyncBubbleView';
import { messageBgColor } from './AsyncMessageView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
const maxReactionsNames = 3;

export class AsyncMessageReactionsView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        if (!this.props.message.reactions || this.props.message.reactions!.length === 0) {
            return null;
        }
        let reactionsMap = this.props.message.reactions!.reduce(
            (res, r) => {
                let data = res.get(r.reaction) || { reaction: r.reaction, count: 0, my: false };
                data.count++;
                data.my = data.my || r.user.id === getMessenger().engine.user.id;
                res.set(r.reaction, data);
                return res;
            },
            new Map<string, { count: number, my: boolean, reaction: string }>()
        );
        let reactions = [...reactionsMap.values()].sort((a, b) => a.count - b.count);
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
        let usersString = (users.find(r => r.name === 'You') ? 'You' : users[0].name) + (users.length > 1 ? ' + ' + (users.length - 1) : '');

        let reactionSize = 20;
        return (
            <ASFlex alignItems="stretch" flexDirection="row" maxHeight={30} backgroundColor={messageBgColor} >
                <ASFlex flexGrow={1} justifyContent={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexDirection="row" marginRight={this.props.message.isOut ? 14 : 0} marginLeft={this.props.message.isOut ? 0 : 60} marginTop={5}>
                    <ASFlex flexDirection="row">
                        {/* moks */}
                        {[...reactions].map(() => (
                            <ASFlex marginTop={Platform.OS === 'ios' ? -3 : 2} width={reactionSize} height={reactionSize} marginRight={-3} />
                        )
                        )}
                        <ASFlex overlay={true} flexDirection={'column'} marginTop={(Platform.OS === 'ios' ? -3 : 2)}>
                            {[...reactions].map(r => ({ ...r, reaction: r.reaction === 'respondPost' ? '↩️' : r.reaction })).map((r, i) => {
                                return (
                                    <ASFlex key={r.reaction + '_' + r.count} marginTop={i === 0 ? 0 : -reactionSize} marginLeft={(reactions.length - i - 1) * (reactionSize - 5)} backgroundColor="white" borderRadius={10} alignItems="center" justifyContent="center" width={20} height={20} >
                                        <ASText width={18} height={22} marginTop={Platform.OS === 'ios' ? 3 : -2} fontSize={Platform.OS === 'ios' ? 13 : 14} key={i} marginLeft={1}>{r.reaction}</ASText>
                                    </ASFlex>
                                );
                            }
                            )}
                        </ASFlex>
                    </ASFlex>

                    {users.length > 0 && <ASText fontWeight={TextStyles.weight.medium} marginLeft={5} marginRight={7} marginBottom={5} fontSize={13} key={'users'} color={'#99a2b0'}>{usersString}</ASText>}
                </ASFlex>
            </ ASFlex>
        );
    }
}
