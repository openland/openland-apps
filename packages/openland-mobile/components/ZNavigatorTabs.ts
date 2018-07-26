import { Platform } from 'react-native';
import { NavigationRouteConfigMap, createBottomTabNavigator, TabNavigatorConfig, NavigationContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AppStyles } from '../styles/AppStyles';

export function createZTabNavigator(routes: NavigationRouteConfigMap, config?: TabNavigatorConfig): NavigationContainer {
    if (Platform.OS === 'android') {
        return createMaterialBottomTabNavigator(routes, {
            ...config,
            barStyle: {
                backgroundColor: AppStyles.primaryColor
            }
        });
    }
    return createBottomTabNavigator(routes, {
        ...config,
        tabBarOptions: {
            activeTintColor: AppStyles.primaryColor,
            inactiveTintColor: '#99a2b0'
        },
    });
}