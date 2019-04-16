
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getMessenger } from '../../utils/messenger';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Stopwatch } from 'openland-y-utils/stopwatch';
import { ASImage } from 'react-native-async-view/ASImage';
import { AppTheme } from 'openland-mobile/themes/themes';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';

export const defaultReactions = ['LIKE', 'THUMB_UP', 'JOY', 'SCREAM', 'CRYING', 'ANGRY'];

export const reactionsImagesMap = {
    'LIKE': require('assets/reactions/ic-reaction-like.png'),
    'THUMB_UP': require('assets/reactions/ic-reaction-thumbsup.png'),
    'JOY': require('assets/reactions/ic-reaction-lol.png'),
    'SCREAM': require('assets/reactions/ic-reaction-wow.png'),
    'CRYING': require('assets/reactions/ic-reaction-sad.png'),
    'ANGRY': require('assets/reactions/ic-reaction-angry.png')
}

export let reactionMap = {
    'LIKE': '❤️',
    'THUMB_UP': '👍',
    'JOY': '😂',
    'SCREAM': '😱',
    'CRYING': '😢',
    'ANGRY': '🤬',
};

export const extractReactionsSorted = (reactions: FullMessage_GeneralMessage_reactions[]) => {
    let reactionsReduced = reactions.reduce(
            (res, r) => {
                let data = res.get(r.reaction) || { reaction: r.reaction, count: 0, my: false };
                data.count++;
                data.my = data.my || r.user.id === getMessenger().engine.user.id;
                res.set(r.reaction, data);
                return res;
            },
            new Map<string, { count: number, my: boolean, reaction: string }>()
        );
    let reactionsSorted = [...reactionsReduced.values()].sort((a, b) => a.count - b.count);
    let users = reactions
        .reduce(
            (res, r) => res.find(u => u.id === r.user.id) ? res : [...res, r.user],
            [] as { id: string, name: string }[]
        )
        // 'You' first
        .sort((a, b) => a.id === getMessenger().engine.user.id ? -1 : 1)
        // replace user name to 'You';
        .map(u => u.id === getMessenger().engine.user.id ? { ...u, name: 'You' } : u);

    let usersString = '';
    if (users.length > 0) {
        usersString = users[0].name + (users.length > 1 ? ' + ' + (users.length - 1) : '');
    }

    return { reactionsSorted, usersString };
}

interface AsyncMessageReactionsViewProps {
    theme: AppTheme;
    message: DataSourceMessageItem;
    isChannel?: boolean;

    onCommentsPress: () => void;
}

export const AsyncMessageReactionsView = React.memo<AsyncMessageReactionsViewProps>((props) => {
    let theme = props.theme;
    let sw = new Stopwatch('reactions');
    sw.next('reaction');

    let commentsCount = props.message.commentsCount || 0;

    if (!props.isChannel && ((!props.message.reactions || props.message.reactions!.length === 0) && commentsCount === 0)) {
        return null;
    }

    let reactions: any = { reactionsSorted: [], usersString: '' };

    if (props.message.reactions && props.message.reactions.length > 0) {
        reactions = extractReactionsSorted(props.message.reactions!);
    }

    sw.next();
    return (
        <ASFlex alignItems="stretch" flexDirection="row" maxHeight={33} backgroundColor={theme.backgroundColor} >
            <ASFlex flexGrow={1} justifyContent={props.message.isOut ? 'flex-end' : 'flex-start'} flexDirection="row" marginRight={props.message.isOut ? 14 : 0} marginLeft={props.message.isOut ? 0 : 60} marginTop={5} alignItems="center">
                {(props.isChannel || commentsCount > 0) && (
                    <ASFlex backgroundColor="rgba(0, 132, 254, 0.1)" borderRadius={13} marginRight={5} onPress={props.onCommentsPress}>
                        <ASFlex marginLeft={7} marginRight={7} height={26} alignItems="center" justifyContent="center">
                            {commentsCount <= 0 && <ASImage source={require('assets/ic-comments-24.png')} width={24} height={24} />}
                            {commentsCount > 0 && <ASImage source={require('assets/ic-comments-full-24.png')} width={24} height={24} />}
                            {commentsCount > 0 && <ASText fontSize={14} fontWeight={TextStyles.weight.medium} marginLeft={2} marginRight={1} opacity={0.8}>{commentsCount}</ASText>}
                        </ASFlex>
                    </ASFlex>
                )}

                {reactions.reactionsSorted.length > 0 && (
                    <ASFlex backgroundColor="#f3f5f7" borderRadius={13}>
                        <ASFlex marginLeft={5} marginRight={1} height={26} alignItems="center" justifyContent="center">
                            {[...reactions.reactionsSorted].map((i) =>
                                (
                                    <ASImage key={'k' + i.reaction} marginLeft={3} source={reactionsImagesMap[i.reaction]} width={20} height={20} />
                                )
                            )}

                            {reactions.usersString.length > 0 && <ASText fontWeight={TextStyles.weight.medium} marginLeft={5} marginRight={7} fontSize={13} key={'users'} color={'#99a2b0'}>{reactions.usersString}</ASText>}
                        </ASFlex>
                    </ASFlex>
                )}
            </ASFlex>
        </ ASFlex>
    );
});