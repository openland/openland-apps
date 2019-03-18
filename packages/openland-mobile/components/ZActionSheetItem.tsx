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
        color: "#0084fe"
    } as TextStyle,

    textDanger: {
        color: "#ff3b30"
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

        return (
            <ZListItemBase
                onPress={props.onPress}
                height={56}
                separator={props.separator}
            >
                <View alignItems="center" justifyContent="center" flexGrow={1} height={56}>
                    <Text style={textStyle}>{props.name}</Text>
                </View>
            </ZListItemBase>
        );
    }
}

export const ZActionSheetViewItem = (props: { children?: any, separator?: boolean }) => {
    const theme = React.useContext(ThemeContext);

    return (
        <>
            {props.children}
            {props.separator !== false && <View style={{ backgroundColor: theme.separatorColor, height: 1 }} />}
        </>
    );
}