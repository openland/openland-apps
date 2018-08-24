import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Animated, LayoutChangeEvent } from 'react-native';
import { DeviceConfig } from '../DeviceConfig';
import { FastHeaderTitleProps } from './FastHeaderTitle';
import { ASView } from 'react-native-async-view/ASView';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: DeviceConfig.navigationBarBackWidth
    } as ViewStyle,
    containerFirst: {
        paddingLeft: 16
    } as ViewStyle,
    titleContainer: {
        height: DeviceConfig.navigationBarHeightLarge,
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

export class FastHeaderTitleAndroid extends React.PureComponent<FastHeaderTitleProps> {
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
        let heightDiff = Animated.add(this.props.headerBaseHeight, -56);
        let progress = Animated.multiply(heightDiff, 1 / 40);
        // let horizontal = this.props.index === 0 ? 0 : Animated.multiply(progress, -DeviceConfig.navigationBarBackWidth + 16);
        return (
            <Animated.View style={[styles.container, this.props.index === 0 && styles.containerFirst, { opacity }]} pointerEvents="box-none" renderToHardwareTextureAndroid={true}>
                {/* <ASView style={{ flexDirection: 'row', flexGrow: 1, flexBasis: 0, height: 56 }}>
                    <ASFlex flexDirection="row" width={300}>
                        <ASText fontSize={32} color="#040404">{this.props.titleText}</ASText>
                    </ASFlex>
                </ASView> */}
                {/* <View pointerEvents="box-none" flexDirection="row" flexGrow={1} flexBasis={0} onLayout={this.handleLayout}>
                    <Text>{this.props.titleText}</Text>
                </View> */}

                <View pointerEvents="box-none" flexDirection="row" flexGrow={1} flexBasis={0}>
                    {this.props.titleView && (
                        <View
                            style={styles.titleContainer}
                            onLayout={this.handleLayout}
                            pointerEvents="box-none"
                        >
                            {this.props.titleView}
                        </View>
                    )}
                    {!this.props.titleView && (
                        <View
                            style={styles.titleContainer}
                            pointerEvents="box-none"
                            renderToHardwareTextureAndroid={true}
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
                                                { translateY: heightDiff },
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
                                    renderToHardwareTextureAndroid={true}
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
                                                { translateY: heightDiff },
                                                { translateX: Animated.multiply(this.title2W, -0.5) },
                                                { translateY: 6 },
                                                { scale: Animated.add(Animated.multiply(progress, 0.6), 1) },
                                                { translateY: -6 },
                                                { translateX: Animated.multiply(this.title2W, 0.5) }]
                                        }
                                    ]}
                                    onLayout={this.handleLayout2}
                                    pointerEvents="none"
                                    renderToHardwareTextureAndroid={true}
                                >
                                    <Text style={[styles.title, { fontSize: 20 }]}>{this.props.titleText}</Text>
                                </Animated.View>
                            )}
                        </View>
                    )}
                </View>
                <View paddingRight={15} pointerEvents="box-none" renderToHardwareTextureAndroid={true}>
                    {this.props.rightView}
                </View>
            </Animated.View>
        );
    }
}
