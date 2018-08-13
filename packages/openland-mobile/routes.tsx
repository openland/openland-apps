import { createStackNavigator } from 'react-navigation';
import { Login } from './pages/auth/Login';
import { Conversation } from './pages/main/Conversation';
import { createZStackNavigator } from './components/ZNavigatorStack';
import { Typography } from './pages/dev/Typography';
import { Components } from './pages/dev/Components';
import { SettingsProfile } from './pages/main/SettingsProfile';
import { SettingsNotifications } from './pages/main/SettingsNotifications';
import { ProfileUser } from './pages/main/ProfileUser';
import { ProfileOrganization } from './pages/main/ProfileOrganization';
import { ProfileGroup } from './pages/main/ProfileGroup';
import { Navigation } from './pages/dev/Navigation';
import { PicturePreview } from './pages/main/modals/PicturePreview';
import { Loader } from './pages/dev/Loader';
import { UserPicker } from './pages/main/modals/UserPicker';
import { TextEditModal } from './pages/main/modals/TextEditModal';
import { ComposeModal } from './pages/main/modals/ComposeModal';
import { Home } from './pages/main/Home';
import { Animated, Easing } from 'react-native';
import { Test } from './pages/main/Test';

//
// App Routes
//

export const MainStack = createZStackNavigator({
  Home: Home,
  Conversation: Conversation,
  ProfileUser: ProfileUser,
  ProfileOrganization: ProfileOrganization,
  ProfileGroup: ProfileGroup,
  SettingsProfile: SettingsProfile,
  SettingsNotifications: SettingsNotifications,

  // Modals
  UserPicker: UserPicker,
  TextEditModal: TextEditModal,
  ComposeModal: ComposeModal,

  DevTypography: Typography,
  DevComponents: Components,
  DevNavigation: Navigation,
  DevLoader: Loader,
});

export const PreviewStack = createZStackNavigator(
  {
    PicturePreviewRoot: PicturePreview
  },
  true);

export const AppStack = createStackNavigator(
  {
    Main: MainStack,
    PicturePreview: PreviewStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => {
      return ({
        cardStyle: {
          backgroundColor: 'transparent',
        },
        containerStyle: {
          backgroundColor: 'transparent',
        },
        transitionSpec: {
          duration: 0,
          timing: Animated.timing,
          easing: Easing.step0,
        }
      });
    }
  }
);

//
// Authentication Routes
//

export const LoginStack = createStackNavigator({
  Home: Login
});