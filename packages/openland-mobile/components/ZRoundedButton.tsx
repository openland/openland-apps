import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyles.primaryColor,
        borderRadius: 13,
        height: 26,
        paddingLeft: 12,
        paddingRight: 12
    } as ViewStyle,
    containerBig: {
        backgroundColor: AppStyles.primaryColor,
        borderRadius: 18,
        height: 56,
        paddingLeft: 19,
        paddingRight: 19,
    } as ViewStyle,
    title: {
        color: '#fff',
        lineHeight: 26,
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase'
    } as TextStyle,
    titleBig: {
        color: '#fff',
        lineHeight: 56,
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.2
    } as TextStyle
});

export interface ZRoundedButtonProps {
    title: string;
    onPress?: () => void;
    path?: string;
    style?: 'big';
    uppercase?: boolean;
}

class ZRoundedButtonComponent extends React.PureComponent<ZRoundedButtonProps & { router: SRouter }> {
    handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            this.props.router.push(this.props.path);
        }
    }
    render() {
        return (
            <View backgroundColor={'#000'} borderRadius={this.props.style === 'big' ? 18 : 13}>
                <TouchableOpacity onPress={this.handlePress} activeOpacity={0.6}>
                    <View style={this.props.style === 'big' ? styles.containerBig : styles.container}>
                        <Text style={[this.props.style === 'big' ? styles.titleBig : styles.title, this.props.uppercase === false ? { textTransform: 'none' } : {}]}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);