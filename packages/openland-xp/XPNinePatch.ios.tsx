import * as React from 'react';
import { ViewProps, View, StyleSheet, ViewStyle, requireNativeComponent, Image } from 'react-native';
import { AggressiveImageIOS } from './platform/AggressiveImageIOS';

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    } as ViewStyle
});

export class XPNinePatch extends React.PureComponent<ViewProps & { source: any, capInsets: { top: number, bottom: number, right: number, left: number } }> {
    render() {
        const { source, capInsets, ...other } = this.props;
        const resolved = Image.resolveAssetSource(source);
        if (resolved.uri.startsWith('file://')) {
            return (
                <View {...other}>
                    <AggressiveImageIOS
                        capInsets={capInsets}
                        source={resolved.uri}
                        style={styles.image}
                    />
                </View>
            );
        } else {
            return (
                <View {...other}>
                    <Image
                        resizeMode="stretch"
                        capInsets={capInsets}
                        source={resolved}
                        style={styles.image}
                    />
                </View>
            );
        }
    }
}