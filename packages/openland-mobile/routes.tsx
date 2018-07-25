import * as React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { LoginLoader } from './pages/auth/LoginLoader';
import { Login } from './pages/auth/Login';
import { Messages } from './pages/main/Messages';
import { Settings } from './pages/main/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Conversation } from './pages/main/Conversation';
import { AppStyles } from './styles/AppStyles';

//
// Home Routes
//

const HomeTabs = createBottomTabNavigator(
  {
    Messages: Messages,
    Settings: Settings
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
      }
    }),
    tabBarOptions: {
      activeTintColor: '#654BFA',
      inactiveTintColor: 'gray',
    },
  });
HomeTabs.navigationOptions = (args: { navigation: any }) => {
  let { routeName } = args.navigation.state.routes[args.navigation.state.index];
  if (routeName === 'Messages') {
    return {
      headerTitle: 'Messages'
    };
  }
  return {
    headerTitle: 'Settings'
  };
};

//
// App Routes
//

const AppStack = createStackNavigator(
  {
    Home: HomeTabs,
    Conversation: Conversation
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.primaryColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
      },
    }
  });

//
// Authentication Routes
//

const LoginStack = createStackNavigator({
  Home: Login
});

//
// Root Routes
//

export default createSwitchNavigator(
  {
    Root: LoginLoader,
    App: AppStack,
    Login: LoginStack
  },
  { initialRouteName: 'Root' }
);