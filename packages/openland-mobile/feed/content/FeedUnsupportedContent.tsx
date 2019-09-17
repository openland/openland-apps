import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    box: {

    } as ViewStyle,
});

export const FeedUnsupportedContent = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View style={styles.box}>
            <Text style={{ color: theme.foregroundPrimary }} allowFontScaling={false}>
                Unsupported content
            </Text>
        </View>
    );
});