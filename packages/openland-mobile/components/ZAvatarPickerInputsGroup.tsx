import * as React from 'react';
import { View, Platform } from 'react-native';
import { ZAvatarPicker } from './ZAvatarPicker';

export const ZAvatarPickerInputsGroup = (props: { avatarField: string; children?: any }) => {
    if (Platform.OS === 'android') {
        return (
            <View style={{ marginTop: -2, paddingLeft: 16, height: 100, flexDirection: 'row' }}>
                <View style={{ marginTop: 14 }}>
                    <ZAvatarPicker field={props.avatarField} size={86} />
                </View>
                <View
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                >
                    {props.children}
                </View>
            </View>
        );
    }

    return (
        <View style={{ paddingLeft: 16, marginTop: 15, flexDirection: 'row' }}>
            <ZAvatarPicker field={props.avatarField} />
            <View
                flex={1}
                flexDirection="column"
                justifyContent="center"
            >
                {props.children}
            </View>
        </View>
    );
}