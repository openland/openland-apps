import * as React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { LoginLoader } from './pages/auth/LoginLoader';
import { Login } from './pages/auth/Login';
import { Dialogs } from './pages/main/Dialogs';
import { Settings } from './pages/main/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Conversation } from './pages/main/Conversation';
import { createZStackNavigator } from './components/ZNavigatorStack';
import { createZTabNavigator } from './components/ZNavigatorTabs';

//
// Home Routes
//

const HomeTabs = createZTabNavigator(
  {
    Dialogs: Dialogs,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === 'Dialogs') {
          iconName = `ios-chatbubbles`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog`;
        }
        return <Ionicons name={iconName!!} size={25} color={tintColor!!} />;
      }
    }),
  });

HomeTabs.navigationOptions = (args: { navigation: any }) => {
  let { routeName } = args.navigation.state.routes[args.navigation.state.index];
  if (routeName === 'Dialogs') {
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

const AppStack = createZStackNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      headerBackTitle: '\u200B'
    }
  },
  Conversation: Conversation
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