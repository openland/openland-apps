import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Animated, LayoutChangeEvent } from 'react-native';
import { ZHeaderTitleProps } from './ZHeaderTitle';
import { ZAppConfig } from '../ZAppConfig';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: ZAppConfig.navigationBarBackWidth
    } as ViewStyle,
    containerFirst: {
        paddingLeft: 16
    } as ViewStyle,
    titleContainer: {
        height: 56,
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'center',
        alignItems: 'flex-start'
    } as ViewStyle,
    title: {
        textAlign: 'left',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20,
        color: '#000'
    } as TextStyle,
    subtitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 20,
        color: '#000',
        opacity: 0.4
    } as TextStyle
});

export class ZHeaderTitleAndroid extends React.PureComponent<ZHeaderTitleProps> {
    render() {
        let opacity = this.props.progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 1, 0],
        });
        let progress = Animated.multiply(Animated.add(this.props.hairlineOffset, -56), 1 / 50);
        return (
            <View style={[styles.container, this.props.first && styles.containerFirst]}>
                {this.props.titleView && (
                    <View style={styles.titleContainer}>
                        {this.props.titleView}
                    </View>
                )}
                {!this.props.titleView && (
                    <Animated.View
                        style={[
                            styles.titleContainer,
                            {
                                opacity: opacity,
                                transform: [{
                                    translateY: Animated.multiply(progress, 50)
                                }, {
                                    translateX: this.props.first ? 0 : Animated.multiply(progress, -ZAppConfig.navigationBarBackWidth + 16)
                                }]
                            }]
                        }
                    >
                        {!this.props.titleView && <Animated.Text style={[styles.title, { transform: [{ translateX: -52 }, { scale: Animated.add(1, progress) }, { translateX: 52 }] }]}>{this.props.titleText}</Animated.Text>}
                        {!this.props.titleView && this.props.subtitleText && <Text style={styles.subtitle}>{this.props.subtitleText}</Text>}
                    </Animated.View>
                )}
            </View >
        );
    }
}
