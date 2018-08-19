import * as React from 'react';
import { ViewProps, View, Image, StyleSheet, ViewStyle, ImageBackground } from 'react-native';

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
                <ImageBackground
                    source={Image.resolveAssetSource(source)}
                    resizeMode="stretch"
                    capInsets={capInsets}
                    style={styles.image}
                />
            </View>
        );
    }
}