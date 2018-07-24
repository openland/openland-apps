import * as React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { LoginLoader } from './pages/auth/LoginLoader';
import { Login } from './pages/auth/Login';
import { Messages } from './pages/main/Messages';
import { Settings } from './pages/main/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Conversation } from './pages/main/Conversation';

//
// Application Routes
//

const MessagesStack = createStackNavigator({
  Messages: Messages,
  Conversation: Conversation
});
MessagesStack.navigationOptions = (args: any) => {
  let tabBarVisible = true;
  if (args.navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

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

const RootStack = createSwitchNavigator(
  {
    Root: LoginLoader,
    App: AppStack,
    Login: LoginStack
  },
  { initialRouteName: 'Root' }
);

class CodePushStatusClass {
  status: number = -2;
  watchers: ((status: number) => void)[] = [];

  watch(handler: (status: number) => void) {
    this.watchers.push(handler);
  }
}

export const CodePushStatus = new CodePushStatusClass();

export default class RoutCheckWrapper extends React.Component {
  codePushStatusDidChange(status: number) {
    console.log('push-status');
    console.log(status);
    if (status === 0 && CodePushStatus.status === 5) {
      console.log('ignore');
      return;
    }
    CodePushStatus.status = status;
    for (let w of CodePushStatus.watchers) {
      w(status);
    }
    // switch(status) {
    //     case codePush.SyncStatus.CHECKING_FOR_UPDATE:
    //         console.log("Checking for updates.");
    //         break;
    //     case codePush.SyncStatus.DOWNLOADING_PACKAGE:
    //         console.log("Downloading package.");
    //         break;
    //     case codePush.SyncStatus.INSTALLING_UPDATE:
    //         console.log("Installing update.");
    //         break;
    //     case codePush.SyncStatus.UP_TO_DATE:
    //         console.log("Up-to-date.");
    //         break;
    //     case codePush.SyncStatus.UPDATE_INSTALLED:
    //         console.log("Update installed.");
    //         break;
    // }
  }

  codePushDownloadDidProgress() {
    console.log('push-progress');
    // console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  render() {
    return <RootStack />;
  }
}