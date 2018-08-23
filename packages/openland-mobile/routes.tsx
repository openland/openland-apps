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
import { Loader } from './pages/dev/Loader';
import { UserPicker } from './pages/main/modals/UserPicker';
import { TextEditModal } from './pages/main/modals/TextEditModal';
import { ComposeModal } from './pages/main/modals/ComposeModal';
import { Home } from './pages/main/Home';
import { FilePreview } from './pages/main/modals/FilePreview';
import { FastRoutesBuilder } from 'react-native-fast-navigation/FastRoutes';

export const Routes = new FastRoutesBuilder()
  .addRoute('Home', Home)
  .addRoute('Conversation', Conversation)
  .addRoute('ProfileUser', ProfileUser)
  .addRoute('ProfileOrganization', ProfileUser)
  .addRoute('ProfileGroup', ProfileGroup)
  .addRoute('SettingsProfile', SettingsProfile)
  .addRoute('SettingsNotifications', SettingsNotifications)
  .addRoute('UserPicker', UserPicker)
  .addRoute('TextEditModal', TextEditModal)
  .addRoute('ComposeModal', ComposeModal)
  .addRoute('FilePreview', FilePreview)
  .addRoute('DevTypography', Typography)
  .addRoute('DevComponents', Components)
  .addRoute('DevNavigation', Navigation)
  .addRoute('DevLoader', Loader)
  .build();

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

  // Modals
  UserPicker: UserPicker,
  TextEditModal: TextEditModal,
  ComposeModal: ComposeModal,
  FilePreview: FilePreview,

  DevTypography: Typography,
  DevComponents: Components,
  DevNavigation: Navigation,
  DevLoader: Loader,
});

//
// Authentication Routes
//

export const LoginStack = Login;