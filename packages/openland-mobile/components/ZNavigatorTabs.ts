import { Platform } from 'react-native';
import { NavigationRouteConfigMap, createBottomTabNavigator, TabNavigatorConfig, NavigationContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AppStyles } from '../styles/AppStyles';

export function createZTabNavigator(routes: NavigationRouteConfigMap, config?: TabNavigatorConfig): NavigationContainer {
    if (Platform.OS === 'android') {
        return createMaterialBottomTabNavigator(routes, {
            ...config,
            activeTintColor: AppStyles.primaryColor,
            barStyle: {
                backgroundColor: '#fff'
            }
        });
    }
    return createBottomTabNavigator(routes, {
        ...config,
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#99a2b0',
            showLabel: false,
            style: {
                backgroundColor: AppStyles.primaryColor,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -1 },
                shadowRadius: 5,
                shadowOpacity: 0.3,
                paddingTop: 10,
                marginTop: -10,
                // height: 66,
                marginHorizontal: 10
            }
        },
    });
}