import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    box: {

    } as ViewStyle,
});

export const FeedUnsupportedContent = React.memo(() => {
    return (
        <View style={styles.box}>
            <Text>
                Unsupported content
            </Text>
        </View>
    );
});