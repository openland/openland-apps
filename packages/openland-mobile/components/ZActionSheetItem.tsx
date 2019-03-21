import * as React from 'react';
import { Platform, Text, View, StyleSheet, TextStyle } from 'react-native';
import { ZListItem } from './ZListItem';
import { ZListItemBase } from './ZListItemBase';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 24,
        color: '#0084fe',
        paddingHorizontal: 16,
    } as TextStyle,

    textDanger: {
        color: '#ff3b30'
    } as TextStyle,

    textCancel: {
        fontWeight: TextStyles.weight.medium
    } as TextStyle
});

interface ZActionSheetItemProps {
    name: string;
    icon?: any;
    appearance?: 'default' | 'danger' | 'cancel';
    onPress: () => void;
    separator?: boolean;
}

export const ZActionSheetItem = (props: ZActionSheetItemProps) => {
    const theme = React.useContext(ThemeContext);

    if (Platform.OS === 'android') {
        return (
            <ZListItem
                leftIcon={props.icon}
                appearance={props.appearance === 'cancel' ? 'default' : props.appearance}
                text={props.name}
                onPress={props.onPress}
            />
        );
    } else {
        let textStyle = [
            styles.text,
            props.appearance === 'danger' ? styles.textDanger : undefined,
            props.appearance === 'cancel' ? styles.textCancel : undefined
        ];

        let separatorColor = 'rgba(63, 63, 63, 0.15)';

        if (theme.blurType === 'dark') {
            separatorColor = theme.separatorColor;
        }

        return (
            <ZListItemBase
                onPress={props.onPress}
                height={56}
                separator={props.separator}
                separatorColor={separatorColor}
            >
                <View alignItems="center" justifyContent="center" flexGrow={1} height={56}>
                    <Text style={textStyle} numberOfLines={1} allowFontScaling={false}>{props.name}</Text>
                </View>
            </ZListItemBase>
        );
    }
}

export const ZActionSheetViewItem = (props: { children?: any, separator?: boolean }) => {
    const theme = React.useContext(ThemeContext);
    let separatorColor = 'rgba(63, 63, 63, 0.15)';

    if (theme.blurType === 'dark') {
        separatorColor = theme.separatorColor;
    }

    return (
        <>
            {props.children}
            {props.separator !== false && <View style={{ backgroundColor: separatorColor, height: 1 }} />}
        </>
    );
}