import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        borderRadius: 13,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 12
    } as ViewStyle,
    containerBig: {
        backgroundColor: '#0084fe',
        borderRadius: 18,
        height: 56,
        paddingLeft: 19,
        paddingRight: 19,
    } as ViewStyle,
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlignVertical: 'center'
    } as TextStyle,
    titleBig: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
                        <Text style={this.props.style === 'big' ? styles.titleBig : styles.title}>{this.props.uppercase !== false ? this.props.title.toUpperCase() : this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);