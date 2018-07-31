import { Platform } from 'react-native';
import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { ZHeader } from './ZHeader';

export function createZStackNavigator(routes: NavigationRouteConfigMap) {
    return createStackNavigator(routes, {
        navigationOptions: {
            header: ZHeader,
            gesturesEnabled: true
        },
        headerMode: 'float',
        transitionConfig: () => {
            if (Platform.OS === 'android') {
                return {
                    screenInterpolator: sceneProps => {
                        return require('react-navigation/src/views/StackView/StackViewStyleInterpolator').default.forHorizontal(sceneProps);
                    },
                };
            }
            return {};
        },
    });
}