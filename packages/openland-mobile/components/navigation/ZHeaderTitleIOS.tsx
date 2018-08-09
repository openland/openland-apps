import * as React from 'react';
import { Animated, View, Text, LayoutChangeEvent, LayoutAnimation, StyleSheet } from 'react-native';
import { ZHeaderTitleProps } from './ZHeaderTitle';
import { ZAppConfig } from '../ZAppConfig';

const style = StyleSheet.create({

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
        if (state.value > 0) {
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
        let titleOpacity = opacity;
        if (this.props.headerAppearance === 'large') {
            titleOpacity = Animated.multiply(opacity, this.titleProgress);
            // titleOpacity = Animated.multiply(opacity, this.props.hairlineOffset.interpolate({
            //     inputRange: [ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight, ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeightLarge],
            //     outputRange: [1, 0],
            //     extrapolate: 'clamp'
            // }));
        } else if (this.props.headerAppearance === 'small-hidden') {
            titleOpacity = Animated.multiply(opacity, this.props.contentOffset.interpolate({
                inputRange: [0, ZAppConfig.navigationBarHeight],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            }));
        }
        return (
            <View style={{ height: 44, flexDirection: 'row' }} onLayout={this.handleGlobalLayout}>
                {this.state.leftSize !== undefined && this.state.rightSize !== undefined && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <View style={{ flexGrow: this.state.leftSize, flexBasis: this.state.leftSize }} />
                        {this.state.rightSize - this.state.leftSize > 0 && <View style={{ flexGrow: this.state.rightSize - this.state.leftSize, flexBasis: this.state.rightSize - this.state.leftSize, flexShrink: 100000 }} />}
                        <Animated.View style={{ flexShrink: 1, flexDirection: 'row', opacity: titleOpacity, flexWrap: 'nowrap', transform: [{ translateX: this.translate }] }}>
                            <View style={{ flexDirection: 'column' }}>
                                {!this.props.titleView && this.props.titleText && <Text style={{ textAlign: 'center' }}>{this.props.titleText}</Text>}
                                {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                                {this.props.titleView}
                            </View>
                        </Animated.View>
                        {this.state.rightSize - this.state.leftSize < 0 && <View style={{ flexGrow: -(this.state.rightSize - this.state.leftSize), flexBasis: -(this.state.rightSize - this.state.leftSize), flexShrink: 100000 }} />}
                        <View style={{ flexGrow: this.state.rightSize, flexBasis: this.state.rightSize }} />
                    </View>
                )}

                <View style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100 }} onLayout={this.handleLeftLayout}>
                    <View width={this.props.index === 0 ? 0 : ZAppConfig.navigationBarBackWidth} />
                </View>
                <View style={{ flexGrow: 1, flexBasis: 0 }} />
                <Animated.View style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, opacity: opacity, alignItems: 'center' }} onLayout={this.handleRightLayout}>
                    {this.props.rightView}
                </Animated.View>
            </View>
        );
    }
}