import { FastHistoryRecord } from '../FastHistory';
import { FastHeaderConfig } from '../FastHeaderConfig';
import { Animated, Dimensions } from 'react-native';
import { FastScrollValue } from '../FastScrollValue';
import { DeviceConfig } from '../DeviceConfig';

export interface NormalizedRoute {
    mounted: boolean;
    record: FastHistoryRecord;
    config: FastHeaderConfig;
    progress: Animated.AnimatedInterpolation;
}

export interface NormalizedRouteState {
    backgroundOffset: Animated.AnimatedInterpolation;
    position: Animated.AnimatedInterpolation;
    positionInverted: Animated.AnimatedInterpolation;
    hairlineOffset: Animated.AnimatedInterpolation;
    headerBottom: Animated.AnimatedInterpolation;
    hairlineOpacity: Animated.AnimatedInterpolation;
    contentOffset: FastScrollValue;
    route: NormalizedRoute;
}

export interface NormalizedRouteContext {
    position: Animated.AnimatedInterpolation;
    positionContainer: Animated.AnimatedInterpolation;
    positionContent: Animated.AnimatedInterpolation;
    positionShadow: Animated.AnimatedInterpolation;
    backOpacity: Animated.AnimatedInterpolation;
    backgroundOffset: Animated.AnimatedInterpolation;
    hairlineOffset: Animated.AnimatedInterpolation;
    hairlineOpacity: Animated.AnimatedInterpolation;
    key: string;
    routes: NormalizedRouteState[];
}

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);

export const defaultHairlineOffset = new Animated.Value(DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight);
export const defaultBackgroundOffset = new Animated.Value(DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight - BACKGROUND_SIZE);