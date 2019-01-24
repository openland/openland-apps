import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';

type ZRoundedButtonStyle = 'default' | 'flat' | 'danger' | 'flat-danger';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        height: 26,
        paddingHorizontal: 12,
    } as ViewStyle,
    containerBig: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        height: 35,
        paddingHorizontal: 19,
    } as ViewStyle,
    title: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        fontSize: 14,
    } as TextStyle,
    titleBig: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        fontSize: 16,
        height: 56,
        lineHeight: 56,
        letterSpacing: 0.2
    } as TextStyle
});

export interface ZRoundedButtonProps {
    title: string;
    onPress?: () => void;
    path?: string;
    size?: 'big';
    style?: ZRoundedButtonStyle
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
            <View borderRadius={this.props.size === 'big' ? 18 : 13}>
                <TouchableOpacity onPress={this.handlePress} activeOpacity={0.6}>
                    <View
                        style={[
                            this.props.size === 'big' ? styles.containerBig : styles.container,
                            {
                                ...this.props.style === 'flat' ? { backgroundColor: 'transparent' } :
                                    this.props.style === 'danger' ? { backgroundColor: '#ff3b30' } :
                                        this.props.style === 'flat-danger' ? { backgroundColor: 'transparent' } : {}
                            }
                        ]}

                    >
                        <Text
                            style={[
                                this.props.size === 'big' ? styles.titleBig : styles.title,
                                {
                                    ...this.props.style === 'flat' ? { color: '#0084fe' } :
                                        this.props.style === 'danger' ? { color: '#fff' } :
                                            this.props.style === 'flat-danger' ? { color: '#ff3b30' } : {}
                                }
                            ]}

                        >
                            {this.props.uppercase !== false ? this.props.title.toUpperCase() : this.props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);