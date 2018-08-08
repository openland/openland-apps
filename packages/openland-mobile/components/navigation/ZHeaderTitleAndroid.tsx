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
            inputRange: [-0.98, 0, 0.98],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp'
        });
        let faraway = this.props.progress.interpolate({
            inputRange: [-1, -0.98, 0, 0.98, 1],
            outputRange: [1, 0, 0, 0, 1],
            extrapolate: 'clamp'
        });
        let progress = Animated.multiply(Animated.add(this.props.hairlineOffset, -56), 1 / 50);
        return (
            <View style={[styles.container, this.props.first && styles.containerFirst]} pointerEvents="box-none" flexDirection="row">
                <View pointerEvents="box-none" flexDirection="row" flexGrow={1} flexBasis={0}>
                    {this.props.titleView && (
                        <Animated.View
                            style={[
                                styles.titleContainer,
                                {
                                    opacity: opacity,
                                    transform: [{
                                        translateY: Animated.add(Animated.multiply(progress, 50), Animated.multiply(faraway, 1000))
                                    }, {
                                        translateX: this.props.first ? 0 : Animated.multiply(progress, -ZAppConfig.navigationBarBackWidth + 16)
                                    }]
                                }]
                            }
                            pointerEvents="box-none"
                        >
                            {this.props.titleView}
                        </Animated.View>
                    )}
                    {!this.props.titleView && (
                        <Animated.View
                            style={[
                                styles.titleContainer,
                                {
                                    opacity: opacity,
                                    transform: [{
                                        translateY: Animated.add(Animated.multiply(progress, 50), Animated.multiply(faraway, 1000))
                                    }, {
                                        translateX: this.props.first ? 0 : Animated.multiply(progress, -ZAppConfig.navigationBarBackWidth + 16)
                                    }]
                                }]
                            }
                            pointerEvents="box-none"
                        >
                            {!this.props.titleView && <Animated.Text style={[styles.title, { transform: [{ translateX: -52 }, { scale: Animated.add(1, progress) }, { translateX: 52 }] }]}>{this.props.titleText}</Animated.Text>}
                            {!this.props.titleView && this.props.subtitleText && <Text style={styles.subtitle}>{this.props.subtitleText}</Text>}
                        </Animated.View>
                    )}
                </View>
                <Animated.View paddingRight={15} style={{opacity: opacity}}>
                    {this.props.rightView}
                </Animated.View>
            </View >
        );
    }
}
