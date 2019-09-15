import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedDateItem } from 'openland-engines/feed/types';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 16,
        paddingTop: 19,
        paddingBottom: 3,
    } as ViewStyle,
    text: {
        ...TextStyles.Title2
    } as TextStyle,
});

interface FeedDateViewProps {
    item: DataSourceFeedDateItem;
}

export const FeedDateView = React.memo((props: FeedDateViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { label } = props.item;

    return (
        <View style={styles.box}>
            <Text style={[styles.text, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                {label}
            </Text>
        </View>
    );
});