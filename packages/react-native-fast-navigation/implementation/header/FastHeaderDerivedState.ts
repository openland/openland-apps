import { Animated, Dimensions } from 'react-native';
import { DeviceConfig } from '../../DeviceConfig';
import {
    defaultBackgroundOffset,
    defaultHairlineOffset,
    BACKGROUND_SIZE,
    NormalizedRoute,
    NormalizedRouteState,
    NormalizedRouteContext
} from './types';
import { FastScrollValue } from '../../FastScrollValue';
import { interpolateContent } from '../utils/interpolateContent';

const zeroValue = new Animated.Value(0);
const zeroValueTracked = new FastScrollValue();
const oneValue = new Animated.Value(1);

export function buildDerivedState(route: NormalizedRoute, progress: Animated.AnimatedInterpolation): NormalizedRouteState {

    // Screen config
    let config = route.config;

    //
    // Resolving Settings
    //

    let resolvedTitleSwitchTreshold = DeviceConfig.navigationBarHeightLarge - DeviceConfig.navigationBarHeight;
    let resolvedNavigationBarHeight = DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight;
    let resolvedNavigationBarHeightLarge = DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight;

    // Calculate position offset
    let position = progress;
    let interpolated = progress.interpolate({
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

        if (config.search && config.searchActive) {
            // screenHeaderBaseHeight = screenHeaderBaseHeight.interpolate({
            //     inputRange: [0, resolvedNavigationBarHeight],
            //     outputRange: [0, resolvedNavigationBarHeight],
            //     extrapolate: 'clamp'
            // });
            // screenHairlineOffset = screenHeaderBaseHeight;
            screenHeaderBaseHeight = defaultHairlineOffset;
            screenHairlineOffset = defaultHairlineOffset;
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

    let screenHailineOpacity: Animated.AnimatedInterpolation = titleOpacity;
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
        position: position,
        positionInverted: interpolated,
        hairlineOffset: screenHairlineOffset,
        headerBottom: screenHeaderBaseHeight,
        hairlineOpacity: screenHailineOpacity,
        contentOffset: inputOffset,
        route: route
    };
}

export function buildDerivedContexts(routes: NormalizedRoute[]): NormalizedRouteContext[] {
    let currentContext: NormalizedRoute[] = [];
    let contexts: NormalizedRoute[][] = [];
    let w = Dimensions.get('window').width;
    for (let r of routes) {

        // Check if we need to start new context
        if (currentContext.length !== 0) {
            if (currentContext[currentContext.length - 1].config.searchActive) {
                contexts.push(currentContext);
                currentContext = [];
            }
        }

        currentContext.push(r);
    }

    if (currentContext.length > 0) {
        contexts.push(currentContext);
    }

    let res = contexts.map((v, i) => {

        let normalized = v.map((r, ri) => {
            if (v.length === 1) {
                return buildDerivedState(r, zeroValue);
            } else if (ri === 0) {
                return buildDerivedState(r, r.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));
            } else if (ri === v.length - 1) {
                return buildDerivedState(r, r.progress.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [-1, 0],
                    extrapolate: 'clamp'
                }));
            }
            return buildDerivedState(r, r.progress);
        });

        let backOpacity: Animated.AnimatedInterpolation = new Animated.Value(0);
        let first = routes.find((r) => r.record.startIndex === 0);
        if (first && (!(v.length === 1 && i === 0))) {
            backOpacity = first.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            });
        }

        let position = Animated.add(
            v[0].progress.interpolate({
                inputRange: [- 1, 0],
                outputRange: [-1, 0],
                extrapolate: 'clamp'
            }),
            v[v.length - 1].progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            }));

        let backgroundOffset: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of normalized) {
            backgroundOffset = Animated.add(f.backgroundOffset, backgroundOffset);
        }

        let hairlineOffset: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of normalized) {
            hairlineOffset = Animated.add(Animated.multiply(f.positionInverted, f.hairlineOffset), hairlineOffset);
        }

        let hairlineOpacity: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of normalized) {
            hairlineOpacity = Animated.add(Animated.multiply(f.positionInverted, f.hairlineOpacity), hairlineOpacity);
        }

        let positionContainer = position.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [w, 0, -w],
            extrapolate: 'clamp'
        });
        let positionContent = Animated.add(interpolateContent(position), Animated.multiply(positionContainer, -1));

        let positionShadow = position.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
            extrapolate: 'clamp'
        });

        return {
            position,
            positionContent: positionContent,
            positionContainer: positionContainer,
            positionShadow: positionShadow,
            backOpacity,
            backgroundOffset,
            hairlineOffset,
            hairlineOpacity,
            routes: normalized,
            key: 'context-' + v[0].record.key
        } as NormalizedRouteContext;
    });
    console.log(res);
    return res;
    // return res;
}