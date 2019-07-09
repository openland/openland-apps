import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { XMemo } from 'openland-y-utils/XMemo';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

export class ActionButtonIOS extends React.PureComponent<{ title: string, tintColor?: string, icon?: any, onPress?: () => void }> {
    render() {
        const { title, tintColor, icon, onPress } = this.props;

        if (icon) {
            return (
                <TouchableOpacity onPress={onPress} hitSlop={{ bottom: 8, top: 8, left: 8, right: 8 }}>
                    <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icon} style={{ width: 26, height: 26, tintColor: tintColor || '#78808F' }} resizeMode="contain" />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity onPress={onPress} hitSlop={{ bottom: 8, top: 8, left: 8, right: 8 }}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[TypeStyles.label1, { marginLeft: 12, marginRight: 12, color: tintColor || '#78808F' }]} allowFontScaling={false}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export const ActionButtonIOSView = XMemo<{ onPress?: () => void; children?: any }>((props) => (
    <TouchableOpacity onPress={props.onPress} hitSlop={{ bottom: 8, top: 8, left: 8, right: 8 }}>
        <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
            {props.children}
        </View>
    </TouchableOpacity>
));