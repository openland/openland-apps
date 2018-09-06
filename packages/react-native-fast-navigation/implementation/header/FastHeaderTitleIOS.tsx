import * as React from 'react';
import { Animated, View, Text, LayoutChangeEvent, LayoutAnimation, StyleSheet, TextStyle, Dimensions, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { FastHeaderTitleProps } from './FastHeaderTitle';
import { DeviceConfig } from '../../DeviceConfig';
import { FastScrollValue } from '../../FastScrollValue';
import { FastHeaderBackButton } from '../../views/FastHeaderBackButton';
import { animatedInterpolate } from '../utils/animatedInterpolate';

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

export class FastHeaderTitleIOS extends React.PureComponent<FastHeaderTitleProps, { leftSize?: number, rightSize?: number }> {
    containerWidth = new Animated.Value(0);
    opacity = this.props.progress.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    });
    translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), -0.5);
    translateLarge = Animated.multiply(Animated.multiply(this.props.progress, Dimensions.get('window').width), -1);
    titleProgress = new Animated.Value(0);
    showed = false;
    subscribedValue: FastScrollValue | null = null;
    subscribed: string | null = null;

    constructor(props: FastHeaderTitleProps) {
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

    private handleOffset = () => {
        if (!this.subscribedValue) {
            return;
        }
        let value = this.subscribedValue!!.offsetValue;
        // console.log('Offset: ' + state.value);
        let delta = this.props.config.search ? 92 : 32;
        if (value > delta) {
            if (!this.showed) {
                this.showed = true;
                Animated.timing(this.titleProgress, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        } else {
            if (this.showed) {
                this.showed = false;
                Animated.timing(this.titleProgress, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        }
    }

    // private handleOffsetUpdate = (src: number) => {
    //     console.log('Offset update: ' + src);
    // }

    componentWillMount() {
        this.subscribed = this.props.contentOffset.offset.addListener(this.handleOffset);
        this.subscribedValue = this.props.contentOffset;
        this.handleOffset();
        // this.handleOffsetUpdate(this.props.contentOffset.)
    }

    componentWillUnmount() {
        if (this.subscribed) {
            this.subscribedValue!!.offset.removeListener(this.subscribed);
            this.subscribed = null;
            this.subscribedValue = null;
        }
    }

    componentWillReceiveProps(nextProps: FastHeaderTitleProps) {

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
            this.translate = Animated.multiply(Animated.multiply(nextProps.progress, this.containerWidth), -0.5);
            this.translateLarge = Animated.multiply(Animated.multiply(nextProps.progress, Dimensions.get('window').width), -1);
            this.titleProgress = new Animated.Value(0);
        }

        // Resubscribe
        if (this.subscribedValue !== nextProps.contentOffset) {
            if (this.subscribed) {
                this.subscribedValue!!.offset.removeListener(this.subscribed);
                this.subscribed = null;
                this.subscribedValue = null;
            }
            this.subscribed = nextProps.contentOffset.offset.addListener(this.handleOffset);
            this.subscribedValue = nextProps.contentOffset;
            // this.handleOffset();
            let delta = nextProps.config.search ? 92 : 32;
            if (this.subscribedValue.offsetValue > delta) {
                this.showed = true;
                this.titleProgress.setValue(1);
                // this.titleProgress.stopAnimation((v) => {
                //     this.titleProgress.setValue(1);
                // });
            } else {
                this.showed = false;
                this.titleProgress.setValue(0);
                // this.titleProgress.stopAnimation((v) => {
                //     this.titleProgress.setValue(0);
                // });
            }
        }
    }

    handleSearchClose = () => {
        //
    }

    render() {
        let invertedSearchProgress = Animated.add(1, Animated.multiply(this.props.searchProgress, -1));
        let opacity = Animated.multiply(
            this.props.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            }),
            invertedSearchProgress
        );
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
                        <Animated.View style={{ flexShrink: 1, flexDirection: 'row', opacity: titleOpacity, flexWrap: 'nowrap', transform: [{ translateX: this.translate }] }} pointerEvents="box-none">
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
                    {this.props.index === 0 && <View width={0} opacity={0} pointerEvents="none" />}
                    {this.props.index !== 0 && <View pointerEvents="none" opacity={0}><FastHeaderBackButton /></View>}
                </View>
                <View key="button-padding" style={{ flexGrow: 1, flexBasis: 0, opacity: this.props.config.searchActive ? 0 : 1, }} pointerEvents="box-none" />
                <Animated.View key="right-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, opacity: opacity, alignItems: 'center' }} onLayout={this.handleRightLayout} pointerEvents="box-none">
                    {this.props.rightView}
                </Animated.View>
            </>
        );

        const largeHeader = this.props.headerAppearance === 'large' && (
            <View key="large-header" style={{ overflow: 'hidden', position: 'absolute', top: DeviceConfig.navigationBarHeight, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap', height: Dimensions.get('window').height }} pointerEvents="none">
                <Animated.View
                    style={{
                        flexShrink: 1,
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        opacity: invertedSearchProgress,
                        transform: [
                            { translateX: this.translateLarge },
                            {
                                translateY: Animated.add(this.props.headerBaseHeight, -(DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight))
                            }
                        ]
                    }}
                    pointerEvents="none"
                >
                    {!this.props.titleView && this.props.titleText && <Text style={styles.titleLarge}>{this.props.titleText}</Text>}
                    {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                </Animated.View>
            </View>
        );

        let search: any | undefined;
        let translateGlobal = 0;
        if (this.props.config.search) {
            let translate = this.props.config.searchActive ? 0 : Animated.add(this.props.headerHeight, -(DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight + DeviceConfig.navigationBarHeight));
            let translateStatic = this.props.config.searchActive ? DeviceConfig.statusBarHeight : 0;
            translateGlobal = this.props.config.searchActive ? -DeviceConfig.navigationBarHeightLarge - DeviceConfig.statusBarHeight : 0;
            search = (
                <View style={{ position: 'absolute', overflow: 'hidden', top: DeviceConfig.navigationBarHeightLarge + translateStatic, left: 0, right: 0, height: Dimensions.get('window').height }} pointerEvents="box-none">
                    <Animated.View style={{ lexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', height: 44, transform: [{ translateX: this.translateLarge }, { translateY: translate }] }} pointerEvents="box-none">
                        <View style={{ flexDirection: 'row', height: 36, marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={this.props.config.searchPress}>
                                <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1 }}>
                                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#8a8a8f', height: 36, opacity: 0.12, borderRadius: 8 }} />
                                    <Image source={require('assets/ic-search.png')} style={{ width: 14, height: 14, marginLeft: 13, marginRight: 7 }} />
                                    <Text style={{ fontSize: 16, color: 'rgba(138, 138, 143, 0.75)', lineHeight: 22 }}>Seach</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View
                                style={{
                                    opacity: this.props.config.searchActive ? 1 : 0,
                                    marginLeft: 15,
                                    marginRight: this.props.config.searchActive ? 0 : -70,
                                    width: 70 - 15
                                }}
                            >
                                <Animated.View opacity={this.props.searchProgress}>
                                    <Button title="Close" onPress={this.props.config.searchClosed!!} />
                                </Animated.View>
                            </View>
                        </View>
                    </Animated.View>
                </View >
            );
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: translateGlobal }} onLayout={this.handleGlobalLayout} pointerEvents="box-none">
                {mainHeader}
                {largeHeader}
                {search}
            </View>
        );
    }
}