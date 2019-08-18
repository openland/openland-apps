
import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { FontStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ASImage } from 'react-native-async-view/ASImage';
import { MessageReactionType } from 'openland-api/Types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { rm } from 'react-native-async-view/internals/baseStyleProcessor';

export const reactionsImagesMap: { [key in MessageReactionType]: NodeRequire } = {
    'LIKE': require('assets/reactions/ic-reaction-like.png'),
    'THUMB_UP': require('assets/reactions/ic-reaction-thumbsup.png'),
    'JOY': require('assets/reactions/ic-reaction-lol.png'),
    'SCREAM': require('assets/reactions/ic-reaction-wow.png'),
    'CRYING': require('assets/reactions/ic-reaction-sad.png'),
    'ANGRY': require('assets/reactions/ic-reaction-angry.png')
};

interface AsyncMessageReactionsViewProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    isChannel?: boolean;

    onCommentsPress: () => void;
    onReactionsPress: () => void;
}

export const AsyncMessageReactionsView = React.memo<AsyncMessageReactionsViewProps>((props) => {
    const { reactionsReduced, reactionsLabel, commentsCount } = props.message;
    let theme = props.theme;

    if (!props.isChannel && props.message.reactions.length === 0 && commentsCount === 0) {
        return null;
    }

    return (
        <ASFlex alignItems="stretch" flexDirection="row" maxHeight={33} >
            <ASFlex renderModes={props.message.isOut ? undefined : rm({ 'selection': { marginLeft: 60 + 30 } })} flexGrow={1} justifyContent={props.message.isOut ? 'flex-end' : 'flex-start'} flexDirection="row" marginRight={props.message.isOut ? 16 : 0} marginLeft={props.message.isOut ? 0 : 60} marginTop={2} marginBottom={6} alignItems="center">
                {reactionsReduced.length > 0 && (
                    <ASFlex onPress={props.onReactionsPress}>
                        <ASFlex marginLeft={4} marginRight={8} height={32} alignItems="center" justifyContent="center">
                            {reactionsReduced.map((i) =>
                                (
                                    <ASImage key={'k' + i.reaction} marginLeft={4} source={reactionsImagesMap[i.reaction]} width={20} height={20} />
                                )
                            )}

                            {!!reactionsLabel && <ASText fontWeight={FontStyles.Weight.Medium} marginLeft={4} fontSize={13} key={'users'} color={theme.foregroundTertiary}>{reactionsLabel}</ASText>}
                        </ASFlex>
                    </ASFlex>
                )}

                {(props.isChannel || commentsCount > 0) && (
                    <ASFlex onPress={props.onCommentsPress}>
                        <ASFlex marginLeft={8} marginRight={8} height={32} alignItems="center" justifyContent="center">
                            {commentsCount <= 0 && <ASImage source={require('assets/ic-message-24.png')} tintColor={theme.accentPrimary} width={20} height={20} />}
                            {commentsCount > 0 && <ASImage source={require('assets/ic-message-filled-24.png')} tintColor={theme.accentPrimary} width={20} height={20} />}
                            {commentsCount > 0 && <ASText fontSize={13} fontWeight={FontStyles.Weight.Medium} marginLeft={4} color={theme.foregroundTertiary}>{commentsCount}</ASText>}
                        </ASFlex>
                    </ASFlex>
                )}
            </ASFlex>
        </ ASFlex>
    );
});