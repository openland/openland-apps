import * as React from 'react';
import { ZTouchable } from '../ZTouchable';
import { Image, View, Text, Platform } from 'react-native';
import { isAndroid } from '../../utils/isAndroid';
import { AppStyles } from '../../styles/AppStyles';

let image = isAndroid ?
    (
        <Image
            source={require('assets/ic-back.png')}
            style={{
                height: 24,
                width: 24,
                margin: 3,
                // marginLeft: 16,
                // marginRight: 16,
                // marginVertical: 16,
                resizeMode: 'center',
                tintColor: AppStyles.primaryColor
            }}
        />
    ) : (
        <Image
            source={require('assets/back-icon.png')}
            style={{
                height: 21,
                width: 13,
                marginLeft: 9,
                marginVertical: 12,
                resizeMode: 'contain',
                tintColor: AppStyles.primaryColor
            }}
        />
    );

export class ZHeaderBackButton extends React.PureComponent<{ inverted?: boolean, onPress?: () => void }> {
    render() {
        return (
            <ZTouchable onPress={this.props.onPress} style={{ margin: isAndroid ? 13 : 0, backgroundColor: 'transparent' }} hitSlop={isAndroid ? { top: 13, left: 13, bottom: 13, right: 13 } : undefined}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row' }}>
                    {image}
                    {Platform.OS === 'ios' && <Text style={{ height: 44, lineHeight: 44, marginLeft: 3, fontSize: 16, paddingRight: 10, color: this.props.inverted ? '#fff' : '#4747ec' }}>Back</Text>}
                </View>
            </ZTouchable>
        );
    }
}