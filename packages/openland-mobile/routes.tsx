import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
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
import { ProfileUser } from './pages/main/ProfileUser';
import { ProfileOrganization } from './pages/main/ProfileOrganization';
import { ProfileGroup } from './pages/main/ProfileGroup';
import { Directory } from './pages/main/Directory';
import { Navigation } from './pages/dev/Navigation';
import { PicturePreview } from './pages/main/PicturePreview';
import { Loader } from './pages/dev/Loader';
import { UserPicker } from './pages/main/modals/UserPicker';
import { TextEditModal } from './pages/main/modals/TextEditModal';

//
// Home Routes
//

const HomeTabs = createZTabNavigator(
  {
    Directory: Directory,
    Dialogs: Dialogs,
    Explore: Directory,
    Settings: Settings
  },
  {
    initialRouteName: 'Dialogs',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === 'Directory') {
          iconName = `ios-albums`;
        } else if (routeName === 'Explore') {
          iconName = `ios-search`;
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
      title: 'Messages',
      isTab: true,
    };
  }
  if (routeName === 'Directory') {
    return {
      title: 'Today',
      isTab: true,
    };
  }
  if (routeName === 'Explore') {
    return {
      title: 'Search',
      isTab: true,
    };
  }
  return {
    title: 'Settings',
    isTab: true,
    headerAppearance: 'small-hidden',
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

export const AppStack = createZStackNavigator({
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
  PicturePreview: PicturePreview,

  // Modals

  UserPicker: UserPicker,
  TextEditModal: TextEditModal,
  
  DevTypography: Typography,
  DevComponents: Components,
  DevNavigation: Navigation,
  DevLoader: Loader,
});

//
// Authentication Routes
//

export const LoginStack = createStackNavigator({
  Home: Login
});

//
// Root Routes
//

// export default createSwitchNavigator(
//   {
//     Root: {
//       screen: LoginLoader,
//       portraitOnlyMode: true
//     },
//     App: AppStack,
//     Login: {
//       screen: Login,
//       portraitOnlyMode: true
//     }
//   },
//   { initialRouteName: 'Root' }
// );