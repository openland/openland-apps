import * as React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { LoginLoader } from './pages/auth/LoginLoader';
import { Login } from './pages/auth/Login';
import { Messages } from './pages/main/Messages';
import { Settings } from './pages/main/Settings';
import { Ionicons } from '@expo/vector-icons';

//
// Application Routes
//

const MessagesStack = createStackNavigator({
  Messages: Messages
});

const SettingsStack = createStackNavigator({
  Settings: Settings
});

const AppStack = createBottomTabNavigator(
  {
    Messages: MessagesStack,
    Settings: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === 'Messages') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName!!} size={25} color={tintColor!!} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#654BFA',
      inactiveTintColor: 'gray',
    },
  });

//
// Authentication Routes
//

const LoginStack = createStackNavigator({
  Home: Login
});

export default createSwitchNavigator(
  {
    Root: LoginLoader,
    App: AppStack,
    Login: LoginStack
  },
  { initialRouteName: 'Root' }
);