import * as React from 'react';
import { ViewProps, View, Platform, AccessibilityInfo } from 'react-native';
import { BlurView } from 'react-native-blur';

export class SBlurView extends React.PureComponent<ViewProps & { intensity?: 'normal' | 'high', color: string, blurType: 'dark' | 'light' | 'none' }> {
    state = {
        blurDisable: false
    };
    componentDidMount() {
        if (Platform.OS === 'ios') {
            AccessibilityInfo.addEventListener(
                "reduceTransparencyChanged",
                this._handleReduceTransparencyChanged
            );
            AccessibilityInfo.isReduceTransparencyEnabled().then(
                (tEnable: boolean) => {
                    this._handleReduceTransparencyChanged(tEnable);
                }
            );
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            AccessibilityInfo.removeEventListener(
                'reduceTransparencyChanged',
                this._handleReduceTransparencyChanged
            );
        }
    }
    _handleReduceTransparencyChanged = (tEnable: boolean) => {
        this.setState({ blurDisable: tEnable });
    }
    render() {
        let { intensity, blurType, ...other } = this.props;
        if (Platform.OS === 'ios' && blurType !== 'none' && !this.state.blurDisable) {
            return (
                <View {...other}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: this.props.color,
                            opacity: intensity === 'high' ? 0.9 : 0.8
                        }}
                    />
                    <BlurView
                        blurType={blurType}
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
                <View {...this.props} style={[this.props.style, { backgroundColor: this.props.color }]}>
                    {this.props.children}
                </View>
            );
        }
    }
}