import * as React from 'react';
import { ViewProps, View, Image, StyleSheet, ViewStyle } from 'react-native';

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
                <Image
                    capInsets={capInsets}
                    resizeMode="repeat"
                    source={source}
                    style={styles.image}
                />F
            </View>
        );
    }
}