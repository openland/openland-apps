import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
    box: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    text: {
        ...TextStyles.Caption,
    } as TextStyle,
});

interface FeedSlideIndicatorProps {
    current: number;
    items: number;
    style: 'default' | 'media';
}

export const FeedSlideIndicator = React.memo((props: FeedSlideIndicatorProps) => {
    const theme = React.useContext(ThemeContext);
    const { current, items, style } = props;

    const color = style === 'default' ? theme.foregroundPrimary : theme.foregroundContrast;
    const opacity = style === 'default' ? 1 : 0.56;

    return (
        <View style={styles.box}>
            <Text style={[styles.text, { color, opacity }]} allowFontScaling={false}>
                {current} / {items}
            </Text>
        </View>
    );
});