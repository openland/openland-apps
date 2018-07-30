import * as React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { LoginLoader } from './pages/auth/LoginLoader';
import { Login } from './pages/auth/Login';
import { Dialogs } from './pages/main/Dialogs';
import { Settings } from './pages/main/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Conversation } from './pages/main/Conversation';
import { createZStackNavigator } from './components/ZNavigatorStack';
import { createZTabNavigator } from './components/ZNavigatorTabs';
import { Typography } from './pages/dev/Typography';
import { Components } from './pages/dev/Components';
import { SettingsProfile } from './pages/main/SettingsProfile';
import { Button, View, Text } from 'react-native';
import { SettingsNotifications } from './pages/main/SettingsNotifications';
import { ConversationInfo } from './pages/main/ConversationInfo';
import { ProfileUser } from './pages/main/ProfileUser';
import { ProfileOrganization } from './pages/main/ProfileOrganization';
import { ProfileGroup } from './pages/main/ProfileGroup';
import { Directory } from './pages/main/Directory';
import { Navigation } from './pages/dev/Navigation';
import { ZHeader } from './components/ZHeader';

//
// Home Routes
//

const HomeTabs = createZTabNavigator(
  {
    Directory: Directory,
    Dialogs: Dialogs,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === 'Directory') {
          iconName = `ios-home`;
        } else if (routeName === 'Dialogs') {
          iconName = `ios-chatbubbles`;
        } else {
          iconName = `ios-cog`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor!!} />;
      }
    }),
  });

HomeTabs.navigationOptions = (args: { navigation: any }) => {
  let { routeName } = args.navigation.state.routes[args.navigation.state.index];
  if (routeName === 'Dialogs') {
    return {
      headerTitle: 'Messages',
      // header: ZHeader
    };
  }
  if (routeName === 'Directory') {
    return {
      headerTitle: 'Directory',
      // header: ZHeader
    };
  }
  return {
    headerTitle: 'Settings',
    // header: ZHeader,
    headerRight: (
      <View style={{ marginRight: 10 }}>
        <Button
          onPress={() => {
            args.navigation.navigate('SettingsProfile');
          }}
          title="Edit"
          color="#fff"
        />
      </View>
    ),
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
  Conversation: Conversation,
  ProfileUser: ProfileUser,
  ProfileOrganization: ProfileOrganization,
  ProfileGroup: ProfileGroup,
  SettingsProfile: SettingsProfile,
  SettingsNotifications: SettingsNotifications,
  DevTypography: Typography,
  DevComponents: Components,
  DevNavigation: Navigation
});

//
// Authentication Routes
//

// const LoginStack = createStackNavigator({
//   Home: Login
// });

//
// Root Routes
//

export default createSwitchNavigator(
  {
    Root: {
      screen: LoginLoader,
      portraitOnlyMode: true
    },
    App: AppStack,
    Login: {
      screen: Login,
      portraitOnlyMode: true
    }
  },
  { initialRouteName: 'Root' }
);