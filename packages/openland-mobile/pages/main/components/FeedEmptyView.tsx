import * as React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 48
    } as ViewStyle,
    image: {
        height: 200,
        resizeMode: 'cover'
    } as ImageStyle,
    title: {
        ...TextStyles.Title1,
        marginTop: 16,
        textAlign: 'center'
    } as TextStyle,
    subtitle: {
        ...TextStyles.Body,
        marginTop: 8,
        marginBottom: 24,
        textAlign: 'center'
    } as TextStyle
});

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
        <View style={styles.box} minHeight={Dimensions.get('screen').height - area.top - area.bottom}>
            <Image source={require('assets/feed/ic-feed-setup-200.png')} style={styles.image} />

            <Text style={[styles.title, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                {title}
            </Text>

            <Text style={[styles.subtitle, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                {subtitle}
            </Text>

            <ZRoundedButton title={action} size="large" onPress={onPress} />
        </View>
    );
});

interface FeedChannelEmptyViewProps {
    title: string;
}

export const FeedChannelEmptyView = React.memo((props: FeedChannelEmptyViewProps) => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const { title } = props;

    return (
        <View style={styles.box} minHeight={Dimensions.get('screen').height - area.top - area.bottom}>
            <Text style={[styles.subtitle, { color: theme.foregroundTertiary }]} allowFontScaling={false}>
                {title}
            </Text>
        </View>
    );
});