import * as React from 'react';
import { SNavigationViewStyle } from '../../SNavigationView';
import { View } from 'react-native';
import { SDevice } from '../../SDevice';

export class HeaderComponent extends React.PureComponent<{ style: SNavigationViewStyle }> {
    render() {
        return (
            <View
                style={{
                    height: SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top,
                    width: '100%',
                    backgroundColor: this.props.style.backgroundColor
                }}
            >
                {}
            </View>
        );
    }
}