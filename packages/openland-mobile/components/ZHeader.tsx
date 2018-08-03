import * as React from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, ViewStyle, Dimensions, Keyboard } from 'react-native';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderButtonDescription } from './ZHeaderButton';
import ViewOverflow from 'react-native-view-overflow';
import { isAndroid } from '../utils/isAndroid';
import { ZHeaderBackButton } from './ZHeaderBackButton';
import { ZAppConfig } from './ZAppConfig';
import { ZBlurredView } from './ZBlurredView';

const ViewOverflowAnimated = Animated.createAnimatedComponent(ViewOverflow);

interface Descriptor {
    progress: Animated.Value;
    position: Animated.Value;
    options: {
        title?: string;
        headerTitle?: any;
        headerTitleOffset?: number;
        headerAppearance?: 'small' | 'small-hidden';
        headerHeight?: number;
        headerHairline?: boolean;
        androidHeaderAppearance?: 'initial';
        isTab?: boolean;
    };
    navigation: NavigationScreenProp<NavigationParams>;
}

interface Scene {
    index: number;
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
            fontWeight: '400',
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
        fontWeight: isAndroid ? '600' : 'bold',
        lineHeight: isAndroid ? 34 : 135,
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

export interface ZHeaderConfig {
    title?: string;
    offset?: Animated.Value | undefined | null;
}

class ZHeaderComponent extends React.PureComponent<Props> {

    wasAnimaged = false;

    handleBack = () => {
        this.props.scene.descriptor.navigation.goBack();
    }

    componentWillMount() {

        // Auto hide keyboard
        this.props.progress.addListener((c) => {
            if (c.value !== 0 && c.value !== 1) {
                if (this.wasAnimaged) {
                    Keyboard.dismiss();
                    this.wasAnimaged = false;
                }
            } else {
                this.wasAnimaged = true;
            }
        });
    }

    render() {

        // console.log(this.props);

        // Build Offsets
        let offsets = this.props.scenes.map((v) => {

            // Resolve param name
            let paramName = '__z_header_actions_search_offset';
            if (v.descriptor.options.isTab) {
                // console.log(v.descriptor);
                let r = (v.descriptor as any).state.routes[(v.descriptor as any).state.index].routeName;
                paramName = '__z_header_' + r + 'actions_search_offset';
                console.log(r);
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
            let interpolatedInveted = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [1, 0, 1],
                extrapolate: 'clamp'
            });
            let offsetInterporated = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [SCREEN_WIDTH / 2, 1, -SCREEN_WIDTH / 2],
                extrapolate: 'clamp'
            });

            // Small title opacity
            let titleOpacity: Animated.AnimatedInterpolation = interpolated;
            let largeTitleOpacity: Animated.AnimatedInterpolation = zeroValue;
            let largeTitleOffset: Animated.AnimatedInterpolation = zeroValue;
            let largeTitleOverscrol: Animated.AnimatedInterpolation = oneValue;

            // Calculate navigation bar offset
            let computedOffset: Animated.AnimatedInterpolation = defaultBackgroundOffset;
            let screenHairlineOffset: Animated.AnimatedInterpolation = defaultHairlineOffset;
            let contentOffset = v.descriptor.navigation.getParam(paramName) as Animated.Value | undefined | null;

            //
            // Content Offset with fallback to zero
            //
            let inputOffset = contentOffset ? contentOffset : zeroValue;

            //
            // Invert offset since negative offset in scroll views (when we overscroll) is when it scrolled down
            //
            let invertedOffset = Animated.multiply(inputOffset, -1);

            if ((v.descriptor.options.headerAppearance !== 'small' && v.descriptor.options.headerAppearance !== 'small-hidden')) {

                //
                // Calculate hairline offset:
                // 1) Add expaned height because when offset in scroll view is zero then we have fully 
                //    expanded navigator
                // 2) Clamp between min height and min height + background size (our scroll background)
                //
                let computedHairlineOffset = Animated
                    .add(invertedOffset, resolvedNavigationBarHeightLarge)
                    .interpolate({
                        inputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                        outputRange: [resolvedNavigationBarHeight, resolvedNavigationBarHeight + BACKGROUND_SIZE],
                        extrapolate: 'clamp'
                    });
                screenHairlineOffset = computedHairlineOffset;

                //
                // Background offset: Just subsctract BACKGROUND_SIZE from hairline offset
                //
                computedOffset = Animated.add(screenHairlineOffset, -BACKGROUND_SIZE);

                //
                // Scale title for overscroll on iOS
                //
                if (!isAndroid) {
                    largeTitleOverscrol = invertedOffset.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 1.1],
                        extrapolate: 'clamp'
                    });
                }

                // Calculate title offset
                largeTitleOpacity = Animated.multiply(interpolated, invertedOffset.interpolate({
                    inputRange: [-resolvedTitleSwitchTreshold, 0],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));

                // largeTitleOffset = Animated.add(Animated.multiply(interpolatedInveted, -40), invertedOffset);
                largeTitleOffset = invertedOffset;
            }

            if (contentOffset || (v.descriptor.options.headerAppearance !== 'small')) {
                // Update title opacity for hiding when bar is expanded
                titleOpacity = Animated.multiply(interpolated, inputOffset.interpolate({
                    inputRange: [0, resolvedTitleSwitchTreshold],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));
            }

            let screenHailineOpacity: Animated.AnimatedInterpolation = ZAppConfig.enableBlur ? titleOpacity : zeroValue;
            if (v.descriptor.options.headerHairline) {
                screenHailineOpacity = oneValue;
            }

            return {
                backgroundOffset: Animated.multiply(computedOffset, interpolated),
                position: interpolated,
                titlePosition: isAndroid ? zeroValue : offsetInterporated,
                titleOpacity: titleOpacity,
                largeTitleOpacity: largeTitleOpacity,
                largeTitleOffset: largeTitleOffset,
                largeTitleFontSize: largeTitleOverscrol,
                hairlineOffset: screenHairlineOffset,
                hairlineOpacity: screenHailineOpacity,
                resolvedNavigationBarHeight,
                resolvedNavigationBarHeightLarge,
                scene: v
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

        let titles = [];
        let w = Dimensions.get('window').width;
        for (let s of offsets) {
            let titleRender: any = undefined;
            let titleLarge: any = undefined;
            if (s.scene.descriptor.options.headerTitle) {
                if (typeof s.scene.descriptor.options.headerTitle === 'string') {
                    titleRender = <Text style={styles.title}>{s.scene.descriptor.options.headerTitle}</Text>;
                    titleLarge = <Text style={styles.titleLarge}>{s.scene.descriptor.options.headerTitle}</Text>;
                } else {
                    titleRender = <View>{s.scene.descriptor.options.headerTitle}</View>;
                }
            } else if (s.scene.descriptor.options.title) {
                titleRender = <Text style={styles.title}>{s.scene.descriptor.options.title}</Text>;
                titleLarge = <Text style={styles.titleLarge}>{s.scene.descriptor.options.title}</Text>;
            }

            // console.log(s.descriptor.options.title);

            if (titleRender) {
                titles.push(
                    <Animated.View
                        style={{
                            ...(styles.titleContainer as any),
                            opacity: s.titleOpacity,
                            transform: [
                                { translateX: s.titlePosition }
                            ]
                        }}
                        key={'scene-' + titles.length}
                    >
                        {titleRender}
                    </Animated.View>
                );
            }

            if (titleLarge) {
                if (isAndroid) {
                    titles.push(
                        <Animated.View
                            height={s.resolvedNavigationBarHeightLarge}
                            style={{
                                ...(styles.titleLargeContainer as any),
                                opacity: s.largeTitleOpacity,
                                transform: [
                                    {
                                        translateX: s.titlePosition
                                    }
                                ]
                            }}
                            key={'scene-large-' + titles.length}
                            pointerEvents="none"
                        >
                            {titleLarge}
                        </Animated.View>
                    );
                } else {
                    let titleOffset = Animated.add(
                        s.largeTitleOffset,
                        Animated.multiply(
                            Animated.add(
                                Animated.multiply(
                                    hairlineOffset,
                                    -1
                                ),
                                s.hairlineOffset
                            ),
                            -1)
                    );
                    titles.push(
                        <Animated.View
                            height={s.resolvedNavigationBarHeightLarge}
                            style={{
                                ...(styles.titleLargeContainer as any),
                                opacity: s.largeTitleOpacity,
                                transform: [
                                    {
                                        translateX: s.titlePosition
                                    },
                                    {
                                        translateY: titleOffset // s.largeTitleOffset
                                    },
                                    {
                                        translateX: -SCREEN_WIDTH / 2 + 15
                                    },
                                    {
                                        translateY: 20
                                    },
                                    {
                                        scale: s.largeTitleFontSize
                                    },
                                    {
                                        translateY: -20
                                    },
                                    {
                                        translateX: SCREEN_WIDTH / 2 - 15
                                    },
                                ]
                            }}
                            key={'scene-large-' + titles.length}
                            pointerEvents="none"
                        >
                            {titleLarge}
                        </Animated.View>
                    );
                }
            }
        }

        //
        // Action Buttons
        //

        let right: any[] = [];
        let rightButtons = this.props.scene.descriptor.navigation.getParam('__z_header_actions', []) as ZHeaderButtonDescription[];
        for (let r of rightButtons) {
            right.push(r.render());
        }

        //
        // Complete Render
        //

        let content = (
            <>
                {/* Left */}
                <Animated.View style={{ height: '100%', position: 'absolute', left: 0, top: ZAppConfig.statusBarHeight, width: ZAppConfig.navigationBarBackWidth, opacity: backButtonOpacity, zIndex: 3, backgroundColor: isAndroid ? ZAppConfig.navigationBarBackgroundColor : undefined }}>
                    <ZHeaderBackButton onPress={this.handleBack} />
                </Animated.View>

                {/* Center*/}
                <View flexGrow={1} flexBasis={0} zIndex={2}>
                    {titles}
                </View>

                {/* Right */}
                {right.length > 0 && (
                    <View paddingRight={15} paddingLeft={10} zIndex={3}>
                        {right}
                    </View>
                )}
                {right.length === 0 && (<View width={44} zIndex={3} />)}

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
                        zIndex: 3
                    }}
                />
            </>
        );

        if (ZAppConfig.navigationBarTransparent) {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, position: 'absolute', left: 0, right: 0, top: 0, paddingTop: ZAppConfig.statusBarHeight }} elevation={2}>
                    {content}
                </ViewOverflow>
            );
        } else {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, backgroundColor: ZAppConfig.navigationBarBackgroundColor, paddingTop: ZAppConfig.statusBarHeight }} elevation={2}>
                    {content}
                </ViewOverflow>
            );
        }
    }
}

export const ZHeader = (props: any) => <ZHeaderComponent {...props} />;