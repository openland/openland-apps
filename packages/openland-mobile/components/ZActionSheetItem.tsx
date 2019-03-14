import * as React from 'react';
import { Platform, Text, View, StyleSheet, TextStyle } from 'react-native';
import { ZListItem } from './ZListItem';
import { ZListItemBase } from './ZListItemBase';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface ZActionSheetItemProps {
    name: string;
    icon?: any;
    appearance?: 'default' | 'danger' | 'cancel';
    onPress: () => void;
    separator?: boolean;
}

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
})

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