import { Platform } from 'react-native';
import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { AppStyles } from '../styles/AppStyles';

export function createZStackNavigator(routes: NavigationRouteConfigMap) {
    return createStackNavigator(routes, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: AppStyles.primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
                fontWeight: 'bold',
            },
        },
        transitionConfig: () => {
            if (Platform.OS === 'android') {
                return {
                    screenInterpolator: sceneProps => {
                        return require('react-navigation/src/views/StackView/StackViewStyleInterpolator').default.forHorizontal(sceneProps);
                    }
                };
            }
            return {};
        },
    });
}