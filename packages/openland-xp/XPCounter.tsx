import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { XPStyles } from './XPStyles';

const styles = StyleSheet.create({
    container: {
        height: 16,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: XPStyles.colors.brand,
        borderRadius: 8,
        minWidth: 16,
        flexDirection: 'row',
    } as ViewStyle,
    containerMuted: {
        backgroundColor: '#bcc3cc'
    } as ViewStyle,
    text: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 12,
        minWidth: 8,
        textAlign: 'center',
        marginTop: 3,
    } as TextStyle
});

export class XPCounter extends React.PureComponent<{ value: number | string, muted?: boolean }> {
    render() {
        return (
            <View style={[styles.container, this.props.muted && styles.containerMuted]}>
                <Text style={styles.text}>{this.props.value}</Text>
            </View>
        );
    }
}