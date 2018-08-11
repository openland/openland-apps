import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, NavigationRouteConfigMap, NavigationSceneRendererProps, NavigationTransitionProps } from 'react-navigation';
import { ZHeader } from './navigation/ZHeader';

function getSceneIndicesForInterpolationInputRange(props: NavigationSceneRendererProps) {
    const { scene, scenes } = props;
    const index = scene.index;
    const lastSceneIndexInScenes = scenes.length - 1;
    const isBack = !scenes[lastSceneIndexInScenes].isActive;

    if (isBack) {
        const currentSceneIndexInScenes = scenes.findIndex(item => item === scene);
        const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive);
        const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
        const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

        if (
            index !== targetSceneIndex &&
            currentSceneIndexInScenes === lastSceneIndexInScenes
        ) {
            return {
                first: Math.min(targetSceneIndex, index - 1),
                last: index + 1,
            };
        } else if (
            index === targetSceneIndex &&
            currentSceneIndexInScenes === targetSceneIndexInScenes
        ) {
            return {
                first: index - 1,
                last: Math.max(lastSceneIndex, index + 1),
            };
        } else if (
            index === targetSceneIndex ||
            currentSceneIndexInScenes > targetSceneIndexInScenes
        ) {
            return null;
        } else {
            return { first: index - 1, last: index + 1 };
        }
    } else {
        return { first: index - 1, last: index + 1 };
    }
}

const androidInterpolator = (props: NavigationSceneRendererProps) => {

    // If layout is not measured, set initial state.
    if (!props.layout.isMeasured) {
        const focused = props.navigation.state.index === props.scene.index;
        // If not focused, move the scene far away.
        const translate = focused ? 0 : 1000000;
        return {
            opacity: focused ? 1 : 0,
            transform: [{ translateX: translate }, { translateY: translate }],
        };
    }
    const interpolate = getSceneIndicesForInterpolationInputRange(props);

    if (!interpolate) {
        return { opacity: 0 };
    }

    const { first, last } = interpolate;
    const index = props.scene.index;

    const opacity = props.position.interpolate({
        inputRange: [first, first + 0.01, index, last - 0.01, last],
        outputRange: [0, 1, 1, 0.85, 0],
    });

    const translateX = props.position.interpolate({
        inputRange: [first, index, last - 0.01, last],
        outputRange: [props.layout.initWidth, 0, 0, 0],
    });
    const translateY = 0;

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };
};

export function createZStackNavigator(routes: NavigationRouteConfigMap) {
    return createStackNavigator(routes, {
        navigationOptions: {
            header: ZHeader,
            gesturesEnabled: true,
            gestureResponseDistance: {
                horizontal: Dimensions.get('window').width
            }
        },
        headerMode: 'float',
        transitionConfig: (transitionProps: NavigationTransitionProps, prevTransitionProps: NavigationTransitionProps, isModal: boolean) => {
            if (Platform.OS === 'android') {
                return {
                    screenInterpolator: androidInterpolator
                };
            }
            return {};
        },
    });
}