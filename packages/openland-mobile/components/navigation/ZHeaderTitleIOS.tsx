import * as React from 'react';
import { Animated, View, Text, LayoutChangeEvent, LayoutAnimation, StyleSheet, TextStyle, Dimensions } from 'react-native';
import { ZHeaderTitleProps } from './ZHeaderTitle';
import { ZAppConfig } from '../ZAppConfig';

const styles = StyleSheet.create({
    title: {
        color: '#000',
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 44
    } as TextStyle,
    titleLarge: {
        color: '#000',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 52,
        paddingLeft: 15
    } as TextStyle
});

export class ZHeaderTitleIOS extends React.PureComponent<ZHeaderTitleProps, { leftSize?: number, rightSize?: number }> {
    containerWidth = new Animated.Value(0);
    opacity = this.props.progress.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    });
    translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), -0.5);
    titleProgress = new Animated.Value(0);
    showed = false;
    subscribedValue: Animated.Value | null = null;
    subscribed: string | null = null;

    constructor(props: ZHeaderTitleProps) {
        super(props);
        this.state = {};
    }

    private handleGlobalLayout = (event: LayoutChangeEvent) => {
        this.containerWidth.setValue(event.nativeEvent.layout.width);
    }

    private handleLeftLayout = (event: LayoutChangeEvent) => {
        let val = Math.round(event.nativeEvent.layout.width);
        if (this.state.leftSize !== undefined && this.state.rightSize !== undefined && this.state.leftSize !== val) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
        this.setState({ leftSize: val });
    }

    private handleRightLayout = (event: LayoutChangeEvent) => {
        let val = Math.round(event.nativeEvent.layout.width);
        // if (this.state.leftSize !== undefined && this.state.rightSize !== undefined && this.state.rightSize !== val) {
        //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        // }
        this.setState({ rightSize: val });
    }

    private handleOffset = (state: { value: number }) => {
        // console.log('Offset: ' + state.value);
        if (state.value > 22) {
            if (!this.showed) {
                this.showed = true;
                Animated.timing(this.titleProgress, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                }).start();
            }
        } else {
            if (this.showed) {
                this.showed = false;
                Animated.timing(this.titleProgress, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true
                }).start();
            }
        }
    }

    // private handleOffsetUpdate = (src: number) => {
    //     console.log('Offset update: ' + src);
    // }

    componentWillMount() {
        this.subscribed = this.props.contentOffset.addListener(this.handleOffset);
        this.subscribedValue = this.props.contentOffset;
        // this.handleOffsetUpdate(this.props.contentOffset.)
    }

    componentWillUnmount() {
        if (this.subscribed) {
            this.subscribedValue!!.removeListener(this.subscribed);
            this.subscribed = null;
            this.subscribedValue = null;
        }
    }

    componentWillReceiveProps(nextProps: ZHeaderTitleProps) {

        // Animate title/subtitle changes
        // if (this.props.titleText !== nextProps.titleText || this.props.subtitleText !== nextProps.subtitleText) {
        //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        // }

        // Recalculate animations
        if (this.props.progress !== nextProps.progress) {
            this.opacity = nextProps.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            this.translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), -0.5);
        }

        // Resubscribe
        if (this.subscribedValue !== nextProps.contentOffset) {
            if (this.subscribed) {
                this.subscribedValue!!.removeListener(this.subscribed);
                this.subscribed = null;
                this.subscribedValue = null;
            }
            this.subscribed = nextProps.contentOffset.addListener(this.handleOffset);
            this.subscribedValue = nextProps.contentOffset;
        }
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
        let titleOpacity = opacity;
        if (this.props.headerAppearance === 'large') {
            titleOpacity = Animated.multiply(opacity, this.titleProgress);
            // titleOpacity = Animated.multiply(opacity, this.props.hairlineOffset.interpolate({
            //     inputRange: [ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight, ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeightLarge],
            //     outputRange: [1, 0],
            //     extrapolate: 'clamp'
            // }));
        } else if (this.props.headerAppearance === 'small-hidden') {
            titleOpacity = Animated.multiply(opacity, this.titleProgress);
            // titleOpacity = Animated.multiply(opacity, this.props.contentOffset.interpolate({
            //     inputRange: [0, ZAppConfig.navigationBarHeight],
            //     outputRange: [0, 1],
            //     extrapolate: 'clamp'
            // }));
        }
        let largeOpacity = Animated.add(Animated.multiply(titleOpacity, -1), 1);

        const mainHeader = (
            <>
                {this.state.leftSize !== undefined && this.state.rightSize !== undefined && (
                    <View key="main-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap' }} pointerEvents="box-none">
                        <View style={{ flexGrow: this.state.leftSize, flexBasis: this.state.leftSize }} pointerEvents="box-none" />
                        {this.state.rightSize - this.state.leftSize > 0 && <View style={{ flexGrow: this.state.rightSize - this.state.leftSize, flexBasis: this.state.rightSize - this.state.leftSize, flexShrink: 100000 }} pointerEvents="box-none" />}
                        <Animated.View style={{ flexShrink: 1, flexDirection: 'row', opacity: titleOpacity, flexWrap: 'nowrap', transform: [{ translateX: this.translate }, { translateY: Animated.multiply(faraway, 10000) }] }} pointerEvents="box-none">
                            <View style={{ flexDirection: 'column' }} pointerEvents="box-none">
                                {!this.props.titleView && this.props.titleText && <Text style={styles.title}>{this.props.titleText}</Text>}
                                {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                                {this.props.titleView}
                            </View>
                        </Animated.View>
                        {this.state.rightSize - this.state.leftSize < 0 && <View style={{ flexGrow: -(this.state.rightSize - this.state.leftSize), flexBasis: -(this.state.rightSize - this.state.leftSize), flexShrink: 100000 }} pointerEvents="box-none" />}
                        <View style={{ flexGrow: this.state.rightSize, flexBasis: this.state.rightSize }} pointerEvents="box-none" />
                    </View>
                )}

                <View key="left-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100 }} onLayout={this.handleLeftLayout} pointerEvents="none">
                    <View width={this.props.index === 0 ? 0 : ZAppConfig.navigationBarBackWidth} pointerEvents="none" />
                </View>
                <View key="button-padding" style={{ flexGrow: 1, flexBasis: 0 }} pointerEvents="box-none" />
                <Animated.View key="right-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, opacity: opacity, alignItems: 'center', transform: [{ translateY: Animated.multiply(faraway, 10000) }] }} onLayout={this.handleRightLayout} pointerEvents="box-none">
                    {this.props.rightView}
                </Animated.View>
            </>
        );

        const largeHeader = this.props.headerAppearance === 'large' && (
            <View key="large-header" style={{ overflow: 'hidden', position: 'absolute', top: ZAppConfig.navigationBarHeight, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap', height: Dimensions.get('window').height }} pointerEvents="none">
                <Animated.View style={{ flexShrink: 1, flexDirection: 'row', flexWrap: 'nowrap', opacity: largeOpacity, transform: [{ translateX: this.translate }, { translateY: Animated.add(Animated.add(this.props.hairlineOffset, -(ZAppConfig.navigationBarHeightLarge + ZAppConfig.statusBarHeight)), Animated.multiply(faraway, 10000)) }] }} pointerEvents="none">
                    {!this.props.titleView && this.props.titleText && <Text style={styles.titleLarge}>{this.props.titleText}</Text>}
                    {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                </Animated.View>
            </View>
        );

        return (
            <View style={{ height: 44, flexDirection: 'row' }} onLayout={this.handleGlobalLayout} pointerEvents="box-none">
                {mainHeader}
                {largeHeader}
            </View>
        );
    }
}