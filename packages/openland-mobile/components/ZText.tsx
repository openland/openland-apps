import * as React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { isAndroid } from '../utils/isAndroid';

const styles = StyleSheet.create({
    default: {
        includeFontPadding: true,
        color: '#000',
        opacity: isAndroid ? 0.8 : 1.0,
        backgroundColor: 'transparent'
    } as TextStyle
});

const systemStyles = StyleSheet.create({
    '100': {
        fontFamily: 'Roboto-Thin'
    } as TextStyle,
    '300': {
        fontFamily: 'Roboto-Light'
    } as TextStyle,
    '400': {
        fontFamily: 'Roboto-Regular'
    } as TextStyle,
    '500': {
        fontFamily: 'Roboto-Medium'
    } as TextStyle,
    '700': {
        fontFamily: 'Roboto-Bold'
    } as TextStyle,
    '900': {
        fontFamily: 'Roboto-Black'
    } as TextStyle
});

export interface ZTextProps {
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}

export class ZText extends React.PureComponent<ZTextProps> {
    render() {
        let weight: any = undefined;
        let flatten = StyleSheet.flatten([styles.default, weight, this.props.style]);
        if (isAndroid) {
            if (flatten.fontWeight) {
                if (flatten.fontWeight in systemStyles) {
                    flatten = StyleSheet.flatten([flatten, systemStyles[flatten.fontWeight]]);
                    flatten.fontWeight = undefined;
                }
            }
        }
        return (
            <Text ellipsizeMode={this.props.ellipsizeMode} style={[styles.default, weight, this.props.style]}>{this.props.children}</Text>
        );
    }
}