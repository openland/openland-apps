import * as React from 'react';
import { FeedChannelFull } from 'openland-api/spacex.types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { View, StyleSheet, ViewStyle, Text, TouchableHighlight, Image } from 'react-native';
import { plural } from 'openland-y-utils/plural';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';

const styles = StyleSheet.create({
    avatar: {
        paddingHorizontal: 16,
        alignSelf: 'center',
    } as ViewStyle,
    info: {
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
    } as ViewStyle,
    btnBox: {
        paddingHorizontal: 16,
        alignSelf: 'center',
    } as ViewStyle,
    btn: {
        width: 56,
        height: 36,
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle
});

type FollowButtonState = 'can_follow' | 'loading' | 'done' | 'done_loading';
interface FollowButtonProps {
    state: FollowButtonState;
    onPress: () => void;
}

const FollowButton = React.memo((props: FollowButtonProps) => {
    const theme = React.useContext(ThemeContext);
    const { state, onPress } = props;

    const backgroundColor = state.startsWith('done') ? theme.backgroundTertiaryTrans : theme.accentPrimary;
    const tintColor = state.startsWith('done') ? theme.foregroundTertiary : theme.foregroundInverted;
    const underlayColor = state.startsWith('done') ? theme.backgroundTertiaryActive : theme.accentPrimaryActive;

    return (
        <TouchableHighlight
            style={[styles.btn, { backgroundColor }]}
            onPress={onPress}
            disabled={state.endsWith('loading')}
            underlayColor={underlayColor}
        >
            <View>
                {state === 'can_follow' && <Image source={require('assets/ic-add-24.png')} style={{ tintColor }} />}
                {(state === 'loading' || state === 'done_loading') && <LoaderSpinner size="small" color={tintColor} />}
                {state === 'done' && <Image source={require('assets/ic-done-24.png')} style={{ tintColor }} />}
            </View>
        </TouchableHighlight>
    );
});

interface ChannelViewProps {
    channel: FeedChannelFull;
}

export const ChannelView = (props: ChannelViewProps) => {
    const router = React.useContext(SRouterContext);
    const theme = React.useContext(ThemeContext);
    const { title, photo, id, subscribersCount, subscribed } = props.channel;
    const [btnState, setBtnState] = React.useState<FollowButtonState | undefined>(subscribed ? undefined : 'can_follow');

    const handlePress = React.useCallback(() => {
        if (router) {
            router.push('FeedChannel', { id });
        }
    }, [id]);

    const handleBtnPress = React.useCallback(async () => {
        if (btnState === 'can_follow') {
            setBtnState('loading');

            await FeedHandlers.ChannelSubscribe(id, false);

            setBtnState('done');
        } else if (btnState === 'done') {
            setBtnState('done_loading');

            await FeedHandlers.ChannelUnsubscribe(id, false);

            setBtnState('can_follow');
        }
    }, [id, btnState]);

    return (
        <ZListItemBase separator={false} height={56} onPress={handlePress}>
            <View style={styles.avatar}>
                <ZAvatar size="medium" photo={photo} id={id} title={title} />
            </View>
            <View style={styles.info}>
                <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
                    {plural(subscribersCount, ['follower', 'followers'])}
                </Text>
            </View>
            {!!btnState && (
                <View style={styles.btnBox}>
                    <FollowButton state={btnState} onPress={handleBtnPress} />
                </View>
            )}
        </ZListItemBase>
    );
};