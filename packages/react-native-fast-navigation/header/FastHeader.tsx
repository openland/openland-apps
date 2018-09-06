import * as React from 'react';
import { View, Animated, StyleSheet, ViewStyle, Dimensions, Image, Platform } from 'react-native';
import { FastHeaderBackButton } from './FastHeaderBackButton';
import { DeviceConfig } from '../DeviceConfig';
import { FastHistoryRecord, FastHistoryManager } from '../FastHistory';
import { FastBlurredView } from '../utils/FastBlurView';
import { FastHeaderConfig } from '../FastHeaderConfig';
import { FastHeaderTitle } from './FastHeaderTitle';
import { FastScrollValue } from '../FastScrollValue';

interface NormalizedRoute {
    mounted: boolean;
    record: FastHistoryRecord;
    config: FastHeaderConfig;
    progress: Animated.AnimatedInterpolation;
}

interface FastHeaderProps {
    routes: NormalizedRoute[];
    history: FastHistoryManager;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);

const defaultHairlineOffset = new Animated.Value(DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight);
const defaultBackgroundOffset = new Animated.Value(DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight - BACKGROUND_SIZE);

// const NAVIGATOR_MIN_HEIGHT = ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight;
const zeroValue = new Animated.Value(0);
const zeroValueTracked = new FastScrollValue();
const oneValue = new Animated.Value(1);

let styles = StyleSheet.create({
    titleWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    } as ViewStyle,
    backgroundContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
        overflow: 'hidden'
    } as ViewStyle,
    container: {
        flexGrow: 1,
        flexBasis: 0,
        zIndex: 4
    } as ViewStyle,
    styleMainContainerTransparent: {
        overflow: 'visible',
        flexDirection: 'row',
        height: DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        paddingTop: DeviceConfig.statusBarHeight,
    } as ViewStyle,
    styleMainContainerTransparentSearch: {
        marginTop: -DeviceConfig.navigationBarHeightLarge
    },
    hairline: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 0.5,
        backgroundColor: '#b7bdc6',
        zIndex: 10,
    } as ViewStyle,
});

export class FastHeader extends React.PureComponent<FastHeaderProps> {

    lastIndex = 0;

    // Back Button
    handleBack = () => {
        this.props.history.pop();
    }

    render() {
        // Build Offsets
        let filtered = this.props.routes;
        let offsets = filtered.map((v) => {

            // Resolve param name
            // let config = v.descriptor.navigation.getParam('_z_header_config') as ZHeaderConfig;
            // if (!config) {
            //     config = new ZHeaderConfig({});
            // }
            let config = v.config;

            //
            // Resolving Settings
            //

            let resolvedTitleSwitchTreshold = DeviceConfig.navigationBarHeightLarge - DeviceConfig.navigationBarHeight;
            let resolvedNavigationBarHeight = DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight;
            let resolvedNavigationBarHeightLarge = DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight;

            // Calculate position offset
            let position = v.progress;
            let interpolated = v.progress.interpolate({
                inputRange: [- 1, 0, 1],
                outputRange: [0, 1, 0],
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
            let inputOffset = contentOffset ? contentOffset : zeroValueTracked;

            //
            // Invert offset since negative offset in scroll views (when we overscroll) is when it scrolled down
            //
            let invertedOffset = Animated.multiply(inputOffset.offset, -1);

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
                titleOpacity = Animated.multiply(interpolated, inputOffset.offset.interpolate({
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

        let backOpacity: Animated.AnimatedInterpolation = new Animated.Value(0);
        let first = offsets.find((v) => v.scene.record.startIndex === 0);
        if (first) {
            backOpacity = first.position.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            });
        }

        //
        // Rendering Titles
        //

        let titles: any[] = [];
        let searchActive = offsets.find((v) => !!v.config.searchActive);
        for (let s of offsets) {
            let headerText = s.config.title;
            let headerView = s.config.titleView ? s.config.titleView() : undefined;
            let rightView = undefined;
            if (s.config.buttons.length > 0) {
                rightView = <View>{s.config.buttons.map((v) => <View key={'button-' + v.id}>{v.render()}</View>)}</View>;
            }

            let header = (
                <View style={styles.titleWrapper} pointerEvents="box-none" key={s.scene.record.key}>
                    <FastHeaderTitle
                        contentOffset={s.contentOffset}
                        index={1}
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
                <Animated.View
                    style={{
                        height: DeviceConfig.navigationBarHeight,
                        position: 'absolute',
                        left: 0,
                        top: DeviceConfig.statusBarHeight,
                        width: DeviceConfig.navigationBarBackWidth,
                        opacity: backOpacity,
                        zIndex: 3,
                        backgroundColor: Platform.OS === 'android' ? DeviceConfig.navigationBarBackgroundColor : undefined
                    }}
                >
                    <FastHeaderBackButton onPress={this.handleBack} />
                </Animated.View>

                {/* Content */}
                <View style={styles.container} pointerEvents="box-none">
                    {titles}
                </View>

                {/* Background */}
                <View style={styles.backgroundContainer} pointerEvents="box-none">
                    <Animated.View
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
                        <FastBlurredView
                            style={{
                                height: BACKGROUND_SIZE,
                                width: '100%',
                            }}
                        />
                    </Animated.View>
                </View>

                {/* Hairline */}
                <Animated.View
                    style={[styles.hairline, {
                        transform: [{ translateY: hairlineOffset }],
                        opacity: Animated.multiply(hairlineOpacity, 0.3),
                    }]}
                />
            </>
        );

        if (DeviceConfig.navigationBarTransparent) {
            return (
                <View style={[styles.styleMainContainerTransparent, searchActive && styles.styleMainContainerTransparentSearch]}>
                    {content}
                </View>
            );
        } else {
            return (
                <View style={{ overflow: 'visible', flexDirection: 'row', height: DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight, backgroundColor: DeviceConfig.navigationBarBackgroundColor, paddingTop: DeviceConfig.statusBarHeight }}>
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
                </View>
            );
        }
    }
}