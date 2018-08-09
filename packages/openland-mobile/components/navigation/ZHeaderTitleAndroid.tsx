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
        height: ZAppConfig.navigationBarHeightLarge,
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    } as ViewStyle,
    title: {
        textAlign: 'left',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 56,
        height: 56,
        color: '#040404'
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
    titleW = new Animated.Value(0);
    titleH = new Animated.Value(0);
    title2W = new Animated.Value(0);
    title2H = new Animated.Value(0);
    handleLayout = (event: LayoutChangeEvent) => {
        this.titleW.setValue(event.nativeEvent.layout.width);
        this.titleH.setValue(event.nativeEvent.layout.height);
    }
    handleLayout2 = (event: LayoutChangeEvent) => {
        this.title2W.setValue(event.nativeEvent.layout.width);
        this.title2H.setValue(event.nativeEvent.layout.height);
    }
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
        let progress = Animated.multiply(Animated.add(this.props.hairlineOffset, -56), 1 / 40);
        return (
            <View style={[styles.container, this.props.index === 0 && styles.containerFirst]} pointerEvents="box-none" flexDirection="row">
                <View pointerEvents="box-none" flexDirection="row" flexGrow={1} flexBasis={0}>
                    {this.props.titleView && (
                        <Animated.View
                            style={[
                                styles.titleContainer,
                                {
                                    opacity: opacity,
                                    transform: [{
                                        translateY: Animated.add(Animated.multiply(progress, 40), Animated.multiply(faraway, 1000))
                                    }, {
                                        translateX: this.props.index === 0 ? 0 : Animated.multiply(progress, -ZAppConfig.navigationBarBackWidth + 16)
                                    }]
                                }]
                            }
                            onLayout={this.handleLayout}
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
                                        translateX: this.props.index === 0 ? 0 : Animated.multiply(progress, -ZAppConfig.navigationBarBackWidth + 16)
                                    }]
                                }]
                            }

                            pointerEvents="box-none"
                        >
                            {!this.props.titleView && (
                                <Animated.View
                                    style={[
                                        {
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            right: 0,
                                            opacity: progress,
                                            transform: [
                                                { translateY: Animated.add(Animated.multiply(progress, 40), Animated.multiply(faraway, 1000)) },
                                                { translateX: Animated.multiply(this.titleW, -0.5) },
                                                // { translateY: -5 },
                                                { translateY: 6 },
                                                { scale: Animated.multiply(Animated.add(Animated.multiply(progress, 0.6), 1), 1 / 1.6) },
                                                { translateY: -9 },
                                                { translateX: Animated.multiply(this.titleW, 0.5) }]
                                        }
                                    ]}
                                    onLayout={this.handleLayout}
                                    pointerEvents="none"
                                >
                                    <Text style={[styles.title]}>{this.props.titleText}</Text>
                                </Animated.View>
                            )}
                            {!this.props.titleView && (
                                <Animated.View
                                    style={[
                                        {
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            right: 0,
                                            opacity: Animated.add(Animated.multiply(progress, -1), 1),
                                            // opacity: 0.7,
                                            transform: [
                                                { translateY: Animated.add(Animated.multiply(progress, 40), Animated.multiply(faraway, 1000)) },
                                                { translateX: Animated.multiply(this.title2W, -0.5) },
                                                { translateY: 6 },
                                                { scale: Animated.add(Animated.multiply(progress, 0.6), 1) },
                                                { translateY: -6 },
                                                { translateX: Animated.multiply(this.title2W, 0.5) }]
                                        }
                                    ]}
                                    onLayout={this.handleLayout2}
                                    pointerEvents="none"
                                >
                                    <Text style={[styles.title, { fontSize: 20 }]}>{this.props.titleText}</Text>
                                </Animated.View>
                            )}
                        </Animated.View>
                    )}
                </View>
                <Animated.View paddingRight={15} style={{ opacity: opacity }} pointerEvents="box-none">
                    {this.props.rightView}
                </Animated.View>
            </View >
        );
    }
}
