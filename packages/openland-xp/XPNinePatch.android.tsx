import * as React from 'react';
import { ViewProps, View, StyleSheet, ViewStyle } from 'react-native';
import ImageCapInset from 'react-native-image-capinsets';

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    } as ViewStyle
});

export class XPNinePatch extends React.PureComponent<ViewProps & { source: any, capInsets: { top: number, bottom: number, right: number, left: number } }> {
    render() {
        const { source, capInsets, ...other } = this.props;
        return (
            <View {...other}>
                <ImageCapInset
                    source={source}
                    resizeMode="stretch"
                    capInsets={capInsets}
                    style={styles.image}
                />
            </View>
        );
    }
}