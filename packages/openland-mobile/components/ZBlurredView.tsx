import * as React from 'react';
import { ViewProps, View } from 'react-native';
import { ZAppConfig } from './ZAppConfig';
import { BlurView } from 'react-native-blur';

export class ZBlurredView extends React.PureComponent<ViewProps & { intensity?: 'normal' | 'high' }> {
    render() {
        let { intensity, ...other } = this.props;
        if (ZAppConfig.enableBlur) {
            return (
                <View {...other}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: ZAppConfig.navigationBarBackgroundColor,
                            opacity: intensity === 'high' ? 0.9 : 0.6
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
                <View {...this.props}>
                    {this.props.children}
                </View>
            );
        }
    }
}