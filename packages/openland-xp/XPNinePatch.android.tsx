import * as React from 'react';
import { ViewProps, View, StyleSheet, ViewStyle, requireNativeComponent } from 'react-native';

const RCTImageCapInset = requireNativeComponent('RCTImageCapInset') as any;

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    } as ViewStyle
});

export class XPNinePatch extends React.PureComponent<ViewProps & { source: any, capInsets: { top: number, bottom: number, right: number, left: number } }> {
    render() {
        const { source, capInsets, ...other } = this.props;
        const resolved = require('react-native/Libraries/Image/resolveAssetSource')(source);
        console.log(resolved);
        return (
            <View {...other}>
                <RCTImageCapInset
                    capInsets={capInsets}
                    resizeMode="stretch"
                    source={resolved}
                    style={styles.image}
                />
            </View>
        );
    }
}