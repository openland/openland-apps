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
import { Button, View } from 'react-native';
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
import { ComposeModal } from './pages/main/modals/ComposeModal';
import { Home } from './pages/main/Home';

//
// App Routes
//

export const AppStack = createZStackNavigator({
  Home: Home,
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
  ComposeModal: ComposeModal,
  
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