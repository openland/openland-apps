import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4747ec',
        borderRadius: 13,
        height: 26,
        paddingLeft: 12,
        paddingRight: 12
    } as ViewStyle,
    title: {
        color: '#fff',
        lineHeight: 26,
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase'
    } as TextStyle
});

export interface ZRoundedButtonProps {
    title: string;
    onPress?: () => void;
    path?: string;
}

class ZRoundedButtonComponent extends React.PureComponent<ZRoundedButtonProps & NavigationInjectedProps> {
    handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            this.props.navigation.navigate(this.props.path);
        }
    }
    render() {
        return (
            <View backgroundColor={'#000'} borderRadius={13}>
                <TouchableOpacity onPress={this.handlePress} activeOpacity={0.6}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export const ZRoundedButton = withNavigation<ZRoundedButtonProps>(ZRoundedButtonComponent);