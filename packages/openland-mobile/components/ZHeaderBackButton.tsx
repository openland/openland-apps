import * as React from 'react';
import { ZTouchable } from './ZTouchable';
import { Image } from 'react-native';
import ViewOverflow from 'react-native-view-overflow';
import { isAndroid } from '../utils/isAndroid';

let image = isAndroid ?
    (
        <Image
            source={require('assets/ic-back.png')}
            style={{
                height: 24,
                width: 24,
                marginLeft: 16,
                marginRight: 16,
                marginVertical: 16,
                resizeMode: 'center',
                tintColor: '#fff'
            }}
        />
    ) : (
        <Image
            source={require('assets/back-icon.png')}
            style={{
                height: 21,
                width: 13,
                marginLeft: 9,
                marginRight: 22,
                marginVertical: 12,
                resizeMode: 'contain',
                tintColor: '#fff'
            }}
        />
    );

export class ZHeaderBackButton extends React.PureComponent<{ onPress: () => void }> {
    render() {
        return (
            <ViewOverflow>
                <ZTouchable onPress={this.props.onPress}>
                    {image}
                </ZTouchable>
            </ViewOverflow>
        );
    }
}