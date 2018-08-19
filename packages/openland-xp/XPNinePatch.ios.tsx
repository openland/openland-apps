import * as React from 'react';
import { ViewProps, View, StyleSheet, ViewStyle, requireNativeComponent, Image } from 'react-native';

const AggressiveImage = requireNativeComponent('AggressiveImage') as any;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    } as ViewStyle
});

export class XPNinePatch extends React.PureComponent<ViewProps & { source: any, capInsets: { top: number, bottom: number, right: number, left: number } }> {
    render() {
        const { source, capInsets, ...other } = this.props;
        return (
            <View {...other}>
                <AggressiveImage
                    // capInsets={capInsets}
                    source={Image.resolveAssetSource(source).uri}
                    style={styles.image}
                />
            </View>
        );
    }
}