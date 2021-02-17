
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import * as React from 'react';
import { View, StyleSheet, ViewStyle, TouchableHighlight, Image } from 'react-native';
import { LoaderSpinner } from './LoaderSpinner';
import Toast from './Toast';

const styles = StyleSheet.create({
    btn: {
        width: 56,
        height: 36,
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle
});

type FollowButtonState = 'initial' | 'loading' | 'done';

export const ZFollowButton = React.memo((props: {
    isFollowing: boolean,
    isPremium?: boolean,
    onPress: () => Promise<any>
}) => {
    const theme = useTheme();
    let [state, setState] = React.useState<FollowButtonState>(props.isFollowing ? 'done' : 'initial');
    let handleBtnPress = async () => {
        if (!props.isPremium) {
            setState('loading');
        }
        try {
            await props.onPress();
            setState('done');
        } catch (e) {
            Toast.failure();
        }
    };

    React.useEffect(() => {
        setState(props.isFollowing ? 'done' : 'initial');
    }, [props.isFollowing]);

    const tintColor = state === 'done'
        ? theme.foregroundTertiary
        : theme.foregroundInverted;
    const backgroundColor = state === 'done'
        ? theme.backgroundTertiaryTrans
        : props.isPremium
            ? theme.accentPay
            : theme.accentPrimary;
    const underlayColor = state === 'done'
        ? theme.backgroundTertiaryActive
        : props.isPremium
            ? theme.accentPayActive
            : theme.accentPrimaryActive;

    return (
        <TouchableHighlight
            style={[styles.btn, { backgroundColor }]}
            onPress={handleBtnPress}
            disabled={state === 'loading' || state === 'done'}
            underlayColor={underlayColor}
        >
            <View>
                {state === 'initial' && <Image source={require('assets/ic-add-24.png')} style={{ tintColor }} />}
                {state === 'loading' && <LoaderSpinner size="small" color={tintColor} />}
                {state === 'done' && <Image source={require('assets/ic-done-24.png')} style={{ tintColor }} />}
            </View>
        </TouchableHighlight>
    );
});
