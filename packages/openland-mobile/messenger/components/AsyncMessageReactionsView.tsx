
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Stopwatch } from 'openland-y-utils/stopwatch';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASImage } from 'react-native-async-view/ASImage';

let reactionMap = {
    'LIKE': '❤️',
    'THUMB_UP': '👍',
    'JOY': '😂',
    'SCREAM': '😱',
    'CRYING': '😢',
    'ANGRY': '🤬',
}

export const defaultReactions = ['❤️', '👍', '😂', '😱', '😢', '🤬'];

export const reactionsImagesMap = {
    '❤️': require('assets/reactions/ic-reaction-like.png'),
    '👍': require('assets/reactions/ic-reaction-thumbsup.png'),
    '😂': require('assets/reactions/ic-reaction-lol.png'),
    '😱': require('assets/reactions/ic-reaction-wow.png'),
    '😢': require('assets/reactions/ic-reaction-sad.png'),
    '🤬': require('assets/reactions/ic-reaction-angry.png')
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
                {[...reactions].map((i) =>
                    (
                        <ASImage marginLeft={3} source={reactionsImagesMap[i.reaction]} width={20} height={20} />
                    )
                )}

                {users.length > 0 && <ASText fontWeight={TextStyles.weight.medium} marginLeft={5} marginRight={7} marginTop={2} fontSize={13} key={'users'} color={'#99a2b0'}>{usersString}</ASText>}
            </ASFlex>
        </ ASFlex>
    );
});