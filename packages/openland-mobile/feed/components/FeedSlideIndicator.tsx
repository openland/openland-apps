import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, SecondarinessAlpha } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';

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
    onLayout: (event: LayoutChangeEvent) => void;
}

export const FeedSlideIndicator = React.memo((props: FeedSlideIndicatorProps) => {
    const theme = React.useContext(ThemeContext);
    const { current, items, style, onLayout } = props;

    const color = style === 'default' ? theme.foregroundTertiary : theme.foregroundContrast;
    const opacity = style === 'default' ? 1 : SecondarinessAlpha;

    return (
        <View style={styles.box} onLayout={onLayout}>
            <Text style={[styles.text, { color, opacity }]} allowFontScaling={false}>
                {current} / {items}
            </Text>
        </View>
    );
});