import * as React from 'react';
import { View, Animated, StyleSheet, TextStyle, ViewStyle, Dimensions, Keyboard, Image, Platform } from 'react-native';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderButtonDescription } from '../ZHeaderButton';
import ViewOverflow from 'react-native-view-overflow';
import { isAndroid } from '../../utils/isAndroid';
import { ZHeaderBackButton } from './ZHeaderBackButton';
import { ZAppConfig } from '../ZAppConfig';
import { ZBlurredView } from '../ZBlurredView';
import { ZHeaderTitle } from './ZHeaderTitle';
import { ZHeaderConfig } from './ZHeaderConfig';

const ViewOverflowAnimated = Animated.createAnimatedComponent(ViewOverflow);

interface Descriptor {
    progress: Animated.Value;
    position: Animated.Value;
    options: {
        headerHeight?: number;
    };
    navigation: NavigationScreenProp<NavigationParams>;
}

interface Scene {
    key: string;
    index: number;
    isStale: boolean;
    descriptor: Descriptor;
}

interface Props {
    scenes: Scene[];
    scene: Scene;
    progress: Animated.Value;
    position: Animated.Value;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);

const defaultHairlineOffset = new Animated.Value(ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight);
const defaultBackgroundOffset = new Animated.Value(ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight - BACKGROUND_SIZE);

// const NAVIGATOR_MIN_HEIGHT = ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight;
const zeroValue = new Animated.Value(0);
const oneValue = new Animated.Value(1);

let styles = StyleSheet.create({

    title: {
        color: ZAppConfig.titleColor,
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        ...isAndroid ? {
            textAlign: 'left',
            fontSize: 28,
            fontFamily: 'Montserrat-Medium',
            fontWeight: undefined,
            lineHeight: 56
        } : {
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '600',
                lineHeight: 44
            }
    } as TextStyle,
    titleLarge: {
        color: ZAppConfig.titleColor,
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'bottom',
        fontSize: isAndroid ? 28 : 34,
        // letterSpacing: isAndroid ? undefined : 0.5,
        fontWeight: isAndroid ? undefined : 'bold',
        lineHeight: isAndroid ? 34 : 135,
        fontFamily: isAndroid ? 'Montserrat-Medium' : undefined,
    } as TextStyle,
    titleContainer: {
        position: 'absolute',
        width: '100%',
        height: isAndroid ? 56 : 44,
        paddingLeft: ZAppConfig.navigationBarBackWidth
    } as ViewStyle,
    titleLargeContainer: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'flex-end',
        // height: isAndroid ? 100 : 140,
        paddingLeft: isAndroid ? 16 : 15
    } as ViewStyle
});

class ZHeaderComponent extends React.PureComponent<Props> {

    wasAnimaged = false;
    lastIndex = 0;

    handleBack = () => {
        this.props.scene.descriptor.navigation.goBack();
    }

    componentWillMount() {

        // Auto hide keyboard
        this.props.position.addListener((c) => {
            if (c.value !== parseInt(c.value + '', 10)) {
                if (this.wasAnimaged) {
                    // Only for back-swipe
                    if (c.value < this.lastIndex) {
                        Keyboard.dismiss();
                    }
                    this.wasAnimaged = false;
                }
            } else {
                this.lastIndex = c.value;
                this.wasAnimaged = true;
            }
        });
    }

    render() {
        // Build Offsets
        let filtered = this.props.scenes.filter((v) => !v.isStale || (!this.props.scenes.find((v2) => v.index === v2.index && !v2.isStale)));
        let offsets = filtered.map((v) => {

            // Resolve param name
            let config = v.descriptor.navigation.getParam('_z_header_config') as ZHeaderConfig;
            if (!config) {
                config = new ZHeaderConfig({});
            }

            //
            // Resolving Settings
            //

            let resolvedTitleSwitchTreshold = ZAppConfig.navigationBarHeightLarge - ZAppConfig.navigationBarHeight;
            let resolvedNavigationBarHeight = ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight;
            let resolvedNavigationBarHeightLarge = (v.descriptor.options.headerHeight ? v.descriptor.options.headerHeight : ZAppConfig.navigationBarHeightLarge) + ZAppConfig.statusBarHeight;

            // let config: ZHeaderConfig | undefined = v.descriptor.navigation.getParam('__z_header_config');
            // if (!config) {
            //     let parent = (v.descriptor.navigation as any).dangerouslyGetParent();
            //     if (parent) {
            //         //
            //     }
            // }

            // Calculate position offset
            let interpolated = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            let position = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [-1, 0, 1],
                extrapolate: 'clamp'
            });

            // Small title opacity
            let titleOpacity: Animated.AnimatedInterpolation = interpolated;

            // Calculate navigation bar offset
            let computedOffset: Animated.AnimatedInterpolation = defaultBackgroundOffset;
            let screenHairlineOffset: Animated.AnimatedInterpolation = defaultHairlineOffset;
            let screenHeaderBaseHeight: Animated.AnimatedInterpolation = defaultHairlineOffset;
            let contentOffset = config.contentOffset;

            //
            // Content Offset with fallback to zero
            //
            let inputOffset = contentOffset ? contentOffset : zeroValue;

            //
            // Invert offset since negative offset in scroll views (when we overscroll) is when it scrolled down
            //
            let invertedOffset = Animated.multiply(inputOffset, -1);

            if ((config.appearance !== 'small' && config.appearance !== 'small-hidden')) {

                //
                // Calculate hairline offset:
                // 1) Add expaned height because when offset in scroll view is zero then we have fully 
                //    expanded navigator
                // 2) Clamp between min height and min height + background size (our scroll background)
                //
                let computedHairlineOffset = Animated
                    .add(invertedOffset, (config.search ? 48 : 0) + resolvedNavigationBarHeightLarge)
                    .interpolate({
                        inputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                        outputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                        extrapolate: 'clamp'
                    });

                // if (config.search && config.searchActive) {
                //     computedHairlineOffset = defaultHairlineOffset;
                // }
                screenHairlineOffset = computedHairlineOffset;

                // Subsctract from baseheight
                if (config.search) {
                    screenHeaderBaseHeight = Animated
                        .add(invertedOffset, 48 + resolvedNavigationBarHeightLarge)
                        .interpolate({
                            inputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeightLarge, resolvedNavigationBarHeightLarge + 48, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                            outputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeightLarge, resolvedNavigationBarHeightLarge, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                            extrapolate: 'clamp'
                        });
                } else {
                    screenHeaderBaseHeight = computedHairlineOffset;
                }
                // screenHeaderBaseHeight = computedHairlineOffset;

                //
                // Background offset: Just subsctract BACKGROUND_SIZE from hairline offset
                //
                computedOffset = Animated.add(screenHairlineOffset, -BACKGROUND_SIZE);
            }

            if (contentOffset || (config.appearance !== 'small')) {
                // Update title opacity for hiding when bar is expanded
                titleOpacity = Animated.multiply(interpolated, inputOffset.interpolate({
                    inputRange: [0, resolvedTitleSwitchTreshold],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));
            }

            let screenHailineOpacity: Animated.AnimatedInterpolation = titleOpacity; // ZAppConfig.enableBlur ? titleOpacity : zeroValue;
            if (config.hairline === 'always') {
                screenHailineOpacity = oneValue;
            } else if (config.hairline === 'hidden') {
                screenHailineOpacity = zeroValue;
            }
            if (config.search && config.searchActive) {
                screenHailineOpacity = oneValue;
            }

            return {
                backgroundOffset: Animated.multiply(computedOffset, interpolated),
                position: interpolated,
                position2: position,
                hairlineOffset: screenHairlineOffset,
                headerBottom: screenHeaderBaseHeight,
                hairlineOpacity: screenHailineOpacity,
                contentOffset: inputOffset,
                scene: v,
                config
            };
        });

        //
        // Interpolated values
        //

        let backgroundOffset: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of offsets) {
            backgroundOffset = Animated.add(f.backgroundOffset, backgroundOffset);
        }

        let hairlineOffset: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of offsets) {
            hairlineOffset = Animated.add(Animated.multiply(f.position, f.hairlineOffset), hairlineOffset);
        }

        let hairlineOpacity: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of offsets) {
            hairlineOpacity = Animated.add(Animated.multiply(f.position, f.hairlineOpacity), hairlineOpacity);
        }

        //
        // Back button opacity
        //

        let backButtonOpacity = this.props.position.interpolate({
            inputRange: [
                0,
                1],
            outputRange: [0, 1]
        });

        //
        // Rendering Titles
        //

        let titles: any[] = [];
        let w = Dimensions.get('window').width;
        let searchActive = offsets.find((v) => !!v.config.searchActive);
        for (let s of offsets) {
            let headerText = s.config.title;
            let headerView = s.config.titleView ? s.config.titleView() : undefined;
            let rightView = undefined;
            if (s.config.buttons.length > 0) {
                rightView = <View>{s.config.buttons.map((v) => <View key={'button-' + v.id}>{v.render()}</View>)}</View>;
            }

            let header = (
                <View position="absolute" top={0} left={0} right={0} pointerEvents="box-none" key={s.scene.key}>
                    <ZHeaderTitle
                        contentOffset={s.contentOffset}
                        index={s.scene.index}
                        progress={s.position2}
                        headerAppearance={s.config.appearance || 'large'}
                        appearance={Platform.OS === 'android' ? 'android' : 'ios'}
                        titleText={headerText}
                        titleView={headerView}
                        rightView={rightView}
                        headerHeight={hairlineOffset}
                        headerBaseHeight={s.headerBottom}
                        config={s.config}
                    />
                </View>
            );

            titles.push(header);
        }

        //
        // Complete Render
        //

        let content = (
            <>
                {/* Back button */}
                <Animated.View style={{ height: ZAppConfig.navigationBarHeight, position: 'absolute', left: 0, top: ZAppConfig.statusBarHeight, width: ZAppConfig.navigationBarBackWidth, opacity: backButtonOpacity, zIndex: 3, backgroundColor: isAndroid ? ZAppConfig.navigationBarBackgroundColor : undefined }}>
                    <ZHeaderBackButton onPress={this.handleBack} />
                </Animated.View>

                {/* Content */}
                <View flexGrow={1} flexBasis={0} zIndex={4} pointerEvents="box-none">
                    {titles}
                </View>

                {/* Debug Statusbar */}
                {/* <View style={{ position: 'absolute', left: 0, top: 0, right: 0, height: ZAppConfig.statusBarHeight, backgroundColor: '#ff0', zIndex: 3 }}/> */}

                {/* Debug Hairline */}
                {/* <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 1,
                        transform: [{ translateY: hairlineOffset2 }],
                        backgroundColor: '#0f0',
                        zIndex: 3
                    }}
                /> */}

                {/* Background */}
                <ViewOverflow
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: Dimensions.get('window').height,
                        overflow: 'hidden'
                    }}
                    pointerEvents="box-none"
                >
                    <ViewOverflowAnimated
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            transform: [{ translateY: backgroundOffset }],
                            height: BACKGROUND_SIZE,
                            zIndex: 1
                        }}
                    >
                        <ZBlurredView
                            style={{
                                height: BACKGROUND_SIZE,
                                width: '100%',
                            }}
                        />
                    </ViewOverflowAnimated>
                </ViewOverflow>

                {/* Hairline */}
                <ViewOverflowAnimated
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 0.5,
                        transform: [{ translateY: hairlineOffset }],
                        opacity: Animated.multiply(hairlineOpacity, 0.3),
                        backgroundColor: '#b7bdc6',
                        zIndex: 10,
                    }}
                />

                {/* <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        // height: 16,
                        // width: 16,
                        zIndex: 100,
                        overflow: 'hidden',
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            // marginLeft: -8,
                            // marginTop: -8,
                            width: 48,
                            height: 48,
                            borderTopLeftRadius: 16,
                            borderColor: '#000',
                            borderWidth: 16
                        }}
                    />
                </View> */}
            </>
        );

        if (ZAppConfig.navigationBarTransparent) {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, position: 'absolute', left: 0, right: 0, top: 0, paddingTop: ZAppConfig.statusBarHeight, marginTop: searchActive ? -ZAppConfig.navigationBarHeightLarge : 0 }}>
                    {content}
                </ViewOverflow>
            );
        } else {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, backgroundColor: ZAppConfig.navigationBarBackgroundColor, paddingTop: ZAppConfig.statusBarHeight }}>
                    {content}
                    {Platform.OS === 'android' && (
                        <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                            <Image source={require('assets/corner_left.png')} />
                        </View>
                    )}
                    {Platform.OS === 'android' && (
                        <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}>
                            <Image source={require('assets/corner_right.png')} />
                        </View>
                    )}
                </ViewOverflow>
            );
        }
    }
}

export const ZHeader = (props: any) => <ZHeaderComponent {...props} />;