import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 16,
        flexGrow: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    } as ViewStyle,
    textLarge: {
        ...TextStyles.Post1
    } as TextStyle,
    textMedium: {
        ...TextStyles.Post2
    } as TextStyle,
    text: {
        ...TextStyles.Body
    } as TextStyle,
});

interface FeedUnsupportedContentProps {
    fallback: string;
}

export const FeedUnsupportedContent = React.memo((props: FeedUnsupportedContentProps) => {
    const theme = React.useContext(ThemeContext);
    const { fallback } = props;
    const text = fallback.length > 0 ? fallback.trim() : 'Unsupported content'
    const textStyle = text.length < 200 ? (text.length < 100 ? styles.textLarge : styles.textMedium) : styles.text;

    return (
        <View style={styles.box}>
            <Text style={[textStyle, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                {text}
            </Text>
        </View>
    );
});