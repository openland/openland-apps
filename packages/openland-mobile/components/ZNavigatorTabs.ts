import { Platform } from 'react-native';
import { NavigationRouteConfigMap, createBottomTabNavigator, TabNavigatorConfig, NavigationContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AppStyles } from '../styles/AppStyles';
import { ZAppConfig } from './ZAppConfig';

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
            inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
            showLabel: false,
            style: {
                backgroundColor: AppStyles.primaryColor,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -1 },
                shadowRadius: 5,
                shadowOpacity: 0.3,
                // height: 44,
                paddingTop: 10,
                marginTop: -44 - ZAppConfig.bottomNavigationBarInset,
                // marginBottom: 34,
                // height: 66,
                marginHorizontal: 10
            }
        },
    });
}