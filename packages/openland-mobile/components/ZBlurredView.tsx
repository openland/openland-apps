import * as React from 'react';
import { ViewProps, View } from 'react-native';
import { BlurView } from 'react-native-blur';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const ZBlurredView = React.memo<ViewProps & { intensity?: 'normal' | 'high', fallbackColor?: string, blurType?: 'dark' | 'light', children?: any }>((props) => {
    let theme = React.useContext(ThemeContext);
    let { intensity, blurType, ...other } = props;
    if (SDevice.renderBlurSupported && (theme.blurType !== 'none' || blurType)) {
        return (
            <View {...other}>
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: !blurType ? theme.backgroundPrimary : undefined,
                        opacity: intensity === 'high' ? 0.9 : 0.8
                    }}
                />
                <BlurView
                    blurType={blurType || (theme.blurType as 'dark' | 'light')}
                    blurAmount={intensity === 'high' ? 15 : 10}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}
                />
                {props.children}
            </View>
        );
    } else {
        return (
            <View {...props} backgroundColor={props.fallbackColor || theme.backgroundPrimary}>
                {props.children}
            </View>
        );
    }
});