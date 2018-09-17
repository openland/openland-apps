import * as React from 'react';
import { ViewProps, View } from 'react-native';
import { BlurView } from 'react-native-blur';
import { SDevice } from 'react-native-s/SDevice';

export class ZBlurredView extends React.PureComponent<ViewProps & { intensity?: 'normal' | 'high' }> {
    render() {
        let { intensity, ...other } = this.props;
        if (SDevice.renderBlurSupported) {
            return (
                <View {...other}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: '#fff',
                            opacity: intensity === 'high' ? 0.9 : 0.8
                        }}
                    />
                    <BlurView
                        blurType="light"
                        blurAmount={intensity === 'high' ? 15 : 10}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }}
                    />
                    {this.props.children}
                </View>
            );
        } else {
            return (
                <View {...this.props} backgroundColor="#fff">
                    {this.props.children}
                </View>
            );
        }
    }
}