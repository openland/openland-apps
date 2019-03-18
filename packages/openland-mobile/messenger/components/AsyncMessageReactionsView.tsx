
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Stopwatch } from 'openland-y-utils/stopwatch';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

let reactionMap = {
    'LIKE': '❤️',
    'THUMB_UP': '👍',
    'JOY': '😂',
    'SCREAM': '😱',
    'CRYING': '😢',
    'ANGRY': '🤬',
}

export const AsyncMessageReactionsView = React.memo<{ message: DataSourceMessageItem }>((props) => {
    let theme = React.useContext(ThemeContext);
    let sw = new Stopwatch('reactions');
    sw.next('reaction');
    if (!props.message.reactions || props.message.reactions!.length === 0) {
        return null;
    }
    let reactionsMap = props.message.reactions!.map(r => {
        r.reaction = reactionMap[r.reaction] as any || r.reaction;
        return r;
    })
        .reduce(
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
    let users = props.message.reactions!
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
    sw.next();
    return (
        <ASFlex alignItems="stretch" flexDirection="row" maxHeight={30} backgroundColor={theme.backgroundColor} >
            <ASFlex flexGrow={1} justifyContent={props.message.isOut ? 'flex-end' : 'flex-start'} flexDirection="row" marginRight={props.message.isOut ? 14 : 0} marginLeft={props.message.isOut ? 0 : 60} marginTop={5}>
                <ASFlex flexDirection="row">
                    {/* moks */}
                    {[...reactions].map((i) => (
                        <ASFlex key={'m' + i.reaction} marginTop={Platform.OS === 'ios' ? -3 : 2} width={reactionSize} height={reactionSize} marginRight={-3} />
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
});