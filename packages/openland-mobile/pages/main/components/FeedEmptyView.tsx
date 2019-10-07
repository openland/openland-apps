import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

interface FeedEmptyViewProps {
    title: string;
    subtitle: string;
    action: string;
    onPress: () => void;
}

export const FeedEmptyView = React.memo((props: FeedEmptyViewProps) => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const { title, subtitle, action, onPress } = props;

    return (
        <View minHeight={Dimensions.get('screen').height - area.top - area.bottom} alignItems="center" justifyContent="center">
            <Image source={require('assets/feed/ic-feed-setup-200.png')} style={{ height: 200, resizeMode: 'cover' }} />
            <Text style={{ ...TextStyles.Title1, color: theme.foregroundPrimary, marginTop: 16, textAlign: 'center' }} allowFontScaling={false}>{title}</Text>
            <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary, marginTop: 8, marginBottom: 24, textAlign: 'center' }} allowFontScaling={false}>{subtitle}</Text>
            <ZRoundedButton title={action} size="large" onPress={onPress} />
        </View>
    );
});