import * as React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity, View, Text, TextStyle, Image, ImageStyle } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        margin: -4
    } as ViewStyle,
    inner: {
        flexGrow: 1,
        height: 56,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row'
    } as ViewStyle,
    icon: {
        width: 24,
        height: 24,
        marginRight: 16,
    } as ImageStyle,
    text: {
        ...TextStyles.Label1
    } as TextStyle
});

interface FeedManageAddTextProps {
    onPress: () => void;
}

export const FeedManageAddText = React.memo((props: FeedManageAddTextProps) => {
    const { onPress } = props;
    const theme = useTheme();

    return (
        <View style={styles.box}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
                <View style={styles.inner}>
                    <Image source={require('assets/ic-sort-24.png')} style={[styles.icon, { tintColor: theme.foregroundContrast }]} />
                    <Text style={[styles.text, { color: theme.foregroundContrast }]} allowFontScaling={false}>Add text</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});