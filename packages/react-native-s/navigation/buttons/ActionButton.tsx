import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { STouchable } from 'react-native-s/STouchable';
import { XMemo } from 'openland-y-utils/XMemo';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

export class ActionButton extends React.PureComponent<{ title: string, icon?: any, tintColor?: string, onPress?: () => void }> {
    render() {
        const { title, tintColor, icon, onPress } = this.props;

        if (icon) {
            return (
                <STouchable onPress={onPress}>
                    <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icon} style={{ width: 26, height: 26, tintColor: tintColor || '#78808F' }} resizeMode="contain" />
                    </View>
                </STouchable>
            );
        }

        return (
            <STouchable onPress={onPress}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[TypeStyles.label1, { marginLeft: 12, marginRight: 12, color: tintColor || '#78808F' }]} allowFontScaling={false}>{title}</Text>
                </View>
            </STouchable>
        );
    }
}

export const ActionButtonView = XMemo<{ onPress?: () => void; children?: any }>((props) => (
    <STouchable style={{ alignItems: 'center', justifyContent: 'center', padding: 4, margin: 8, backgroundColor: 'transparent' }} onPress={props.onPress}>
        {props.children}
    </STouchable>
));