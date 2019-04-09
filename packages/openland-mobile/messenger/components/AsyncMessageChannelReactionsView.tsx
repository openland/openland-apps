
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASImage } from 'react-native-async-view/ASImage';

interface AsyncMessageChannelReactionsViewProps {
    message: DataSourceMessageItem;
    theme: AppTheme;
    onReactionPress: (message: DataSourceMessageItem, r: string) => void;
    onCommentsPress: (message: DataSourceMessageItem) => void;
}

export const AsyncMessageChannelReactionsView = React.memo<AsyncMessageChannelReactionsViewProps>((props) => {
    let theme = props.theme;
    let message = props.message;

    let commentsCount = 0; // message.commentsCount
    let likesCount = 0;
    let myLike = false;

    if (message.reactions) {
        let likes = message.reactions.filter(r => r.reaction === 'LIKE');

        likesCount = likes.length;

        likes.map(r => {
            if (r.user.id === getMessenger().engine.user.id) {
                myLike = true;
            }
        });
    }

    return (
        <ASFlex alignItems="stretch" flexDirection="row" maxHeight={38} backgroundColor={theme.backgroundColor} >
            <ASFlex flexGrow={1} justifyContent={props.message.isOut ? 'flex-end' : 'flex-start'} flexDirection="row" marginRight={props.message.isOut ? 14 : 0} marginLeft={props.message.isOut ? 0 : 56} marginTop={4} marginBottom={6}>
                <ASFlex backgroundColor="rgba(0, 132, 254, 0.1)" borderRadius={14} onPress={() => props.onCommentsPress(message)}>
                    <ASFlex marginLeft={7} marginRight={7} height={28} alignItems="center" justifyContent="center">
                        {commentsCount <= 0 && <ASImage source={require('assets/ic-comments-24.png')} width={24} height={24} />}
                        {commentsCount > 0 && <ASImage source={require('assets/ic-comments-full-24.png')} width={24} height={24} />}
                        {commentsCount > 0 && <ASText fontSize={14} fontWeight={TextStyles.weight.medium} marginLeft={2} marginRight={1} opacity={0.8}>{commentsCount}</ASText>}
                    </ASFlex>
                </ASFlex>

                <ASFlex marginLeft={6} backgroundColor="#f3f5f7" borderRadius={14} onPress={() => props.onReactionPress(message, 'LIKE')}>
                    <ASFlex marginLeft={7} marginRight={7} height={28} alignItems="center" justifyContent="center">
                        {!myLike && <ASImage source={require('assets/ic-likes-24.png')} width={24} height={24} />}
                        {myLike && <ASImage source={require('assets/ic-likes-full-24.png')} width={24} height={24} />}
                        {likesCount > 0 && <ASText fontSize={14} fontWeight={TextStyles.weight.medium} marginLeft={2} marginRight={1} opacity={0.8}>{likesCount}</ASText>}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});